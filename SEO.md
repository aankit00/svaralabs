# Search setup

The canonical site is https://swarlabs.com. The www host redirects permanently to
the same path on that domain, preserving query parameters.

## Implemented

- Unique titles, descriptions, canonical links, Open Graph and Twitter metadata
  for the home, about, and careers pages.
- Public /robots.txt, /sitemap.xml and /opengraph-image routes that bypass auth.
- Sitemap includes only public marketing pages. No invented last-modified dates.
- Root metadata defaults to noindex; public pages explicitly enable indexing.
  Keep login pages crawlable so search engines can read their noindex directive.
- Organization and WebSite structured data on the homepage, with no invented
  ratings, offers or job listings.

## After deployment

1. Verify the swarlabs.com domain property in Google Search Console. Add Google's
   own verification TXT record at your DNS provider; the Railway verification
   record does not verify Google ownership.
2. Submit https://swarlabs.com/sitemap.xml under Sitemaps.
3. Inspect the homepage and /about URLs and request indexing.
4. Check indexing reports and Core Web Vitals once Google has collected data.
5. Keep descriptions and sitemap entries current when adding public pages.

Do not put service API keys in search verification tags. Search Console account
verification and sitemap submission are separate from deploying these changes.

## Validation

Run npm run build, start the production server, then run:

    node scripts/check-seo.mjs http://localhost:3002

For production:

    node scripts/check-seo.mjs https://swarlabs.com

The check verifies public responses, per-page metadata, structured data, crawler
files, the social image, login noindex, and the www redirect with path/query
preservation.
