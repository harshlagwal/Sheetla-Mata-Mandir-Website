# Security Architecture & Rules

This document outlines the security posture, architecture, and deployment procedures for the Sheetla Mata Mandir Lagdevi frontend application.

## 1. Security Architecture
The application is a frontend-only static website built using React, TypeScript, and Vite.
- **No Backend:** There is no traditional backend or database.
- **No Direct Payments:** The application does not collect payment credentials or process transactions.
- **State Management:** Uses only short-lived React state. `localStorage` is exclusively used for non-sensitive UI preferences (language).

## 2. Frontend Trust Model
- **Zero Trust for Client Environment:** The frontend cannot cryptographically verify UPI payments.
- **Self-Declared Acknowledgements:** The donation receipt system generates "Self-Declared Acknowledgements" marked clearly as "Awaiting Committee Verification."
- **Immutable Configuration:** The recipient UPI ID, Payee Name, and Committee WhatsApp number are centrally configured and cannot be manipulated via URL parameters, form fields, or DOM manipulation.

## 3. Donation Limitations
- **No Card Processing:** The application intentionally lacks any capability to handle Cards, Netbanking, or Wallets.
- **Strict Input Validation:** Custom donation amounts are strictly limited to `> 0` and `<= 100,000`, validated against valid decimal formats to prevent NaN, Infinity, or string abuse.

## 4. Data Privacy
The application **NEVER** collects or stores:
- Passwords, OTPs, or PINs.
- Credit/Debit card numbers or CVV.
- Bank Account Numbers.
- Private donor credentials.

## 5. Secret-Management Rules
- **No Private Secrets in Frontend:** The application must never contain private API keys, database URLs, or access tokens in the source code or `.env` files.
- **EmailJS Configuration:** The EmailJS Public Key is intentionally public and safe for browser usage. The private keys remain in the EmailJS dashboard.

## 6. UPI Configuration Rules
- The `DONATION_CONFIG` in `src/config/donation.ts` is the single source of truth for payment destinations.
- The `generateUpiUri` utility uses `URLSearchParams` to safely encode parameters and prevent injection attacks on the payment URI.

## 7. Dependency-Update Procedure
- Run `npm audit` regularly.
- Update dependencies using `npm update` or targeted `npm install <package>@<version>`.
- **WARNING:** Do not run `npm audit fix --force` unless prepared to handle breaking major-version upgrades (e.g., `react-router` v6 to v7).

## 8. Incident-Response Basics
Since this is a static frontend, incident response primarily involves:
1. **Defacement / XSS:** Rollback the repository to a known safe commit, invalidate CDN caches, and redeploy.
2. **Incorrect UPI Configuration:** Update `src/config/donation.ts`, build, and redeploy immediately.
3. **Contact Form Abuse:** Add domain restrictions or CAPTCHA via the EmailJS dashboard.

## 9. How to Report a Vulnerability
Please contact the temple committee securely to report any vulnerabilities. Do not disclose vulnerabilities publicly until they have been resolved.

---

## PRODUCTION SECURITY CHECKLIST

- [x] Production build successful
- [x] No private secrets in frontend
- [x] Git secret scan reviewed
- [ ] HTTPS enabled (Deployment Phase)
- [ ] Security headers configured (Deployment Phase)
- [ ] CSP configured and tested (Deployment Phase)
- [ ] Cloudflare / equivalent protection considered (Deployment Phase)
- [ ] EmailJS domain restrictions configured (Admin Dashboard)
- [x] Dependency audit reviewed
- [ ] Test donation account removed/reviewed (Deployment Phase)
- [ ] Official authorized temple UPI verified (Deployment Phase)
- [ ] Committee WhatsApp verified (Deployment Phase)
- [x] Contact form tested
- [x] UPI QR tested
- [x] WhatsApp proof tested
- [x] PDF acknowledgement tested
- [x] Mobile tested
- [ ] Backup/recovery plan documented

---

### Prepared Production Headers (To be configured in Cloudflare / Vercel / Nginx)

**Content-Security-Policy (CSP)**
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://maps.gstatic.com https://maps.googleapis.com; connect-src 'self' https://api.emailjs.com; frame-src https://www.google.com/maps/; frame-ancestors 'none';
```
*(Note: Remove 'unsafe-inline' if CSS and minimal inline scripts can be fully extracted during deployment).*

**Other Headers**
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
