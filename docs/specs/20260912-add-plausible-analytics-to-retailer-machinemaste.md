---
task: 20260912-add-plausible-analytics-to-retailer-machinemaste
company: machinemaster
status: blocked
size: M
branch: fix/add-plausible-analytics-to-retailer-machinemaste
base: dev
design: none
---

# Add Plausible Analytics (hosted, EU, cookieless) plus four custom events to the retailer landing page

## Goal

Load the hosted Plausible Analytics script on every page of `retailer.machinemaster.de` (this
repo, `retailer-landing-page`, Nuxt 4 static build) and fire exactly four custom events with no
extra properties: `Contact Form Submitted`, `Pricing CTA Click`, `Trial CTA Click`,
`Retailer Login Click`. Add one German sentence naming Plausible at the end of section 5.1 of the
existing `/data-privacy` page, flagged for a lawyer. No cookie banner work, no GA/GTM work, no
design or copy changes beyond that one sentence.

**Blocked on one input:** the exact per-site Plausible snippet from the Plausible dashboard
(Site settings → General → Site installation). See "Risks and open questions" — the goal cannot be
turned into a testable criterion without it, and the requester explicitly forbade guessing or
falling back to the pre-October-2025 generic `data-domain` script.

## Assumptions

- The site to be added in Plausible is `retailer.machinemaster.de`; the snippet Christian supplies is for that site and nothing else.
- The snippet is a normal `<script>` tag (an `src` on `plausible.io` or a Plausible-provided host, plus optionally a second inline `<script>` that defines the `window.plausible` queue stub). It is not a Google-Tag-Manager-style loader and needs no extra runtime config — **unverified**, it depends on the snippet.
- "The Plausible script is loaded on every page" means: every HTML file produced by `npm run generate` under `.output/public/`, in both locales (`/` and `/en/…`), including the generated error/fallback HTML (`404.html`, `200.html`) if the build produces them.
- "Trial CTA" is the single `NuxtLink` in `app/components/TrialCta.vue`. Its visible label is **"Kontakt"**, not "Jetzt Testversion anfordern" — that German string is the section *heading* (`home.trialCta.title`, "Jetzt Testversion anfordern — 100% freier Zugang"). Same button, different label than the brief states.
- "Pricing CTA" is both pricing-card CTAs in `app/components/PricingTable.vue` (the Händlerbörse card, label `home.pricing.simple.cta` = "Jetzt anmelden", and the combined card, label `home.pricing.combined.cta` = "Holen Sie sich jetzt Ihr Preisangebot"). Both fire the same event name; no property distinguishes them, because the brief says no extra properties.
- "Retailer Login Click" is both `https://app.machinemaster.de/retailer/login` anchors in `app/components/AppHeader.vue` (desktop, line 67; mobile menu, line 106). There is no third login link anywhere — the footer has none (grepped).
- Not tracked, deliberately: the hero CTA (`HeroSection.vue`, label "Kontakt"), the header "Kontakt" button (`AppHeader.vue` line 76), the `mailto:` link on `/contact`. These are the alternates the brief says Christian may swap in at gate 1.
- "Fires only on actual successful submission" means: after the awaited `$fetch` in `ContactForm.handleSubmit` resolves and `status` becomes `'success'`. Not on submit attempt, not on the error branch, not twice on a double click (the button is disabled while `status === 'submitting'`).
- Tracking loads everywhere, including local dev and any deploy preview; previews/localhost get excluded on the Plausible side (hostname filter in Site settings), not in this repo. Reason: the repo has **no** env-based production switch to reuse (checked — see "Context found"), and the brief forbids inventing one.
- Deploy previews may not even exist for this site: hosting is unconfirmed (`netlify.toml` is present but the knowledge base records the site is *not* on Netlify). **Unverified.**
- The privacy sentence is German only and lives in the single `content/legal/data-privacy.md`, which serves both `/data-privacy` and `/en/data-privacy` — so one sentence covers both locales, as the brief states.
- "No cookies set by the addition" is about the Plausible script only. The existing `cookie-consent` **localStorage** entry written by `CookieBanner.vue` stays exactly as it is, and nothing is gated on it (see "Risks").
- There is no test runner in this repo, so "tests green" means `npm run generate` succeeds and the checks under "Verification and evidence" are run and reported by hand.

Correct me at gate 1, otherwise I proceed with these.

## Context found

