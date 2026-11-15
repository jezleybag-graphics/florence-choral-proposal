# Florence Choral Platform — Official Engineering & Architecture Documentation

> **Client:** Dr. Leonardo Sagliocca — Founder & Artistic Director, Florence Choral  
> **Prepared By:** Jezreel Dave Leybag — Systems & Web Architecture Partner  
> **Date:** November 2026  
> **Transparency Guarantee:** Every file, design token, data structure, and administrative workflow is documented below so Dr. Leonardo Sagliocca maintains 100% ownership and visibility over both the **Visual Dashboard** and the **Source Code**.

---

## 1. Executive Summary & Forensic Findings

During our initial technical audit of `https://www.florencechoral.com`, we discovered why the original website stopped functioning:
1. **Domain Expiration & Static Scrape Hijack:** The original WordPress 6.4.7 installation (using the legacy *Enigma Premium* theme) is no longer running on `florencechoral.com`. Instead, a third party uploaded a 4-page demo export from "Wayback Machine Downloader" onto an Apache server.
2. **Broken Navigation (`403 Forbidden`):** All primary navigation routes (`/festivals/`, `/artistic-committee/`, `/venues/`, `/archives/`) return `403 Forbidden` or redirect loops, and `/wp-login.php` no longer exists.
3. **The Solution:** We have engineered a modern, self-contained, high-speed web application and CMS Dashboard that:
   - Preserves **100% of Florence Choral's authentic identity** (`#DC143C` Florentine Crimson, `#136597` Renaissance Azure, `#3B3B3B` Charcoal, original photography, and official *Comune di Firenze* & *Regione Toscana* patronage crests).
   - Restores every broken page (`Festivals`, `Artistic Committee`, `Composers`, `Venues`, `Testimonials`, `Archives`, and `Contacts`).
   - Provides Dr. Sagliocca with **two levels of complete control**:
     1. **Visual Admin Dashboard (`/admin`):** Edit festival dates, status, programmes, jury members, and review incoming Choir Applications without touching code.
     2. **Full Source Code & Data Ownership:** A clean, modular codebase where every content file (`src/data/florenceData.ts`), styling token (`src/index.css`), and component (`src/components/`) is human-readable, exportable as JSON at any time, and hosted in a Git repository under Dr. Sagliocca's full access.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | **React 19 + TypeScript + Vite** | Ultra-fast, zero-broken-link single-page & multi-view web application. |
| **Design System** | **Tailwind CSS v4 + CSS Custom Properties** | Centralizes brand colors (`#DC143C`, `#136597`, `#3B3B3B`) and typography (`Plus Jakarta Sans` + `Inter`). |
| **UI Icon System** | **Mage Icons (`@iconify/react` + `@iconify-json/mage`)** | Clean, modern vector icons from the open-source [Mage Icons](https://github.com/Mage-Icons/mage-icons) library. |
| **Social Brand Icons** | **Official Brand Vectors (`@iconify-json/simple-icons` & `@iconify-json/logos`)** | Official logos for Facebook, Instagram, YouTube, X (Twitter), and WhatsApp. |
| **Database & Persistence** | **Supabase PostgreSQL + LocalStorage Sync** | Instant real-time state persistence in the browser for live demos, with seamless cloud sync via Supabase. |

---

## 3. Repository & Code File Structure (For Dr. Leo's Code Access)

```text
florence-choral/
├── index.html                        # Root HTML entry point + Google Fonts (Plus Jakarta Sans & Inter)
├── package.json                      # Dependencies & build scripts (npm run dev / npm run build)
├── vite.config.ts                    # Vite bundler & Tailwind CSS v4 plugin configuration
├── PROJECT_DOCUMENTATION.md          # Complete technical & client handoff documentation
└── src/
    ├── index.css                     # Design Tokens (--color-primary: #DC143C, etc.) & modal dialog rules
    ├── main.tsx                      # React application mount point
    ├── App.tsx                       # Main application router, navigation state & live CMS store
    ├── types/
    │   └── festival.ts               # TypeScript interfaces for Festivals, Jury, Venues, Choir Leads
    ├── data/
    │   └── florenceData.ts           # All original Florence Choral content, images, festivals & venues
    └── components/
        ├── Header.tsx                # Crimson top contact bar, official social icons & sticky navigation
        ├── HeroCarousel.tsx          # 6-slide interactive hero carousel with original photography
        ├── FestivalsSection.tsx      # The 5 Renaissance Master Festivals + detail modal/drawer
        ├── DifferenceSection.tsx     # "Our Difference" (Special Features, custom SVG Workshops & Juries)
        ├── ImpactStatsSection.tsx    # Animated 4-pillar global impact counter bar (Events, Choirs, Nations, Participants)
        ├── VenuesAndCommittee.tsx    # Historic Florentine basilicas, Artistic Committee & Composers
        ├── ApplicationModal.tsx      # Native <dialog> Choir Application & Brochure Request form
        ├── AdminDashboard.tsx        # Dr. Leo's Visual CMS + "Code & Repository Vault" (kept separate from public navbar)
        └── Footer.tsx                # Official Comune di Firenze & Regione Toscana Patronage footer
```

---

## 4. Original Assets Recovered & Preserved

1. **Florence Choral Official Emblem (Local & Vercel Favicon):** `public/Florence_choral_quadrato.jpg` (`/Florence_choral_quadrato.jpg`)
2. **Hero Slide 1 (*Where Opera was born*):** `https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_8925-1280x400.jpg`
3. **Hero Slide 2 (*From Beijing to sing here*):** `https://www.florencechoral.com/wp-content/uploads/2016/08/foto4_1580x500-1280x400.jpg`
4. **Hero Slide 3 (*Singing in a dream*):** `https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_6647-e1506018371643.jpg`
5. **Hero Slide 4 (*The light of Renaissance*):** `https://www.florencechoral.com/wp-content/uploads/2016/08/SIB_6255-1280x400.jpg`
6. **Hero Slide 5 (*Surrounded by art*):** `https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_5161-e1506018442480.jpg`
7. **Hero Slide 6 (*The Hymn of the Andrea's Festival — Vytautas Miškinis*):** `https://www.florencechoral.com/wp-content/uploads/2017/01/Diverse-voci-Miskinis-2.jpg`
8. **Patronage Crest — Comune di Firenze:** `https://www.florencechoral.com/wp-content/uploads/2017/02/logo_Firenze.jpg`
9. **Official Patronage Decree PDF:** `https://www.florencechoral.com/wp-content/uploads/2017/06/Patrocinio-Town-Council-Florence-Choral.pdf`
10. **Patronage Crest — Regione Toscana:** `https://www.florencechoral.com/wp-content/uploads/2017/03/stemma-Regione-Toscana-e1490712109123.jpg`
