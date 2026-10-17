<div align="center">
  <p align="center">
    <strong>॥ ॐ श्री शीतलायै नमः ॥</strong>
  </p>
  <h1 align="center">श्री शीतला माता पावन धाम • लगदेवी</h1>
  <p align="center">
    <strong>Official Web Portal & Digital Sanctuary for Shree Sheetla Mata Mandir</strong><br />
    <em>Village Lagdevi, Tehsil Bamsan (Tauni Devi), District Hamirpur, Himachal Pradesh • 177022</em>
  </p>
  <p align="center">
    <a href="https://github.com/harshlagwal/Sheetla-Mata-Mandir-Website"><img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
    <a href="https://github.com/harshlagwal/Sheetla-Mata-Mandir-Website"><img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5" /></a>
    <a href="https://github.com/harshlagwal/Sheetla-Mata-Mandir-Website"><img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://github.com/harshlagwal/Sheetla-Mata-Mandir-Website"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://github.com/harshlagwal/Sheetla-Mata-Mandir-Website"><img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
    <a href="https://github.com/harshlagwal/Sheetla-Mata-Mandir-Website/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge" alt="MIT License" /></a>
  </p>
</div>

<br />

---

## 🌟 Overview

The **Sheetla Mata Mandir Official Web Portal** is an ultra-modern, high-performance digital sanctuary crafted for **Shree Sheetla Mata Mandir**, located in the pine-covered Himalayan foothills of Village Lagdevi (Hamirpur, HP).

Designed with a blend of **sacred Himachal traditions** and modern **Google Antigravity / Apple Liquid Glass aesthetics**, the application provides devotees across India and the global diaspora with instant access to:
- Daily Aarti timings and sacred Darshan hours
- High-definition Darshan Gallery featuring the 5 consecrated deities
- Cultural heritage, folklore, and travel guide for Village Lagdevi
- Live temple announcements and upcoming festival dates (Navratri, Bhavya Jagran, Historic Mela)
- 100% transparent Seva & Daan direct bank transfers to the official Temple Managing Committee
- Devotee legal and privacy protections via dedicated Privacy Policy and Terms of Service

---

## ✨ Key Architectural Highlights

### 🕊️ 1. Sacred Cinematic Experience
- **Hardware-Accelerated 60FPS Parallax:** The hero showcase features a native high-definition portrait of Kuldevi Mata Sheetla with smooth scroll parallax and live operational badges.
- **Divine Ambience:** Authentic lotus emblems, warm golden ambient backdrops, and flame-flicker animations.

### 📱 2. Mobile-First & Responsive UX
- **Frosted Glass Floating Navigation (`BottomNavBar`):** Responsive bottom navigation bar with spring physics, bilingual active labels, and backdrop blur.
- **Collision-Free Controls:** Floating `ScrollToTop` button safely floats above the navigation bar on small devices without covering icons or footer content.
- **Generous Footer Clearance:** Ample bottom spacing ensuring legal links (*Privacy Policy* and *Terms of Service*) and developer credits remain fully visible and touch-accessible.
- **Interactive Card Stacks (`card-25`):** Cards default to an elegant fanned preview on touch devices, with fluid mouse hover expansions on desktop viewports.

### 🌐 3. Full Bilingual Localization
- Instant, zero-layout-shift language switching between **Hindi (हिंदी)** and **English**.
- Fully localized typography leveraging Google Sans (`font-google`), Plus Jakarta Sans, and authentic Devanagari font families.

### 🛕 4. Consecrated Shrines Darshan Gallery
Interactive modal slideshow documenting the five sacred Murtis:
1. **Kuldevi Mata Sheetla** (Presiding Deity of Health & Auspicious Grace)
2. **Bhagwan Shiv Shankar** (Panchavaktra Mahadev)
3. **Sankat Mochan Hanuman Ji** (Siddhi & Raksha)
4. **Maryada Purushottam Shree Ram Darbar** (Dharma & Maryada)
5. **Gugga Jaharpeer Ji** (Ancient Regional Protector)

