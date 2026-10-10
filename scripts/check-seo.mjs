import assert from 'node:assert/strict';
import http from 'node:http';

const base = process.argv[2] || 'http://localhost:3002';
const canonical = 'https://swarlabs.com';
const paths = ['/', '/about', '/careers'];
const titles = new Set();
const descriptions = new Set();

async function response(path) {
  const result = await fetch(new URL(path, base), {
    redirect: 'manual',
    signal: AbortSignal.timeout(30000),
  });
  assert.equal(result.status, 200, `${path}: expected public 200, got ${result.status}`);
  return result;
}

function attributeTags(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))].map(([text]) =>
    Object.fromEntries([...text.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])),
  );
}

for (const path of paths) {
  const result = await response(path);
  const html = await result.text();
  assert.match(result.headers.get('content-type') || '', /text\/html/);
  const tags = attributeTags(html, 'meta');
  const meta = (key) => tags.find((tag) => tag.name === key || tag.property === key)?.content;
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title?.includes('Swarlabs'), `${path}: missing branded title`);
  assert.ok(meta('description')?.length > 50, `${path}: missing description`);
  assert.match(meta('robots') || '', /^index, follow$/);
  const expectedUrl = new URL(path, canonical).toString();
  const links = attributeTags(html, 'link').filter((link) => link.rel === 'canonical');
  assert.equal(links.length, 1, `${path}: exactly one canonical`);
  assert.equal(new URL(links[0].href).toString(), expectedUrl);
  assert.equal(new URL(meta('og:url')).toString(), expectedUrl);
  assert.equal(meta('og:title'), title);
  assert.equal(meta('twitter:card'), 'summary_large_image');
  assert.ok(meta('og:image')?.startsWith(`${canonical}/opengraph-image`));
  assert.ok(meta('twitter:image')?.startsWith(`${canonical}/opengraph-image`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one main heading`);
  titles.add(title);
  descriptions.add(meta('description'));
  if (path === '/') {
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    assert.ok(json, 'Homepage structured data missing');
    const data = JSON.parse(json);
    assert.equal(data['@context'], 'https://schema.org');
    assert.deepEqual(data['@graph'].map((item) => item['@type']), ['Organization', 'WebSite']);
    assert.ok(data['@graph'].every((item) => item.url === canonical));
  }
  console.log(`PASS ${path}: metadata, canonical, indexing and heading`);
}
assert.equal(titles.size, paths.length, 'Titles must be unique');
assert.equal(descriptions.size, paths.length, 'Descriptions must be unique');

for (const path of ['/robots.txt', '/robots.txt?check=1']) {
  const result = await response(path);
  assert.match(result.headers.get('content-type') || '', /text\/plain/);
  const text = await result.text();
  assert.ok(text.includes(`Sitemap: ${canonical}/sitemap.xml`));
  assert.match(text, /Allow: \/\s/);
  assert.match(text, /Disallow: \/api\//);
}
console.log('PASS robots.txt: public, including query parameters');

const sitemap = await response('/sitemap.xml');
assert.match(sitemap.headers.get('content-type') || '', /xml/);
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
assert.deepEqual(urls, paths.map((path) => new URL(path, canonical).toString()));
console.log('PASS sitemap.xml: canonical public URLs only');

const preview = await response('/opengraph-image');
assert.match(preview.headers.get('content-type') || '', /image\/png/);
const png = Buffer.from(await preview.arrayBuffer());
assert.equal(png.subarray(1, 4).toString(), 'PNG');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
console.log('PASS social image: public 1200 x 630 PNG');

const login = await response('/sign-in');
const loginRobots = attributeTags(await login.text(), 'meta').find((tag) => tag.name === 'robots');
assert.match(loginRobots?.content || '', /noindex/);
console.log('PASS sign-in: excluded from search indexing');

let redirect;
if (new URL(base).protocol === 'http:') {
  // Node HTTP lets the local test exercise Next's actual Host-based redirect.
  redirect = await new Promise((resolve, reject) => {
    const req = http.get(new URL('/about?source=seo-check', base), {
      headers: { host: 'www.swarlabs.com' },
    }, (res) => {
      res.resume();
      resolve({ status: res.statusCode, location: res.headers.location });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy(new Error('Redirect request timed out')));
  });
} else {
  const result = await fetch('https://www.swarlabs.com/about?source=seo-check', {
    redirect: 'manual', signal: AbortSignal.timeout(30000),
  });
  redirect = { status: result.status, location: result.headers.get('location') };
}
assert.equal(redirect.status, 308);
assert.equal(redirect.location, `${canonical}/about?source=seo-check`);
console.log('PASS www: permanent redirect preserves path and query');
console.log('All SEO checks passed.');
