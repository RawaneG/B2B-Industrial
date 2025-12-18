# B2B Solutions - Plateforme Industrielle

![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.0.0-FF0055?logo=framer)

Plateforme B2B moderne pour la fourniture d'équipements de protection individuelle (EPI) et de solutions électriques industrielles au Sénégal et en Afrique de l'Ouest.

## 🌐 Fonctionnalités

- **Internationalisation (i18n)** : Support complet Français 🇫🇷 / Anglais 🇬🇧 (Français par défaut)
- **Design Premium** : Interface moderne avec animations Framer Motion et particules WebGL
- **Catalogue Produits** : EPI et équipements électriques avec pages détaillées
- **Blog** : Articles et conseils pour les professionnels
- **Responsive** : Optimisé pour mobile, tablette et desktop

## 🚀 Installation

```bash
# Cloner le projet
git clone <repository-url>
cd b2b_next

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
npm start
```

## 📁 Structure du Projet

```
b2b_next/
├── components/          # Composants React réutilisables
│   ├── Navbar.js        # Navigation avec sélecteur de langue
│   ├── PremiumHero.js   # Hero section avec animations
│   ├── Section.js       # Wrapper de section animé
│   ├── ProductCard.js   # Carte produit avec effets hover
│   ├── FeatureCard.js   # Carte fonctionnalité
│   └── WebGLParticles.js # Arrière-plan particules 3D
├── lib/
│   └── i18n/            # Système d'internationalisation
│       ├── translations.js   # Dictionnaire FR/EN
│       ├── LanguageContext.js # Context React
│       └── index.js
├── pages/               # Routes Next.js
│   ├── index.js         # Accueil
│   ├── about.js         # À propos
│   ├── services.js      # Services
│   ├── contact.js       # Contact
│   ├── blog.js          # Liste articles
│   ├── projects.js      # Projets & études de cas
│   ├── careers.js       # Carrières
│   ├── legal.js         # Mentions légales
│   ├── products/
│   │   ├── index.js     # Catalogue produits
│   │   └── [slug].js    # Détail produit
│   └── blog/
│       └── [slug].js    # Détail article
├── styles/
│   └── globals.css      # Styles globaux & variables CSS
├── tailwind.config.js   # Configuration Tailwind
└── next.config.js       # Configuration Next.js
```

## 🎨 Palette de Couleurs

| Couleur   | Hex       | Usage                        |
| --------- | --------- | ---------------------------- |
| Primary   | `#d92c3a` | Boutons, accents, liens      |
| Secondary | `#1f2937` | Texte, arrière-plans sombres |
| Accent    | `#f7a80d` | Highlights, badges           |
| Neutral   | `#f5f5f5` | Arrière-plans clairs         |

## 🔤 Typographie

- **Titres** : Plus Jakarta Sans (700, 800)
- **Corps** : Inter (400, 500, 600)

## 🌍 Internationalisation

Le système i18n utilise React Context pour gérer les traductions :

```jsx
import { useLanguage } from "@/lib/i18n";

function MyComponent() {
  const { t, locale, switchLanguage } = useLanguage();

  return (
    <div>
      <h1>{t("hero.title1")}</h1>
      <button onClick={() => switchLanguage("en")}>English</button>
    </div>
  );
}
```

## 📦 Dépendances Principales

- **Next.js 16** : Framework React avec SSR
- **React 19** : Bibliothèque UI
- **TailwindCSS 3.4** : Framework CSS utility-first
- **Framer Motion 12** : Animations React
- **Three.js** : Graphiques 3D WebGL
- **@react-three/fiber** : React renderer pour Three.js

## 📄 Licence

© 2024 B2B Solutions. Tous droits réservés.

---

Développé avec ❤️ au Sénégal 🇸🇳
