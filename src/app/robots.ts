import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/', '/join/', '/login', '/sample/*'],
    },
    sitemap: 'https://www.tteokguk.site/sitemap.xml',
  }
}
