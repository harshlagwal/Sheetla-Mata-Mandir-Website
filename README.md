<div align="center">
  <h1 align="center">Sheetla Mata Mandir Website</h1>
  <p align="center">
    <strong>A premium, modern digital experience for Sheetla Mata Mandir, Lagdevi, Himachal Pradesh.</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-blue.svg?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-5-646CFF.svg?style=for-the-badge&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-3-06B6D4.svg?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Open_Source-Yes-success.svg?style=for-the-badge" alt="Open Source" />
    <img src="https://img.shields.io/github/license/harshlagwal/Sheetla-Mata-Mandir-Website?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/github/stars/harshlagwal/Sheetla-Mata-Mandir-Website?style=for-the-badge" alt="GitHub Stars" />
    <img src="https://img.shields.io/github/last-commit/harshlagwal/Sheetla-Mata-Mandir-Website?style=for-the-badge" alt="Last Commit" />
  </p>
</div>

<br />

## 🌟 Project Overview

This repository hosts the official digital platform for **Sheetla Mata Mandir**, located in the serene Himalayan village of Lagdevi, District Hamirpur, Himachal Pradesh. The project is designed as an enterprise-grade, luxury-class web application that seamlessly blends tradition with modern web aesthetics. It provides devotees and visitors with comprehensive information, a premium visual experience, and a highly secure donation workflow.

## ✨ Features

- **Responsive Design:** Pixel-perfect across all screen sizes (from 320px to 1920px+).
- **Bilingual Support (English/Hindi):** Seamless, context-aware language switching without layout shifts.
- **Temple History & Visitor Guide:** Detailed information on the sanctuary's heritage and visiting protocols.
- **Village Section & Drone Cinematic Experience:** High-performance, lazy-loaded background videos utilizing `IntersectionObserver` to save bandwidth.
- **Festival Information & Gallery:** Rich, immersive photo and event galleries.
- **Temple Timings & Nearby Facilities:** Essential planning resources for devotees.
- **Donation System:** A state-of-the-art, secure React flow for processing contributions.
- **Professional Donation Receipt:** Automated PDF and UI receipts generated on the client side.
- **WhatsApp Verification Flow & UPI Ready Architecture:** Direct integration with deep-links and UPI URIs for native mobile payments.
- **Contact Form:** Protected via EmailJS for secure inquiries.
- **Accessibility:** Full support for `prefers-reduced-motion` and semantic `aria-labels`.
- **Performance Optimizations:** Aggressive code splitting, optimized asset loading, and skeleton states.
- **Security Enhancements:** Strict client-side validations and no stored personal data or sensitive API keys.

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Mailing/Forms:** EmailJS
- **Core Web:** HTML5, CSS3, Modern JavaScript

## 📂 Folder Structure

```text
📦 src
 ┣ 📂 assets         # Optimized imagery, cinematic videos, and SVGs
 ┣ 📂 components     # Reusable, highly abstracted React UI components
 ┃ ┣ 📂 common       # Shared UI (Buttons, Modals, Section Headings)
 ┃ ┣ 📂 donation     # Secure donation flow components (Amount, Purpose, Proof, Receipt)
 ┃ ┣ 📂 festivals    # Event and celebration cards
 ┃ ┣ 📂 layout       # Core layouts (Navbar, Footer, Loader)
 ┃ ┗ 📂 village      # Cinematic village and drone components
 ┣ 📂 config         # Global configurations (Donation limits, Test modes)
 ┣ 📂 context        # React Context (Language/Theming)
 ┣ 📂 data           # Static data dictionaries (Events, Temple, Announcements)
 ┣ 📂 hooks          # Custom React hooks
 ┣ 📂 pages          # Route-level page components (Home, Village, Donate, etc.)
 ┣ 📂 utils          # Utility functions (Calculators, Validators, Generators)
 ┣ 📜 App.tsx        # Main application router and shell
 ┣ 📜 index.css      # Tailwind core and custom utility classes
 ┗ 📜 main.tsx       # Entry point
```

## 📸 Screenshots

*(Placeholders for future screenshots. Ensure paths point to `/public` or external CDN)*

| Home Page | Gallery | Donation Flow |
| :---: | :---: | :---: |
| ![Home](https://via.placeholder.com/400x250.png?text=Home+Page) | ![Gallery](https://via.placeholder.com/400x250.png?text=Gallery) | ![Donation](https://via.placeholder.com/400x250.png?text=Donation+Flow) |

## 🚀 Installation

Ensure you have Node.js (v18 or higher) installed.

```bash
# Clone the repository
git clone https://github.com/harshlagwal/Sheetla-Mata-Mandir-Website.git

# Navigate into the project directory
cd Sheetla-Mata-Mandir-Website

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🏗️ Production Build

To test the application for production deployment:

```bash
# Build the project (includes TypeScript type checking)
npm run build

# Preview the built assets locally
npm run preview
```

## ⚙️ Configuration

- **EmailJS Setup:** Ensure your EmailJS service ID, template ID, and public key are securely injected at runtime if utilizing the contact forms.
- **Donation Configuration:** Review `/src/config/donation.ts` to adjust UPI IDs, maximum limits, and test modes.
- **Translation Files:** All localized strings are maintained centrally in the application state to ensure type safety.

## ⚡ Performance

- **Lazy Loading:** All heavy assets, especially videos and large images, are lazy-loaded.
- **Optimized Images:** High-resolution WebP formats are used aggressively to reduce footprint.
- **Video Optimizations:** The drone cinematic videos use `preload="metadata"` and pause automatically when off-screen.
- **Responsive:** Fluid typography and layout systems adapt instantly to viewport changes.

## 🛡️ Security

- **No Sensitive Data Stored:** The repository has been fully audited to ensure zero leakage of API keys, `.env` files, or personal information.
- **Client-Side Validation:** All forms enforce strict validation rules before any network request.
- **Safe UPI URI Generation:** Secure string serialization for dynamic payment links.
- **WhatsApp Verification Workflow:** Relies on robust deep linking without exposing internal contact routing logic.
- **Protected Contact Form:** Enforces rate-limiting and validation patterns against spam.

## 🌍 Deployment

This repository is optimized for edge-network deployments and is fully compatible with:
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

Simply set the build command to `npm run build` and the output directory to `dist`.

## 🗺️ Roadmap

Future enhancements planned for the platform:
- [ ] Online verified donation backend
- [ ] Volunteer Portal for festival organizing
- [ ] Live Festival Broadcast integration
- [ ] Dedicated Temple Admin Dashboard

## 🤝 Contributing

We welcome contributions to improve the digital footprint of the temple!
Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 👨‍💻 Developer

Created and maintained by:

**Harsh Lagwal**  
- [GitHub](https://github.com/harshlagwal)
- [LinkedIn](#) *(Update with your actual LinkedIn profile)*