- `nuxt.config.ts`: `app.head.link` already carries third-party tags for every page (the Adobe Typekit stylesheet plus `preconnect`s, with a comment explaining why they load on previews and localhost too). This is the existing pattern for "a third-party tag on every page" and the one to extend. `runtimeConfig.public` holds only `siteUrl`; `nitro.prerender.crawlLinks: true` means every linked route is prerendered to static HTML.
- **No env-based production/preview switch exists.** No `.env*` file, no `NUXT_PUBLIC_*` read anywhere, no `import.meta.dev` / `process.env` branch in `app/`, and `netlify.toml` sets only `NODE_VERSION = "24"`. Nothing to reuse, so nothing is invented (brief item 3).
- **No Google Tag Manager and no GA in this repo's current branch state** (brief item 5, confirmed not assumed): a case-insensitive grep over the whole worktree for `gtm`, `googletagmanager`, `dataLayer`, `gtag`, `google-analytics`, `GTM-` matches only three unrelated base64 `integrity` hashes in `package-lock.json`. `app/` contains no `<script>` tag of any kind, `public/` holds only icons, images and `robots.txt`, and there is no `app/plugins/` directory. The knowledge base agrees (`knowledge-base/architecture/frontends.md` line 16 lists the landing page as "none, static build"). The old note the brief refers to is `mm-ads/CLAUDE.md` line 334 ("`retailer.machinemaster.de` has its **own** web container and shares the same tagging server. Out of scope.") — that describes a container in the **GTM account**, and predates the move off Webflow; the container may well still exist server-side, but **the site's source no longer loads it**. Nothing to touch or remove.
- `app/components/ContactForm.vue`: `handleSubmit` does `await $fetch('/', { method: 'POST', … })` with Netlify form attributes (`data-netlify`, `netlify-honeypot`, hidden `form-name`), then sets `status = 'success'` and resets the form; a throw sets `status = 'error'`. The success branch is the single insertion point. (`frontends.md` line 28 already records "no visible submit target (open question)" — see "Risks".)
- `app/components/PricingTable.vue` lines 32 and 66: the two pricing CTAs, both `NuxtLink` to `localePath('/contact')` styled as buttons.
- `app/components/TrialCta.vue` line 11: the single trial CTA, `NuxtLink` to `localePath('/contact')`.
- `app/components/AppHeader.vue` lines 67–75 and 106: the two `Händler-Login` anchors (`target="_blank" rel="noopener"`), so the click keeps the current document alive — no `sendBeacon`/unload handling is needed for the event to reach Plausible.
- `app/components/CookieBanner.vue`: writes `cookie-consent` to **localStorage** (not a cookie) and gates nothing — no analytics tag is conditional on it today, and after this change Plausible will load regardless of accept/decline.
- `app/composables/{useContent,usePageSeo}.ts`: the repo's composable pattern — a plain exported `function useX()` in `app/composables/`, JSDoc-style comment at the top, no default export. A new `useAnalytics.ts` follows it.
- `content/legal/data-privacy.md`: German, section `### 5.1. Beschreibung und Umfang der Datenverarbeitung` runs from line 95 to line 103; its last paragraph (line 103) is the one about analytics cookies and the info banner. Rendered by `useLegalPage()` through `markdown-it` with `html: false` into `app/pages/data-privacy.vue`.

## Approach

Extend the existing `app.head` pattern in `nuxt.config.ts`: add the supplied Plausible snippet as
`app.head.script` (an entry with `src` + `defer` + whatever attributes the snippet carries, plus the
inline queue-stub entry if the snippet has one), next to the Typekit `link` entries and with a
comment in the same style saying where the snippet came from and that it loads on previews and
localhost too. Because the site is prerendered, the tag then lands in every generated HTML file with
no plugin, no module and no new dependency.

