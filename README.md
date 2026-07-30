# artemiyepstein.com

Bilingual static website for Artemiy Epstein with two service directions:

- Operations & Project Management
- AI-Powered Websites & Business Software

## Site structure

| Route                                        | Purpose                                    |
| -------------------------------------------- | ------------------------------------------ |
| `/` and `/ru/`                               | Service hub and personal positioning       |
| `/operations/` and `/ru/operations/`         | Operations and project management services |
| `/ai-development/` and `/ru/ai-development/` | Website and business software services     |
| `/privacy-policy/` and `/ru/privacy-policy/` | Privacy information                        |

Shared styles and interactions are in `assets/styles.css` and `assets/site.js`.

## Automatic EUR/RUB conversion

The Russian AI development page shows each indicative budget in euros and
roubles. The conversion is calculated from the rate stored on the pricing
section in `ru/ai-development/index.html`.

`.github/workflows/update-eur-rub-rate.yml` refreshes the EUR/RUB rate once per
day through ExchangeRate-API and commits the updated rate and date to `main`.
Visitors do not make requests to the exchange-rate provider from their browser.

## Editing content

The website has no build step. Edit the relevant `index.html` file directly.

- Names, headings, paragraphs, service descriptions, and pricing are plain HTML.
- Shared colors, spacing, typography, cards, mobile rules, and form styles are in `assets/styles.css`.
- Keep the English and Russian pages aligned when changing services or navigation.
- The exact Russian name spelling is **Артемий Эпштайн**.

## Contact form

All forms submit to Formspree:

`https://formspree.io/f/mbdnwkyr`

The JavaScript in `assets/site.js` sends forms asynchronously, prevents accidental duplicate submissions, and shows localized success or error messages.

When changing the form:

1. Keep the `action`, `method="post"`, and `data-contact-form` attributes.
2. Keep the required privacy acknowledgement checkbox unchecked by default.
3. Keep the honeypot field named `_gotcha`.
4. Update the Privacy Policy if new personal data, analytics, cookies, or service providers are introduced.

## Publishing

The repository is published with GitHub Pages from the `main` branch.

1. Commit the changed files.
2. Push the commit to `main`.
3. GitHub Pages will update `https://artemiyepstein.com/`.
4. Keep `CNAME`, `.nojekyll`, `robots.txt`, and `sitemap.xml` in the repository root.

## Domain

The custom domain is defined in `CNAME`:

`artemiyepstein.com`

DNS records are managed outside this repository. Do not change them for ordinary content or design updates.

## Information to add later

- Public links to additional completed website or software cases.
- Verified results for digital product projects, if available.
- Final package prices for website and software services, if standardized.
- Legal registration details if the owner decides to publish them.
- Analytics and cookie information only if analytics is intentionally added.
