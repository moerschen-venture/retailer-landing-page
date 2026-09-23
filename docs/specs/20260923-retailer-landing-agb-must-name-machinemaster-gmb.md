---
task: 20260923-retailer-landing-agb-must-name-machinemaster-gmb
company: machinemaster
status: ready
size: S
branch: fix/retailer-landing-agb-must-name-machinemaster-gmb
base: dev
design: none
---

# AGB must name MachineMaster GmbH & Co. KG as the contracting entity, not Heinrich Moerschen GmbH

## Goal

The AGB page of the retailer landing page (`/terms-of-use`) names "Heinrich Moerschen GmbH" as the
party the customer contracts with, while the Impressum correctly names "MachineMaster GmbH & Co.KG".
MachineMaster GmbH & Co. KG is the legal entity of the joint venture; Heinrich Moerschen GmbH is only
the JV partner. Replace the contracting-party clause in the AGB with the MachineMaster entity, using
the address, representation chain and register data already stated in the Impressum, so that after
the change no rendered page or template of the site names Heinrich Moerschen GmbH as the contracting
party. The Impressum itself is not touched.

## Assumptions

- "Every occurrence in the AGB" means the single party clause in `§ 1 Geltungsbereich (1)` of
  `content/legal/terms-of-use.md` — that is the only place in the whole repository where a rendered
  page names Heinrich Moerschen GmbH (verified by grep over `app/`, `content/`, `i18n/`, `public/`).
- There is no footer text, contact-form text, e-mail template or order-confirmation text on this site
  that names any legal entity: the landing page is a static marketing site with no shop and no
  backend, the footer renders only navigation links plus `footer.copyright`/`footer.tagline`
  (`app/components/AppFooter.vue`), and the only entity name in i18n is already
  "MachineMaster GmbH & Co. KG" (`i18n/locales/{de,en}.json`, key `seo.impressum.description`).
  Nothing beyond the AGB markdown therefore has to change for the goal.
- `content/extraction/**` is not a page or a template: `app/composables/useContent.ts` globs only
  `content/articles/*.md` and `content/legal/*.md`, so nothing under `content/extraction/` is
  rendered or prerendered. It is the verbatim capture of the previous live site kept as a source
  record, and its copy of the wrong sentence stays verbatim — only its closing "Note" (which asks for
  exactly this discrepancy to be flagged to the client) gets one sentence recording the resolution.
- The `Moerschen` entry in `app/components/BrandCarousel.vue` (partner/brand logo strip on the home
  page) is a legitimate partner logo, not a statement about the contracting party, and stays.
- The correct entity string for the AGB is `MachineMaster GmbH & Co. KG` — spelled with a space
  after `Co.`, as Christian wrote it and as `content/legal/data-privacy.md` line 5 spells it. The
  Impressum and `data-privacy.md` line 13 spell it `MachineMaster GmbH & Co.KG` without the space;
  that inconsistency predates this task, is cosmetic, and is not corrected here because the brief
  says not to change the Impressum (see Risks).
- "Register data already used in the Impressum" means: seat `Tempelsweg 1, 47918 Tönisvorst`,
  `Handelsregister des Amtsgerichts Krefeld HRA 7431`, represented by
  `MachineMaster Verwaltungsgesellschaft mbH` (same address, `HRB 20461`), represented in turn by the
  Geschäftsführer `Christian Wenzel und Veit Ulbricht`. The AGB's old clause named
  `Jutta Schröer-Ulbricht und Veit Ulbricht` as Geschäftsführer; those are Heinrich Moerschen GmbH's
  officers and go away with the entity.
- The AGB exists in German only and is served under both locales (`/terms-of-use` and
  `/en/terms-of-use` render the same markdown), so a single edit fixes both routes. No English
  translation of the AGB is created in this task.
- "A screenshot of the AGB header after the change in the PR" means a screenshot of the rendered
  `/terms-of-use` page showing the page heading and the corrected `§ 1 (1)` sentence, taken from a
  local `npm run preview` of the generated build (there is no deploy preview for this repo).
- No automated test suite exists in this repo (`package.json` has `build`/`dev`/`generate`/`preview`
  only); the mechanical proof is `npm run generate` plus greps over the generated HTML.
- `node_modules` is absent in a fresh worktree, so a one-off `npm install` (~28s, per the task brief)
  runs before `npm run generate`.

Correct me at gate 1, otherwise I proceed with these.

## Context found

- `content/legal/terms-of-use.md`: the AGB body, German, frontmatter `title: Allgemeine
  Geschäftsbedingungen`. Line 9 (`§ 1 Geltungsbereich (1)`) is the single wrong sentence:
  "… zwischen uns, der Heinrich Moerschen GmbH Tempelsweg 1 47918 Tönisvorst, Geschäftsführer: Jutta
  Schröer-Ulbricht und Veit Ulbricht, und Sie als unsere Kunden."
