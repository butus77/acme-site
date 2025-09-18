import type {MetadataRoute} from 'next';
import {getBaseUrl} from '@/lib/site';

const locales = ['hu','sr','de','en'] as const;
const routes = ['', '/about', '/contact'] as const;


export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  return routes.flatMap((route) =>
    locales.map((l) => ({
      url: `${base}/${l}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8
    }))
  );
}
