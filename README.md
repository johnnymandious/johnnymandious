# Johnny Mandious

The source for [johnnymandious.com](https://johnnymandious.com/): art, an AI blog and a longevity page. It is plain static HTML, CSS and a little JavaScript, with no build step. The workflow in `.github/workflows/static.yml` publishes it to GitHub Pages whenever `main` changes.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Homepage: art gallery (click a drawing for a full-size lightbox with ← → navigation) and the latest writing |
| `blog.html` | AI Blog: every entry, with search, year filters and a timeline |
| `longevity.html` | Longevity posts plus the longest verified human lifespans |
| `about.html` | About, plus a "Start here" reading list |
| `posts/*.html` | Individual posts, each with reading time, share buttons and newer/older links |
| `404.html` | Not-found page (uses root-relative links because GitHub Pages serves it at any path) |
| `art.html`, `journal.html` | Old addresses that redirect to the homepage and blog |

Supporting files: `journal.css` (all styling), `timeline.js` (blog search and filters), `art-gallery.js` (lightbox), `post.js` (reading progress bar, copy-link and native share buttons).

## SEO files

- `sitemap.xml` lists every indexable page and its images. Update `<lastmod>` when a page changes and add new posts.
- `feed.xml` is the RSS feed. Add a new `<item>` at the top for each new post.
- `robots.txt` allows everything and points to the sitemap.
- `llms.txt` is a plain summary of the site for AI assistants and search tools.
- Every page has a title, description, canonical URL, Open Graph and X card tags, and JSON-LD structured data: `Person`, `WebSite`, `Blog`, `BlogPosting` and `BreadcrumbList`, plus `VisualArtwork` on the homepage.
- Icons: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` and `site.webmanifest` with icons in `assets/brand/`. `assets/brand/og-*.jpg` are the share images for pages that have no cover.

All absolute URLs use `https://johnnymandious.com/`. If the domain changes, search and replace it across the repository.

## Adding a new blog post

1. Copy an existing post in `posts/`, such as `posts/opus-5-5-and-gpt-6-sol.html`, and rename it with a short, lowercase, hyphenated name.
2. Update the `<title>`, meta description, canonical URL, `og:`/`twitter:` tags, `article:published_time`, the JSON-LD block (headline, description, image, dates and `wordCount`), the `<h1>`, the date, the read time and the share links.
3. Put the cover image in `assets/covers/`. Prefer JPEG around 1200×630 and under about 150 KB.
4. In `blog.html`, add a card at the top of the post grid, a timeline entry and a JSON-LD `blogPost` item. Update the entry count in the timeline text.
5. Fix the newer/older links in the neighbouring posts.
6. Add the post to `sitemap.xml`, `feed.xml` and `llms.txt`, and consider swapping it into "Latest writing" on `index.html`.

## Adding a drawing

Put the full image in `assets/art/`. Make 480px and 960px wide copies in `assets/art/thumbs/`, named `<name>-480.jpg` and `<name>-960.jpg`, then copy a `<figure class="art-card">` block in `index.html`. Add the image to the homepage `<url>` in `sitemap.xml` and a `VisualArtwork` entry to the homepage JSON-LD.

## Notes

- Archive posts keep the opinions and claims as they were written at the time. Month-only entries don't invent a publication day.
- Fonts are Space Grotesk (SIL Open Font License) in `fonts/` as WOFF2.
- OLWA Issue 1 and Issue 3 are embedded in the January 2025 DeepSeek and March 2025 OLWA posts, as page images plus the PDFs.