- `content/legal/impressum.md`: the correct entity, address, representation chain and both register
  entries (HRA 7431 / HRB 20461). Source of the replacement data. Not changed.
- `content/legal/data-privacy.md`: already names "MachineMaster GmbH & Co. KG" (heading) /
  "MachineMaster GmbH & Co.KG" (line 13) as the responsible party. Not changed.
- `app/composables/useContent.ts`: loads `content/legal/*.md` eagerly via `import.meta.glob`, parses
  the frontmatter, renders the body with `markdown-it` (`html: false`) and exposes it through
  `useLegalPage(slug)`. Confirms that the markdown file is the only source of the page text and that
  `content/extraction/**` is never read.
- `app/pages/terms-of-use.vue`: renders `page?.title` as the `<h1>` and `page?.html` into a
  `prose` container. Contains no entity name of its own — no template change is needed.
- `app/components/AppFooter.vue`: navigation and i18n strings only, no entity name.
- `app/components/BrandCarousel.vue` line 9: `{ name: 'Moerschen', file: 'moerschen.png' }` — a
  partner logo on the home page, out of scope.
- `content/extraction/legal/terms-of-use.md`: verbatim capture of the old live AGB; line 13 carries
  the same wrong sentence and line 95 carries a "Note" flagging the discrepancy to the client.
- `nuxt.config.ts`: static site, `nitro.prerender.crawlLinks: true`, i18n `de` default with
  `prefix_except_default`, so `/terms-of-use` (de) and `/en/terms-of-use` (en) are both prerendered
  from the same markdown.

## Approach

This is a content fix, not a code change: the page text comes straight from the markdown file, so
rewriting one sentence in `content/legal/terms-of-use.md` fixes both prerendered routes and needs no
change to any component, composable, route or i18n key. That keeps the change inside the existing
pattern (legal pages are markdown under `content/legal/`, rendered by `useLegalPage`).

The replacement sentence mirrors the Impressum's representation chain so that a reader comparing the
two pages sees the same entity described the same way:

> (1) Diese Allgemeinen Verkaufsbedingungen (im Folgenden: AGB) gelten für alle über unseren
> Online-Shop bzw. alle über die Plattform MachineMaster.de vermittelten oder geschlossenen Verträge
> zwischen uns, der **MachineMaster GmbH & Co. KG, Tempelsweg 1, 47918 Tönisvorst, eingetragen im
> Handelsregister des Amtsgerichts Krefeld HRA 7431, vertreten durch die MachineMaster
> Verwaltungsgesellschaft mbH, Tempelsweg 1, 47918 Tönisvorst, eingetragen im Handelsregister des
> Amtsgerichts Krefeld HRB 20461, diese vertreten durch die Geschäftsführer Christian Wenzel und Veit
> Ulbricht**, und Sie als unsere Kunden. Die AGB gelten unabhängig davon, ob Sie Verbraucher,
> Unternehmer oder Kaufmann sind.

The rest of the AGB uses "wir/uns" throughout and never repeats the entity name, so no other
paragraph needs to change.

Rejected: (a) introducing a shared "legal entity" i18n key or a markdown include and referencing it
from the AGB, the Impressum and the Datenschutz — cleaner in theory, but it touches three legal pages
and the content pipeline for a one-sentence fix, and legal pages are safer as literal text; (b)
rewriting the verbatim body of `content/extraction/legal/terms-of-use.md` — that file documents what
the old live site said, and editing it would destroy the record while fixing nothing a visitor sees;
(c) also normalising `GmbH & Co.KG` → `GmbH & Co. KG` in the Impressum and Datenschutz — explicitly
excluded by the brief ("do not change the Impressum"), noted under Risks instead.

## Files to change

| File | Change | Why |
|---|---|---|
| `content/legal/terms-of-use.md` | Rewrite the contracting-party clause in `§ 1 Geltungsbereich (1)` (line 9): replace "der Heinrich Moerschen GmbH Tempelsweg 1 47918 Tönisvorst, Geschäftsführer: Jutta Schröer-Ulbricht und Veit Ulbricht" with the MachineMaster entity, address, both register entries and the representation chain as quoted under Approach. No other paragraph is touched. | The only rendered occurrence of the wrong contracting entity. |
| `content/extraction/legal/terms-of-use.md` | Append one sentence to the existing closing "Note" (line 95), recording that the discrepancy was raised with the client and fixed in the live content on 2026-09-23 by this task. Leave the verbatim § 1 (1) text on line 13 unchanged. | Keeps the archive honest about what the old site said while stopping the open flag from being re-raised; the file is not rendered, so no visitor sees it. |

