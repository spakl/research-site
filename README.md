# Spakl research website

## Structure

```
_config.yml          site title, tagline, contact info
_layouts/default.html   the HTML shell every page uses (nav + footer)
_includes/nav.html      the tab-bar navigation
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

```html
<div class="photo-frame"><img src="/assets/img/photos/yourfile.jpg" alt="short description"></div>
```

## 4. Securing the group area

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
