/**
 * Blog Articles Data
 * Centralized blog content data
 */

export const BLOG_ARTICLES = {
  'choosing-right-ppe': {
    id: 'choosing-right-ppe',
    translationKeys: {
      title: 'blog.posts.choosingPpe.title',
      excerpt: 'blog.posts.choosingPpe.excerpt',
      content: 'blog.posts.choosingPpe.content',
    },
    category: 'EPI',
    categoryKey: 'categories.epi',
    date: '2024-12-15',
    readTime: 5,
    gradient: 'from-red-500 to-orange-500',
    featured: true,
    author: {
      name: 'B2B Solutions',
      avatar: null,
    },
  },
  'electrical-safety-best-practices': {
    id: 'electrical-safety-best-practices',
    translationKeys: {
      title: 'blog.posts.electricalSafety.title',
      excerpt: 'blog.posts.electricalSafety.excerpt',
      content: 'blog.posts.electricalSafety.content',
    },
    category: 'Électrique',
    categoryKey: 'categories.electrical',
    date: '2024-12-10',
    readTime: 7,
    gradient: 'from-blue-500 to-cyan-500',
    featured: true,
    author: {
      name: 'B2B Solutions',
      avatar: null,
    },
  },
  'optimising-supply-chains': {
    id: 'optimising-supply-chains',
    translationKeys: {
      title: 'blog.posts.supplyChains.title',
      excerpt: 'blog.posts.supplyChains.excerpt',
      content: 'blog.posts.supplyChains.content',
    },
    category: 'Logistique',
    categoryKey: 'common.logistics',
    date: '2024-12-05',
    readTime: 6,
    gradient: 'from-green-500 to-emerald-500',
    featured: false,
    author: {
      name: 'B2B Solutions',
      avatar: null,
    },
  },
};

// Helper functions
export function getArticleBySlug(slug) {
  return BLOG_ARTICLES[slug] || null;
}

export function getFeaturedArticles() {
  return Object.values(BLOG_ARTICLES).filter(article => article.featured);
}

export function getAllArticles() {
  return Object.values(BLOG_ARTICLES).sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
}

export function getArticleSlugs() {
  return Object.keys(BLOG_ARTICLES);
}

export function formatDate(dateString, locale = 'fr') {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