Rejected: `@nuxtjs/plausible` (a new dependency, and it generates its own tag rather than using the
per-site snippet the brief requires); `useHead()` in `app.vue` (works, but `app.vue` is already
carrying the i18n head logic, and `nuxt.config.ts` is where this repo keeps site-wide third-party
tags); a client plugin that injects the tag only when `location.hostname === 'retailer.machinemaster.de'`
(it would keep preview and localhost traffic out of Plausible, but the prerendered HTML would then
*not* contain the script tag, which contradicts the brief's own verification step, and it is a
production-only switch of exactly the kind the brief says not to invent — hostname filtering belongs
in Plausible's settings).

For the events, add one composable `app/composables/useAnalytics.ts` exposing a single
`trackEvent(name: string)` that is a no-op during SSR/prerender and calls `window.plausible?.(name)`
in the browser — one argument only, so no properties are ever sent. Four call sites use it; the
event names are string literals in a `const` map inside the composable so a typo is a build-time
error rather than a silently wrong event name in Plausible. A one-line queue stub
(`window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }`)
must be present in the head so a click before the deferred script finishes loading is queued rather
than dropped — added only if the supplied snippet does not already contain it, never twice.

For privacy, append one German sentence to the last paragraph of section 5.1 in
`content/legal/data-privacy.md`. Proposed wording (Christian/lawyer to confirm):

> Zur Reichweitenmessung setzen wir Plausible Analytics ein, einen in der Europäischen Union
> gehosteten Webanalyse-Dienst, der ohne Cookies arbeitet und keine personenbezogenen Daten erhebt.

Nothing else in that file is rewritten, reordered or deleted.

## Files to change

| File | Change | Why |
|---|---|---|
| `nuxt.config.ts` | Add `app.head.script` with the supplied Plausible snippet (+ inline queue stub if the snippet lacks one) and a comment in the style of the existing Typekit comment | The tag must be in every prerendered page; this is where this repo keeps site-wide third-party tags |
| `app/composables/useAnalytics.ts` (new) | `trackEvent(name)` — SSR-safe no-op, `window.plausible?.(name)` in the browser, plus the four event-name constants | One place that knows the event names and that no properties are sent |
| `app/components/ContactForm.vue` | Call `trackEvent('Contact Form Submitted')` in `handleSubmit` immediately after `status.value = 'success'` | Fires only on an actually successful submission |
| `app/components/PricingTable.vue` | `@click` on both pricing CTAs (lines 32, 66) → `trackEvent('Pricing CTA Click')` | Both pricing-card buttons, one event name |
| `app/components/TrialCta.vue` | `@click` on the CTA (line 11) → `trackEvent('Trial CTA Click')` | The trial-section CTA |
| `app/components/AppHeader.vue` | `@click` on both `retailer/login` anchors (lines 67, 106) → `trackEvent('Retailer Login Click')` | Header login, desktop and mobile |
| `content/legal/data-privacy.md` | Append the one German Plausible sentence at the end of section 5.1 (after line 103) | Brief item 4; German only, serves both locales |

No other file is touched. No dependency is added or upgraded; `package.json` and `package-lock.json` stay byte-identical.

## Acceptance criteria

1. `npm run generate` exits 0 with no new warning attributable to this change.
2. Every HTML file under `.output/public/` contains exactly one `<script>` tag whose `src` is the Plausible script URL from the supplied snippet — not zero, not two — in both locales and including any generated `404.html` / `200.html`.
3. The Plausible `src` in the generated HTML is character-for-character the one from the supplied snippet, and every attribute of the supplied snippet (e.g. `defer`, `data-domain`, and any `data-*` the snippet carries) is present with the supplied value.
4. Every HTML file under `.output/public/` contains a `window.plausible` queue stub (the snippet's own, or the one added alongside it) exactly once, and it appears before or with the deferred script tag so that an event fired before the script loads is queued rather than lost.
5. `app/composables/useAnalytics.ts` exports a function that, called during SSR/prerender, does nothing and throws nothing.
6. In a browser, `trackEvent(<any name>)` when `window.plausible` is undefined does nothing and throws nothing (no console error, no unhandled rejection).
7. Every `trackEvent` call reaching `window.plausible` passes exactly one argument, a string — no second properties/options argument anywhere in the diff.
8. Exactly these four event-name strings appear in the shipped code, each spelled exactly so: `Contact Form Submitted`, `Pricing CTA Click`, `Trial CTA Click`, `Retailer Login Click`. No fifth event name, no variant spelling.
9. Clicking either pricing-card CTA on the home page fires `Pricing CTA Click` exactly once, and the navigation to `/contact` still happens.
10. Clicking the trial-section CTA fires `Trial CTA Click` exactly once, and the navigation to `/contact` still happens.
11. Clicking the header `Händler-Login` link fires `Retailer Login Click` exactly once, from the desktop header and, independently, from the mobile menu; the link still opens `https://app.machinemaster.de/retailer/login` in a new tab.
12. Submitting the contact form successfully fires `Contact Form Submitted` exactly once and the success box still appears.
13. A contact-form submission that fails fires no event at all, and the existing error message still appears.
14. Section 5.1 of the rendered `/data-privacy` page ends with one sentence that names Plausible and states EU hosting, cookieless operation and that no personal data is collected; the same sentence is present on `/en/data-privacy` (German, as intended).
15. `content/legal/data-privacy.md` differs from its `dev` state by exactly that one added sentence — no other line added, removed or reworded, in particular nothing in 5.2, 5.3 or 5.4.
16. Loading and browsing the built site sets no cookie: `document.cookie` is empty before and after visiting `/`, `/contact` and firing all four events, and DevTools → Application → Cookies lists none for the preview host.
17. No Google Tag Manager or Google Analytics code is added, removed or modified: no generated HTML file contains `googletagmanager`, `gtag(`, `dataLayer` or a `GTM-` id, and the diff contains none of those strings.
18. `package.json` and `package-lock.json` are unchanged from `dev`.
19. The cookie banner behaves exactly as before (appears when `cookie-consent` is absent from localStorage, both buttons dismiss it and persist the value) and the Plausible script loads whether the banner was accepted, declined or ignored.

## Test plan

This repo has **no test runner, no lint and no test directory** (`package.json` scripts: `build`,
`dev`, `generate`, `preview`, `postinstall`; confirmed against `knowledge-base/architecture/frontends.md`
line 45). So the Test Writer adds no test framework here, and every criterion is proven by the
build, by mechanical checks over the generated HTML, and by a hand pass on the local preview — each
reported explicitly, per the task's stated test command.

- Build: `npm run generate` (criterion 1).
- Static checks over `.output/public/**/*.html` and over the diff: criteria 2, 3, 4, 7, 8, 15, 17, 18 — commands below.
- Runtime checks on `npm run preview` with `window.plausible` stubbed: criteria 5, 6, 9–14, 16, 19 — commands below.

The Technical Tester runs every command under "Verification and evidence" and pastes the actual
output; a criterion with no pasted evidence counts as not verified.

## What to click

1. Home page (`/`): click each of the two pricing-card buttons ("Jetzt anmelden", "Holen Sie sich jetzt Ihr Preisangebot") — each records one `Pricing CTA Click` and still lands on `/contact`.
2. Home page: click the trial-section button (the "Kontakt" button under "Jetzt Testversion anfordern — 100% freier Zugang") — one `Trial CTA Click`, still lands on `/contact`.
3. Header "Händler-Login" at desktop width, then again from the burger menu below `lg` — one `Retailer Login Click` each, and a new tab opens at `app.machinemaster.de/retailer/login`.
4. `/contact`: submit the form with the fetch stub returning 200 — green success box and exactly one `Contact Form Submitted`; then with the stub returning 500 — red error text and no event.
5. `/data-privacy` and `/en/data-privacy`: the new Plausible sentence is the last sentence of section 5.1, reads as correct German, and nothing else in section 5 looks changed; the cookie banner still appears on a fresh profile and both of its buttons still dismiss it.

## Verification and evidence

All commands are PowerShell, run from the repo root after `npm install`.

1. **Build** (criterion 1): `npm run generate` — paste the last ~15 lines including the exit status.
2. **One Plausible tag per page** (criteria 2, 3). With `$src` set to the exact `src` string from the supplied snippet:
   ```powershell
   $src = '<PASTE THE EXACT src FROM THE SNIPPET>'
   Get-ChildItem -Recurse -Filter *.html .output\public | ForEach-Object {
     $n = ([regex]::Matches((Get-Content $_.FullName -Raw), [regex]::Escape($src))).Count
     if ($n -ne 1) { "FAIL $($_.FullName) = $n" }
   }
   ```
   Evidence: no output = pass. Also paste the file count (`(Get-ChildItem -Recurse -Filter *.html .output\public).Count`) so "every page" is a number, and paste the full `<script …plausible…>` line from `.output\public\index.html` and from `.output\public\en\index.html` so the attributes (criterion 3) can be read back.
3. **Queue stub exactly once** (criterion 4): same loop against the stub's distinctive substring (`plausible.q`), expecting `1` in every file; paste the stub line from `index.html` and confirm it sits before/with the script tag.
4. **No properties, only four names** (criteria 7, 8): `git diff dev -- . | Select-String -Pattern "trackEvent|plausible"` — paste it; every `trackEvent(` call must show exactly one string argument, and the four literals must appear exactly as specified with no fifth.
5. **Privacy file touched minimally** (criterion 15): `git diff --stat dev -- content/legal/data-privacy.md` must show `1 file changed, 1 insertion(+)` (or `1 insertion, 1 deletion` if the sentence is appended to the existing line-103 paragraph) — paste the stat and the full `git diff` of that file.
6. **No GTM/GA anywhere** (criterion 17): `Get-ChildItem -Recurse -Filter *.html .output\public | Select-String -Pattern 'googletagmanager|dataLayer|gtag\(|GTM-'` → no output; plus `git diff dev -- . | Select-String -Pattern 'googletagmanager|dataLayer|gtag|GTM-'` → no output. Paste both (empty) results.
7. **Lockfile untouched** (criterion 18): `git diff --stat dev -- package.json package-lock.json` → no output.
8. **Events on the preview** (criteria 5, 6, 9–13, 19): `npm run preview`, then in the DevTools console **before** interacting:
   ```js
   window.__ev = []; window.plausible = (...a) => window.__ev.push(a)
   ```
   Click through "What to click" 1–3 on `/` (re-run the stub line after each navigation, since a page load resets it), then read `window.__ev`. Evidence: paste `JSON.stringify(window.__ev)` per page — it must contain exactly the expected names, and `window.__ev.every(a => a.length === 1)` must be `true`. For criterion 6, reload with `delete window.plausible` and click one CTA: paste the console showing no error.
9. **Contact form, both branches** (criteria 12, 13): on `/contact`, stub the event recorder as above, then stub the transport — Nuxt's `$fetch` is `ofetch`, which uses `globalThis.fetch` (**unverified for the pinned version**; if the stub does not take effect the Tester reports that instead of guessing a workaround):
   ```js
   window.fetch = () => Promise.resolve(new Response('ok', { status: 200 }))   // success branch
   window.fetch = () => Promise.resolve(new Response('no', { status: 500 }))   // error branch
   ```
   Evidence: a screenshot of the green success box with `window.__ev` showing exactly one `["Contact Form Submitted"]`, and a screenshot of the red error text with `window.__ev` empty.
10. **No cookies** (criterion 16): on the preview with the real Plausible script loaded (stub removed), paste `document.cookie` (must be `""`) after visiting `/` and `/contact` and firing the events, plus a screenshot of DevTools → Application → Cookies showing none for the preview host.
11. **Privacy page** (criterion 14): screenshots of `/data-privacy` and `/en/data-privacy` showing the end of section 5.1 with the new sentence.
12. **PR body must state** (brief items 3 and 5, and the lawyer flags): (a) that tracking loads everywhere including any deploy preview and localhost, that this repo has no env-based production switch to reuse and none was invented, and that preview/local traffic is to be excluded by hostname in Plausible's Site settings; (b) the GTM finding verbatim — this repo's current `dev` contains no GTM/GA code at all, the `mm-ads` note about a container for `retailer.machinemaster.de` predates the 2026-09-05 move off Webflow, nothing was touched or removed; (c) **lawyer to confirm** on the new Plausible sentence; (d) **lawyer to look** at the pre-existing section 5 cookie text regardless — it reads as copied from another site (it mentions "die Funktion der Kursabwicklung", i.e. course processing, which this site has no such thing as, and the intro scopes the document to "machinemaster.de"), and it claims analytics cookies are used and consent is collected via a banner while the actual banner gates nothing and Plausible sets no cookie; not rewritten here, one sentence added only.

## Will not do

- No `git checkout`, `rebase`, `merge`, `push`; no touching `dev` or `main`; no PR merge.
- No change in any other repo (`retailer-frontend` in particular — the prior wrong-repo attempt stays cleaned up).
- No cookie-banner change, no consent gating, no rewrite or reordering of the existing section 5 privacy text.
- No GA/GTM addition, removal or modification, in this repo or in the GTM account.
- No Plausible goal, funnel, site or API call from this task — Christian creates the goals in the Plausible UI once the site is added. `PLAUSIBLE_API_KEY` is not read, not referenced and not copied into this repo.
- No new dependency, no dependency upgrade, no `npm install <pkg>`, no lockfile change.
- No content, copy, layout or design change beyond the tag, the four event calls and the one privacy sentence.
- No new test framework, config or test directory in this repo.
- No hostname/environment switch invented in code, and no hostname filter set in Plausible's settings by an agent (that is Christian's, in the dashboard).

## Stop conditions

- The exact per-site snippet is not supplied, or what is supplied is not a Plausible per-site snippet (e.g. a generic pre-October-2025 `data-domain` example, a GTM container, or an API key) → stop and ask. Do not fall back to the old generic script and do not construct a `src` by hand.
- `retailer.machinemaster.de` is not yet added in Plausible, so no snippet exists yet → stop and ask.
- Christian swaps in an alternate trigger (hero button, header Kontakt button, the `/contact` email link) or changes an event name at gate 1 → stop, take the amended list, do not additionally keep the original four "just in case".
- `npm run generate` fails on `dev` before any edit (a pre-existing breakage) → stop and report; do not fix it inside this task.
- The generated HTML shows zero or two Plausible tags and the cause is not obvious in the diff → stop and report; do not add a second injection path to compensate.
- The contact-form fetch stub does not take effect, so the success branch cannot be exercised locally → stop and report which criteria are therefore unproven; do not edit `ContactForm.vue` temporarily to force the branch.
- Anything requires touching `content/legal/data-privacy.md` beyond appending the one sentence → stop and ask.

## Risks and open questions

- **blocks — the exact per-site Plausible snippet is missing.** It is not in this brief, and there is no constraints/notes file anywhere for this task (searched the worktree and `C:\code\machinemaster`). Since October 2025 Plausible issues a per-site snippet available only from that site's own Site settings → General → Site installation, and it only exists once `retailer.machinemaster.de` has been added to the account. Without it, criteria 2, 3 and 4 cannot state an expected `src` or attribute set, and the brief explicitly forbids guessing or using the old generic `data-domain` script. Needed: the snippet pasted verbatim, both `<script>` lines if there are two. Everything else in this spec is complete, so gate 1 can be one round: paste the snippet, approve the four events, confirm the "loads everywhere" decision.
- **The contact form may never reach its success branch in production, so `Contact Form Submitted` may never fire live.** `handleSubmit` POSTs to `/` with Netlify form attributes, but the knowledge base records this site is *not* on Netlify and the hosting is unconfirmed; `frontends.md` line 28 already lists "no visible submit target" as an open question. A static host answering a POST to `/` with 404/405 puts the form in its error branch, so no event. This does not block: criterion 12 is about firing on success and is verifiable locally with a stubbed transport, and criterion 13 pins the error branch. But the PR should say plainly that a live `Contact Form Submitted` count of zero is more likely a form-delivery problem than a tracking problem. Fixing the form is out of scope.
- **Manual-only criteria.** 9–14, 16 and 19 cannot be proven mechanically in this repo (no test runner, no browser automation). They are covered by "What to click" plus the stubbed-console procedure in "Verification and evidence" items 8–11; the evidence is pasted console output and screenshots. If Christian wants these machine-checked, that means introducing a test runner (Vitest + Playwright) to a repo that has none — a separate task, not this one.
- **Deploy previews are unconfirmed.** If this site has no preview environment at all, the "loads everywhere vs production-only" decision is moot in practice and only localhost traffic is affected (Plausible's own script is documented not to send events from `localhost` — **unverified against the supplied snippet variant**). Does not block.
- **The Plausible account-side steps are not part of this task and the events will show nothing until they are done:** adding the site, creating the four goals in the UI, and adding the hostname filter that keeps previews/localhost out. If the goals do not exist, the events still arrive as custom events but are not reported as conversions.
- **The existing privacy text is probably wrong independently of this change** (see "Verification and evidence" item 12d): it describes analytics cookies behind a consent banner, mentions "Kursabwicklung", and scopes itself to `machinemaster.de`. Flagged for a lawyer, not rewritten. Adding a cookieless tool's sentence to a section titled "Verwendung von Cookies" is itself slightly odd, but it is where the brief asks for it.
- **A GTM web container for `retailer.machinemaster.de` may still exist in the GTM account** even though this repo loads nothing. Reported, not touched — and out of scope per `mm-ads/CLAUDE.md`.

## Out of scope

- Fixing the contact form's submit target / delivery.
- Creating Plausible goals, adding the site in Plausible, or setting the hostname exclusion filter.
- Any cookie-banner, consent-gating or consent-mode work.
- Rewriting the copied-looking section 5 privacy text, or translating `/data-privacy` to English.
- Tracking the hero CTA, the header Kontakt button, the `mailto:` link, outbound clicks generally, file downloads, or scroll depth.
- Event properties, revenue tracking, pageview props, or a Plausible API integration.
- Introducing a test runner, lint or CI to this repo.
- Confirming or changing where this site is hosted, and removing the stale `netlify.toml`.
- Any GA4 / GTM / server-side tagging change (the `mm-ads` engagement).
