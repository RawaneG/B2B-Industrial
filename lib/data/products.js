/**
 * Products Data
 * Centralized product catalog data
 */

export const PRODUCTS = {
  // EPI Products
  'safety-shoes': {
    id: 'safety-shoes',
    category: 'epi',
    translationKeys: {
      name: 'products.safetyShoes.name',
      description: 'products.safetyShoes.description',
      detailName: 'productDetails.safetyShoes.name',
      detailDescription: 'productDetails.safetyShoes.description',
      specs: 'productDetails.safetyShoes.specs',
    },
    gradient: 'from-red-500 to-orange-500',
    featured: true,
  },
  'hi-vis-jacket': {
    id: 'hi-vis-jacket',
    category: 'epi',
    translationKeys: {
      name: 'products.hiVisJacket.name',
      description: 'products.hiVisJacket.description',
      detailName: 'productDetails.hiVisJacket.name',
      detailDescription: 'productDetails.hiVisJacket.description',
      specs: 'productDetails.hiVisJacket.specs',
    },
    gradient: 'from-orange-500 to-yellow-500',
    featured: true,
  },
  'protective-gloves': {
    id: 'protective-gloves',
    category: 'epi',
    translationKeys: {
      name: 'products.gloves.name',
      description: 'products.gloves.description',
      detailName: 'productDetails.protectiveGloves.name',
      detailDescription: 'productDetails.protectiveGloves.description',
      specs: 'productDetails.protectiveGloves.specs',
    },
    gradient: 'from-red-600 to-red-400',
    featured: true,
  },
  // Electrical Products
  'circuit-breaker': {
    id: 'circuit-breaker',
    category: 'electrical',
    translationKeys: {
      name: 'products.circuitBreaker.name',
      description: 'products.circuitBreaker.description',
      detailName: 'productDetails.circuitBreaker.name',
      detailDescription: 'productDetails.circuitBreaker.description',
      specs: 'productDetails.circuitBreaker.specs',
    },
    gradient: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  'switchgear': {
    id: 'switchgear',
    category: 'electrical',
    translationKeys: {
      name: 'products.switchgear.name',
      description: 'products.switchgear.description',
      detailName: 'productDetails.switchgear.name',
      detailDescription: 'productDetails.switchgear.description',
      specs: 'productDetails.switchgear.specs',
    },
    gradient: 'from-cyan-500 to-teal-500',
    featured: true,
  },
  'cabling-accessories': {
    id: 'cabling-accessories',
    category: 'electrical',
    translationKeys: {
      name: 'products.cabling.name',
      description: 'products.cabling.description',
      detailName: 'productDetails.cablingAccessories.name',
      detailDescription: 'productDetails.cablingAccessories.description',
      specs: 'productDetails.cablingAccessories.specs',
    },
    gradient: 'from-blue-600 to-blue-400',
    featured: true,
  },
};

// Helper functions
export function getProductBySlug(slug) {
  // Handle alias slugs
  const aliasMap = {
    'gloves': 'protective-gloves',
    'cabling': 'cabling-accessories',
  };
  
  const normalizedSlug = aliasMap[slug] || slug;
  return PRODUCTS[normalizedSlug] || null;
}

export function getProductsByCategory(category) {
  return Object.values(PRODUCTS).filter(product => product.category === category);
}

export function getFeaturedProducts() {
  return Object.values(PRODUCTS).filter(product => product.featured);
}

export function getAllProducts() {
  return Object.values(PRODUCTS);
}

export function getProductSlugs() {
  return Object.keys(PRODUCTS);
}
