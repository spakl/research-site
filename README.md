# [LAB_NAME] research website

Static site, built with Jekyll (which GitHub Pages runs for you automatically —
you don't need to install anything locally to publish). Dracula color palette,
monospace type, code-editor-styled nav.

## Structure

```
_config.yml          site title, tagline, contact info — edit this first
_layouts/default.html   the HTML shell every page uses (nav + footer)
_includes/nav.html      the tab-bar navigation (edit once, changes everywhere)
_includes/footer.html   the status-bar footer
assets/css/style.css    all styling, colors, and the design tokens
assets/js/main.js       mobile nav toggle
assets/js/group-gate.js the (non-functional, see below) group login placeholder

index.html            homepage
research.html         project overview cards
publications.html     publication list by year
tutorials.html        Colab/notebook tutorial cards
photos.html           group photo grid
group/index.html      group area login placeholder
group/dashboard.html  group area content placeholder
```

Every page you'll actually edit is plain HTML with a bit of Liquid templating
at the top (the `---` front matter block) — you don't need to know Jekyll
beyond that to fill in content. Search each file for `[bracketed placeholders]`
and `TODO` comments.

## 1. First pass: find-and-replace

In `_config.yml`, fill in:
- `title`, `tagline`, `description`
- `email`, `github_org`, `university`

Then do a project-wide find-and-replace for `[LAB_NAME]`, `[PI_NAME]`, and
`[University]` (used as placeholder text in a few pages).

## 2. Fill in content

Go page by page — `research.html`, `publications.html`, `tutorials.html`,
`photos.html` — and replace the placeholder cards with real ones. Each page
has a `TODO` comment near the bottom telling you which block to duplicate.

**Tutorials — Colab vs. migrating to GitHub:** easiest is to keep your
notebooks on Colab (set sharing to "anyone with the link can view") and just
link out to them from `tutorials.html`. Moving them into this repo makes
sense later if you want them version-controlled with your code, but it's more
upkeep than it's worth for a first pass.

**Photos:** drop image files into `assets/img/photos/`, then in `photos.html`
swap each `<div class="photo-frame">` for
```html
<div class="photo-frame"><img src="/assets/img/photos/yourfile.jpg" alt="short description"></div>
```

## 3. Publish with GitHub Pages

1. Push this repo to GitHub (if you haven't already).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch,"
   branch `main`, folder `/ (root)`.
4. Save. GitHub will build the site with Jekyll automatically — no config
   needed beyond `_config.yml`, which is already here. First build takes a
   minute or two; the Pages settings page will show you the live URL.

### Custom domain

1. Still in **Settings → Pages**, under **Custom domain**, enter your domain
   and save. GitHub will create a `CNAME` file at the repo root for you
   automatically (containing just your domain name — don't hand-edit it
   unless you need to).
2. At your DNS provider, point the domain at GitHub Pages:
   - **Apex domain** (`yourlab.org`): four `A` records pointing at GitHub's
     Pages IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`).
   - **Subdomain** (`lab.yourdomain.org`): one `CNAME` record pointing at
     `<your-username>.github.io`.
   - Exact record types depend on your DNS host — GitHub's own docs
     ("Managing a custom domain for your GitHub Pages site") walk through
     each provider if you get stuck.
3. Back in Pages settings, once DNS has propagated, check **Enforce HTTPS**.

Until the custom domain is live, you can preview at
`https://<username>.github.io/<repo-name>/` — but note that links on this
site are written as root-relative (e.g. `/research.html`), which assumes the
site is served from the domain root. If you want to preview at a
`/<repo-name>/` path *before* the custom domain is attached, set
`baseurl: "/<repo-name>"` in `_config.yml` temporarily, then blank it again
once the custom domain is live.

## 4. Securing the group area

Straight talk: GitHub Pages can't check a password server-side — it only
serves files. The login box at `group/index.html` is a visual placeholder;
right now it accepts anything and moves on. Two real paths forward:

**A. Don't gate content in this repo at all (simplest, recommended).**
Keep `group/dashboard.html` as a directory of links, and let each destination
handle its own access:
- **Docs** → a Google Drive folder shared only with the group (Google's own
  login handles auth).
- **GitHub access** → invite members to a private repo or team in your
  GitHub org — GitHub's own permissions handle this.
- **Schedule / meetings** → a Google Calendar appointment schedule or
  Calendly link, shared with the group.
- **Resources** → can stay public, or live in the same shared Drive folder.

This means nothing sensitive ever lives in this public repo, and you're not
maintaining your own auth system.

**B. Add real login to the site itself.** Possible if you want the whole
experience to live on your domain: options include **Cloudflare Access**
(put the domain behind Cloudflare, gate `/group/*` with email-based login —
no code required) or a small serverless function using **GitHub OAuth**
(members log in with their GitHub account, you check org membership). Both
are more setup than most groups need — start with Option A and revisit this
only if it becomes a real bottleneck.

## Local preview (optional)

You don't need this to publish — GitHub builds it for you. If you want to
preview changes locally before pushing:

```bash
gem install bundler jekyll
bundle init
echo 'gem "github-pages", group: :jekyll_plugins' >> Gemfile
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.
