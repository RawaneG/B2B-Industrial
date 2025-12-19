# NOVITECH.sn - UNE NOUVELLE VISION DE LA TECHNOLOGIE

![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.0.0-FF0055?logo=framer)

Plateforme NOVITECH.sn moderne pour la fourniture d'équipements de protection individuelle (EPI) et de solutions électriques industrielles au Sénégal et en Afrique de l'Ouest.

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
├── components/              # Composants React réutilisables
│   ├── layout/              # Composants de mise en page
│   │   ├── Layout.js        # Layout principal avec Head, Navbar, Footer
│   │   ├── Footer.js        # Pied de page
│   │   └── index.js
│   ├── ui/                  # Composants UI de base (Design System)
│   │   ├── Button.js        # Bouton avec variantes
│   │   ├── Input.js         # Champ de saisie
│   │   ├── Card.js          # Carte avec variantes
│   │   ├── Badge.js         # Badge/Tag
│   │   ├── Icons.js         # Bibliothèque d'icônes SVG
│   │   └── index.js
│   ├── Navbar.js            # Navigation avec sélecteur de langue
│   ├── PremiumHero.js       # Hero section avec animations
│   ├── Section.js           # Wrapper de section animé
│   ├── ProductCard.js       # Carte produit avec effets hover
│   ├── FeatureCard.js       # Carte fonctionnalité
│   └── WebGLParticles.js    # Arrière-plan particules 3D
├── lib/                     # Logique métier et utilitaires
│   ├── constants/           # Constantes globales
│   │   └── index.js         # Config site, navigation, couleurs, animations
│   ├── data/                # Données centralisées
│   │   ├── products.js      # Catalogue produits
│   │   ├── blog.js          # Articles de blog
│   │   └── index.js
│   ├── hooks/               # Hooks personnalisés
│   │   ├── useViewport.js   # Détection taille écran
│   │   ├── useScrollPosition.js # Position de scroll
│   │   ├── useForm.js       # Gestion formulaires
│   │   └── index.js
│   ├── i18n/                # Système d'internationalisation
│   │   ├── translations.js  # Dictionnaire FR/EN
│   │   ├── LanguageContext.js # Context React avec persistence
│   │   └── index.js
│   └── index.js             # Export centralisé
├── pages/                   # Routes Next.js
│   ├── _app.js              # App wrapper
│   ├── index.js             # Accueil
│   ├── about.js             # À propos
│   ├── services.js          # Services
│   ├── contact.js           # Contact
│   ├── blog.js              # Liste articles
│   ├── projects.js          # Projets & études de cas
│   ├── careers.js           # Carrières
│   ├── legal.js             # Mentions légales
│   ├── products/
│   │   ├── index.js         # Catalogue produits
│   │   └── [slug].js        # Détail produit
│   └── blog/
│       └── [slug].js        # Détail article
├── styles/
│   └── globals.css          # Styles globaux & variables CSS
├── .eslintrc.json           # Configuration ESLint
├── jsconfig.json            # Alias de chemins (@/*)
├── tailwind.config.js       # Configuration Tailwind
├── next.config.js           # Configuration Next.js
└── package.json
```

## 🏗️ Architecture & Bonnes Pratiques

### Principes appliqués

- **Separation of Concerns** : Logique (lib), UI (components), Pages (pages)
- **DRY** : Composants UI réutilisables, constantes centralisées
- **Single Responsibility** : Un composant = une responsabilité
- **Composition over Inheritance** : Composants composables

### Composants UI (Design System)

```jsx
import { Button, Input, Card, Badge } from '@/components/ui';

// Boutons avec variantes
<Button variant="primary" size="lg">Action</Button>
<Button variant="outline" isLoading>Chargement</Button>

// Cartes
<Card variant="gradient" padding="lg">Contenu</Card>
```

### Hooks personnalisés

```jsx
import { useViewport, useScrollPosition, useForm } from "@/lib/hooks";

// Détection responsive
const { isMobile, isDesktop, breakpoint } = useViewport();

// Position de scroll
const { scrollY, direction, isScrolled } = useScrollPosition(50);

// Gestion formulaire
const { values, errors, handleChange, handleSubmit } = useForm(
  initialValues,
  onSubmit,
  validate
);
```

### Données centralisées

```jsx
import { getProductBySlug, getAllArticles } from "@/lib/data";

const product = getProductBySlug("safety-shoes");
const articles = getAllArticles();
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

© 2024 NOVITECH.sn. Tous droits réservés.

---

Développé avec ❤️ au Sénégal 🇸🇳