## Acceptance criteria

1. `content/legal/terms-of-use.md` contains no occurrence of "Heinrich Moerschen" (case-insensitive).
2. `content/legal/terms-of-use.md` § 1 (1) names `MachineMaster GmbH & Co. KG` as the party the
   customer contracts with.
3. That clause states the address `Tempelsweg 1, 47918 Tönisvorst`, the register entry
   `Amtsgericht Krefeld HRA 7431`, the representative `MachineMaster Verwaltungsgesellschaft mbH`
   with `HRB 20461`, and the Geschäftsführer `Christian Wenzel und Veit Ulbricht`.
4. The names `Jutta Schröer-Ulbricht` and `Heinrich Moerschen` appear nowhere in
   `content/legal/terms-of-use.md`.
5. No file under `app/`, `content/legal/`, `i18n/` or `public/` contains the string
   "Heinrich Moerschen" (case-insensitive) after the change.
6. `content/legal/impressum.md` and `content/legal/data-privacy.md` are byte-for-byte unchanged
   against `dev`.
7. `content/extraction/legal/terms-of-use.md` still contains the verbatim old sentence on line 13,
   and its closing Note additionally records that the issue was resolved on 2026-09-23.
8. `npm run generate` completes successfully and prerenders the same 97 routes as on `dev`.
9. No generated HTML file under `.output/public/` contains "Heinrich Moerschen" (case-insensitive).
10. `.output/public/terms-of-use/index.html` and `.output/public/en/terms-of-use/index.html` both
    contain "MachineMaster GmbH &amp; Co. KG" (or the un-escaped equivalent as emitted by
    `markdown-it`).
11. `.output/public/impressum/index.html` is unchanged in content against a build of `dev`.
12. Sections `§ 2` through `§ 12` of the AGB are unchanged against `dev` (only the § 1 (1) paragraph
    differs in the diff of `content/legal/terms-of-use.md`).
13. No file outside the two files listed under "Files to change" and this spec file is modified by
    the task branch.
14. The PR description contains a screenshot of the rendered `/terms-of-use` page showing the
    "Allgemeine Geschäftsbedingungen" heading and the corrected § 1 (1) sentence.

## Test plan

No automated tests exist in this repository (`package.json` exposes `build`, `dev`, `generate`,
`preview` only, and the task brief states there are no automated tests for the static landing page).
The mechanical proof is therefore the build plus greps:

1. `npm install` once in the worktree (no `node_modules` in a fresh worktree; ~28s).
2. `npm run generate` — must exit 0 and report 97 prerendered routes.
3. Grep the source: no "Heinrich Moerschen" under `app/`, `content/legal/`, `i18n/`, `public/`
   (criteria 1, 4, 5).
4. Grep the build output: no "Heinrich Moerschen" anywhere under `.output/public/`; the two
   terms-of-use HTML files contain the MachineMaster entity (criteria 9, 10).
5. `git diff dev --stat` — exactly the two content files plus this spec (criteria 6, 12, 13).
6. `npm run preview` and open `/terms-of-use`, `/en/terms-of-use` and `/impressum` locally for the
   human checks in "What to click" and for the PR screenshot.

The Tester reports each of these explicitly, including the ones that are greps rather than tests.

## What to click

1. `/terms-of-use` on the local preview: § 1 (1) reads as one grammatical German sentence naming
   MachineMaster GmbH & Co. KG — no leftover comma, duplicated address or dangling
   "Geschäftsführer:" from the old wording.
2. `/terms-of-use` and `/impressum` side by side: both name the same company, the same address and
   the same two Geschäftsführer.
3. `/en/terms-of-use`: shows the same corrected German AGB text (the AGB has no English translation),
   and the page still renders inside the normal layout with header and footer.
4. The AGB page's formatting is intact: the `§ 1` heading, the numbered paragraphs and the `prose`
   styling look exactly as before apart from the changed sentence.
5. The footer links Datenschutz / AGB / Impressum all still resolve from the AGB page.

## Verification and evidence

- Criteria 1–7, 12, 13: `git diff dev -- content/` pasted (or summarised) in the close-out, showing
  only the § 1 (1) paragraph and the one appended Note sentence.
- Criterion 5: the output of a case-insensitive search for `Heinrich Moerschen` over `app/`,
  `content/legal/`, `i18n/`, `public/` — expected: no matches. PowerShell:
  `Get-ChildItem -Recurse app,content\legal,i18n,public | Select-String -Pattern 'Heinrich Moerschen' -SimpleMatch`
