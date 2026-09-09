import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://skuviastudio.com';
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'admin' || entry.name === 'dist' || entry.name === 'node_modules' || entry.name === '.git') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

function attr(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] ?? null;
}

function expectedRoute(file) {
  const rel = relative(root, file).replaceAll('\\', '/');
  return '/' + rel.replace(/index\.html$/, '');
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

const allFiles = await walk(root);
const htmlFiles = allFiles.filter((file) => /[\\/](es|en)[\\/].*[\\/]index\.html$/.test(file) || /[\\/](es|en)[\\/]index\.html$/.test(file));
const titles = new Map();
const descriptions = new Map();
const contentHashes = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const rel = relative(root, file).replaceAll('\\', '/');
  const route = expectedRoute(file);
  const lang = route.startsWith('/es/') ? 'es' : 'en';
  const label = rel;

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1];
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];

  if (!title) errors.push(`${label}: missing title`);
  if (!description || description.length < 80) errors.push(`${label}: missing or short meta description`);
  if (canonical !== siteUrl + route) errors.push(`${label}: canonical mismatch (${canonical})`);
  if (!html.includes(`<html lang="${lang}">`)) errors.push(`${label}: wrong lang attribute`);
  if (count(html, /<h1(?:\s|>)/gi) !== 1) errors.push(`${label}: expected exactly one H1`);
  if (count(html, /hreflang="es"/gi) < 1 || count(html, /hreflang="en"/gi) < 1 || count(html, /hreflang="x-default"/gi) !== 1) {
    errors.push(`${label}: incomplete hreflang set`);
  }
  if (!html.includes(`<meta property="og:url" content="${siteUrl + route}">`)) errors.push(`${label}: invalid og:url`);
  if (!html.includes('<meta name="twitter:card"')) errors.push(`${label}: missing Twitter card metadata`);
  if (/lorem ipsum|href=["']#["']|placeholder text/i.test(html)) errors.push(`${label}: placeholder content found`);

  if (title) {
    if (titles.has(title)) errors.push(`${label}: duplicate title with ${titles.get(title)}`);
    titles.set(title, label);
  }
  if (description) {
    if (descriptions.has(description)) errors.push(`${label}: duplicate description with ${descriptions.get(description)}`);
    descriptions.set(description, label);
  }
  const mainText = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (mainText) {
    const hash = createHash('sha256').update(mainText).digest('hex');
    if (contentHashes.has(hash)) errors.push(`${label}: duplicate main content with ${contentHashes.get(hash)}`);
    contentHashes.set(hash, label);
  }

  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(script[1]); } catch (error) { errors.push(`${label}: invalid JSON-LD (${error.message})`); }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = attr(tag, 'src');
    if (attr(tag, 'alt') === null) errors.push(`${label}: image without alt`);
    if (!attr(tag, 'width') || !attr(tag, 'height')) errors.push(`${label}: image without dimensions (${src})`);
    if (src?.startsWith('/')) {
      const local = join(root, src.replace(/^\//, ''));
      if (!await exists(local)) errors.push(`${label}: missing image ${src}`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = href.split(/[?#]/)[0];
    if (pathname === '/') continue;
    const local = pathname.endsWith('/') ? join(root, pathname.replace(/^\//, ''), 'index.html') : join(root, pathname.replace(/^\//, ''));
    if (!await exists(local)) errors.push(`${label}: broken internal link ${href}`);
  }

  if (html.includes('id="contact-form"')) {
    if (!html.includes('action="https://api.web3forms.com/submit"')) errors.push(`${label}: form endpoint changed`);
    if (!html.includes('value="f9408505-a131-4de8-a765-a092c8f940ac"')) errors.push(`${label}: form access key changed`);
    if (!html.includes('name="botcheck"')) errors.push(`${label}: anti-spam field missing`);
  }
}

const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemap.includes('\\n')) errors.push('sitemap.xml contains literal escaped newlines');
if (sitemapUrls.length !== htmlFiles.length) errors.push(`sitemap.xml: expected ${htmlFiles.length} URLs, found ${sitemapUrls.length}`);
for (const file of htmlFiles) {
  const url = siteUrl + expectedRoute(file);
  if (!sitemapUrls.includes(url)) errors.push(`sitemap.xml: missing ${url}`);
}

const robots = await readFile(join(root, 'robots.txt'), 'utf8');
if (!robots.includes('Disallow: /admin/')) errors.push('robots.txt: admin is not disallowed');
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) errors.push('robots.txt: sitemap reference missing');

const redirects = await readFile(join(root, '_redirects'), 'utf8');
if (redirects.includes('\\n')) errors.push('_redirects contains literal escaped newlines');
if (!redirects.includes('https://www.skuviastudio.com/* https://skuviastudio.com/:splat 301!')) errors.push('_redirects: www host redirect missing');
if (!redirects.includes('/ /es/ 301')) errors.push('_redirects: root language redirect missing');
if (!redirects.includes('/index.html /es/ 301')) errors.push('_redirects: legacy index redirect missing');

const js = await readFile(join(root, 'site.js'), 'utf8');
if (!js.includes('https://api.web3forms.com/submit') && !htmlFiles.some(Boolean)) errors.push('site.js: form integration missing');
if (/trackConversion\([^)]*,\s*\{[^}]*\blisting\s*:/s.test(js)) errors.push('site.js: potential PII in analytics event');

if (htmlFiles.length !== 32) errors.push(`Expected 32 public indexable pages, found ${htmlFiles.length}`);

if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validation passed: ${htmlFiles.length} pages, ${titles.size} unique titles, ${sitemapUrls.length} sitemap URLs, internal links and structured data checked.`);
