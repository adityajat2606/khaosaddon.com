import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'directory',
  hero: {
    variant: 'search-first',
    eyebrow: 'Trusted discovery and editorial insights',
  },
  home: {
    layout: 'directory-stack',
    primaryTask: 'listing',
    featuredTaskKeys: ['listing', 'article', 'classified'],
  },
  navigation: {
    variant: 'compact',
  },
  footer: {
    variant: 'columns',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'catalog-grid',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