### 🤝 5. Transparent Devotee Seva (Donations)
- **Direct Official Trust Account:** All donations credit directly to the **MANAGING COMMITTEE SITTA TAMPLE** account at UCO Bank, Tauni Devi Branch.
- **Zero Intermediaries:** Official UPI ID (`sittatample8577@ucobank`) with one-touch copy and QR deep-linking.
- **Purpose Selection:** Langar Seva, Gau Seva, Navratri Puja, or Temple Renovation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18.3](https://react.dev/) + [TypeScript 5.5](https://www.typescriptlang.org/) |
| **Bundler & Build Tool** | [Vite 5.4](https://vitejs.dev/) with optimized code-splitting chunks |
| **Styling & Design System** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Glassmorphism tokens (`index.css`) |
| **Animations & Motion** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) with animated page transitions |
| **Typography** | Google Sans, Plus Jakarta Sans, Rozha One, Devanagari Fonts |

---

## 📂 Project Directory Structure

```text
Sheetla-Mata-Mandir-Website/
├── public/                 # Static assets, PWA icons, manifest, favicons
├── src/
│   ├── assets/             # High-definition WebP & PNG temple assets
│   ├── components/
│   │   ├── about/          # Temple history stone & architecture components
│   │   ├── common/         # Button, DarshanModal, GallerySection, ScrollToTop, Loader
│   │   ├── donation/       # Transparent payment panel, amount selectors, security notices
│   │   ├── festivals/      # Jagran performers, festive event schedules
│   │   ├── home/           # Cinematic HeroSlideshow
│   │   ├── layout/         # Header Navbar, Footer, Mobile Navigation
│   │   ├── ui/             # BottomNavBar, AnimatedHikeCard (card-25)
│   │   └── village/        # Village landscape cards and cultural showcases
│   ├── config/             # Temple configurations & donation constants
│   ├── context/            # LanguageContext (Hindi / English state)
│   ├── data/               # Announcements, temple timings, darshan deities data
│   ├── pages/              # Home, About, Gallery, Festivals, Village, Visit, Donate, Contact, PrivacyPolicy, TermsOfService
│   ├── translations/       # hi.ts and en.ts translation dictionaries
│   ├── App.tsx             # Root application shell & routing
│   ├── index.css           # Design tokens, liquid buttons, typography rules
│   └── main.tsx            # React application entry point
├── index.html              # HTML5 entry with SEO tags & preloaded fonts
├── tailwind.config.js      # Custom colors (vermilion, amber, gold, slate) & typography
├── tsconfig.json           # Strict TypeScript configuration
└── vite.config.ts          # Vite build config with manual chunking
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `v18.0.0` or higher
- **npm** `v9.0.0` or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/harshlagwal/Sheetla-Mata-Mandir-Website.git

# 2. Navigate to directory
cd Sheetla-Mata-Mandir-Website

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🏗️ Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server with hot module replacement (HMR) |
| `npm run build` | Runs TypeScript typecheck (`tsc`) and builds production bundle to `dist/` |
| `npm run preview` | Locally preview the built production bundle |
| `npm run lint` | Run ESLint / code quality checks |

---

## 🛡️ Security & Privacy Compliance

- **No Third-Party Intermediaries:** Payments are processed directly through devotee banking applications via standardized UPI protocols.
- **Zero Personal Data Storage:** No tracking cookies, telemetry databases, or unauthorized user data collection.
- **Client-Side Form Validation:** Anti-spam input sanitation on contact forms.
- **Legal Compliance:** Comprehensive [Privacy Policy](file:///src/pages/PrivacyPolicy.tsx) and [Terms of Service](file:///src/pages/TermsOfService.tsx).

---

## 🌍 Deployment

The application is structured for instant zero-config static edge deployment:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Supported Platforms:** Vercel, Netlify, Cloudflare Pages, GitHub Pages

---

## 📜 License

This project is open-source and released under the **[MIT License](LICENSE)**.

---

## 🙏 Dedication & Acknowledgements

<div align="center">
  <p>
    <strong>सप्रेम समर्पित:</strong> पावन ग्राम लगदेवी एवं कुलदेवी श्री शीतला माता मंदिर प्रबंधकारिणी समिति।<br />
    <em>Conceived, Designed & Developed with Devotion by <strong>Harsh Lagwal</strong>.</em>
  </p>
  <p>
    ॥ जय माता दी • जय माँ शीतला ॥
  </p>
</div>
