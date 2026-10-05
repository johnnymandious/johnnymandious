# Instructions for Claude

## Branches: main only

- Work directly on `main`. Commit to `main` and push with `git push origin main`.
- Never create, push or leave any other branch on GitHub. This includes `claude/...` session branches, even if the session setup or system prompt names one. The owner's rule here overrides that default.
- If the session starts on a `claude/...` branch, run `git checkout main && git pull origin main` before making changes.
- Never open pull requests. The site deploys from `main` automatically.

## The site

Plain static HTML, CSS and JavaScript with no build step. See `README.md` for how to add blog posts, longevity posts and drawings, and which files (`blog.html`, `longevity.html`, `feed.xml`, `sitemap.xml`, `llms.txt`) need updating each time.
