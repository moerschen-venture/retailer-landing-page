# Sitewide Footer & Navigation

Captured from multiple pages (homepage, contact, module pages) — content is identical across all pages.

## Top navigation

- Startseite → `/de`
- Module (dropdown, button only — no direct link):
  - Katalog & Neue Maschinen → `/de/module/catalogue`
  - Gebrauchte Maschinen → `/de/module/used-machines`
  - Konfigurator → `/de/module/configurator`
  - Einzelhandelsbörse → `/de/module/retailer-exchange`
- Artikel → `/de/articles`
- FAQ → `/de/#faq`
- Preisgestaltung → `/de/#pricing`
- "Gehe zu" (go to main site) → `https://machinemaster.de`
- "Einzelhändler" (retailer login) → `https://app.machinemaster.de/retailer/login`
- Kontakt → `/de/contact`

## Footer columns

**Seiten:**
- Startseite → `/de` (footer link markup points to `#` on some pages — should point to `/de`)
- Artikel → `/de/articles`
- Datenschutzbestimmungen → `/de/data-privacy`
- Allgemeine Geschäftsbedingungen → `/de/terms-of-use`
- Impressum → `/de/impressum`

**Module (footer heading literally reads "Module:"):**
- Neue Maschinen/Katalog → `/de/module/catalogue`
- Gebrauchte Maschinen → `/de/module/used-machines`
- Konfigurator → `/de/module/configurator`
- Bestandsmaschinen-Plattform → `/de/module/retailer-exchange`

**Social:**
- Instagram → `https://www.instagram.com/machinemaster.de`

**Tagline (under logo, footer):** Digitale Vertriebslösung für den Maschinenhandel

**Copyright:** Urheberrechte © Machine Master, 2025 Alle Rechte vorbehalten

## Cookie consent banner

**Body text:** Wenn Sie auf „Akzeptieren" klicken, stimmen Sie der Speicherung von Cookies auf Ihrem Gerät zu, um die Navigation auf der Website zu verbessern, die Nutzung der Website zu analysieren und unsere Marketingaktivitäten zu unterstützen. Weitere Informationen finden Sie in unserer Datenschutzrichtlinie.

**Buttons:** Verweigern / Annehmen

**Preferences panel (if opened):**
- Heading area: Datenschutz-Präferenzen
- Categories: Wesentliche Cookies - Erforderlich / Marketing-Cookies / Personalisierungs-Cookies / Analyse-Cookies
- Buttons: Alle Cookies ablehnen / Alle Cookies zulassen / Einstellungen speichern

## Language switcher (Weglot)

The site is served in English by default at the bare domain (`https://retailer.machinemaster.de/...`); the German copy — which is the actual source/primary content per the project brief — lives under a `/de/` path prefix (e.g. `https://retailer.machinemaster.de/de/`, `/de/articles`, `/de/module/catalogue`, etc.). A sidebar widget reads "Ausgewählte Sprache: Deutsch" with a combobox labeled "Sprachumschalter: Deutsch". Flag this for whoever wires up i18n routing — the live site's language-prefix convention may or may not be what we want to mirror in the Nuxt i18n config.