- Criterion 8: the tail of `npm run generate`, showing exit 0 and the prerendered-route count (97).
- Criteria 9, 10: searches over `.output/public/` — no match for `Heinrich Moerschen`, and a match
  for `MachineMaster GmbH &amp; Co. KG` in both `terms-of-use/index.html` and
  `en/terms-of-use/index.html`. Quote the matching line for the German route.
- Criterion 11: `/impressum` opened on the preview and confirmed unchanged (its markdown source is
  untouched per criterion 6).
- Criterion 14: the screenshot of `/terms-of-use` from `npm run preview`, attached to the PR, showing
  the heading and the corrected § 1 (1).
- The close-out must state explicitly that there is no automated test suite in this repo and that
  build + greps + local preview are the evidence.

## Will not do

- No change to `content/legal/impressum.md` or `content/legal/data-privacy.md`.
- No change to the verbatim body of `content/extraction/legal/terms-of-use.md` (only its closing
  Note), and no change to any other file under `content/extraction/`.
- No change to `app/components/BrandCarousel.vue` or the `moerschen.png` partner logo.
- No change to any `.vue` file, composable, route, i18n key or `nuxt.config.ts`.
- No rewording of AGB sections `§ 2` through `§ 12`, including the Gerichtsstand clause in § 12 (2).
- No dependency added, removed or upgraded; no `package-lock.json` change beyond what a plain
  `npm install` of the existing lockfile produces (the lockfile must not be committed as modified).
- No commit, checkout, rebase, merge or push involving `dev`, `staging` or `main`; no push from any
  role other than the normal task-branch push.
- No work in any other MachineMaster repository, even though the same AGB text may exist elsewhere.
- No English translation of the AGB created.

## Stop conditions

- `npm run generate` fails, or the prerendered-route count differs from 97 — stop and report; a
  markdown-only change must not affect the build.
- A second rendered occurrence of "Heinrich Moerschen" turns up that this spec did not list — stop
  and report it instead of silently extending the fix.
- The Impressum turns out to state different register numbers or officers than quoted here (the AGB
  clause must mirror the Impressum, and the Impressum is the source of truth) — stop and ask.
- Anyone concludes that the Gerichtsstand in § 12 (2) or the `GmbH & Co.KG` spelling must change as
  part of this task — stop; both are separate decisions (see Risks).
- `git status` shows changes to files outside the two listed — stop and ask before committing.

## Risks and open questions

- The AGB is a legal document. This task changes only *which entity* is named; it does not review
  whether the rest of the text (written for Heinrich Moerschen GmbH's own online shop) is correct for
  MachineMaster GmbH & Co. KG as a SaaS marketplace — e.g. § 4 delivery terms, § 7 retention of
  title, § 8 warranty on delivered goods all read like a goods shop. Recommend a legal review as a
  separate task; not blocking this fix, which strictly improves the current state.
- § 12 (2) names "der Sitz des Verkäufers, Krefeld" as the exclusive place of jurisdiction, while the
  seat per the Impressum is Tönisvorst (Krefeld is only the registry court). That sentence does not
  name the wrong entity, so it is out of scope here, but it is probably wrong and should be decided
  by Christian / legal.
- The entity is spelled `MachineMaster GmbH & Co. KG` in the new AGB clause and in
  `data-privacy.md` line 5, but `MachineMaster GmbH & Co.KG` (no space) in `impressum.md` line 5 and
  `data-privacy.md` line 13. The criterion "AGB and Impressum name the same entity" is met in
  substance, not character-for-character. Recommend a follow-up task to normalise the spelling across
  all three legal pages; it is excluded here because the brief forbids touching the Impressum.
- Criterion 14 (screenshot in the PR) cannot be checked mechanically and is not a preview click
  either — it is verified by the Reviewer looking at the PR description.
- Criterion 11 ("`/impressum` unchanged") is verified indirectly, via criterion 6 on the source file
  plus a look at the preview, rather than by diffing two full builds.
- Hosting for `retailer.machinemaster.de` is still unconfirmed (a `netlify.toml` exists but the site
  is not on Netlify). Irrelevant to this change — it ships through the normal `dev → main` PR — but
  it means there is no deploy preview and the screenshot must come from a local preview.

## Out of scope

- The Impressum and the Datenschutzerklärung (already correct; explicitly excluded by the brief).
- Legal review or rewriting of AGB sections § 2–§ 12, including the Gerichtsstand.
- Normalising the `GmbH & Co.KG` / `GmbH & Co. KG` spelling across the legal pages.
- The `Moerschen` partner logo in the home-page brand carousel.
- The verbatim body of the `content/extraction/` archive.
- The same AGB text wherever else it may live (customer-frontend, global-platform-frontend, Strapi,
  the retailer tool) — a separate task per repo if it applies there.
- An English translation of the AGB.
- Any refactor that would extract the legal entity into a shared i18n key or markdown partial.
