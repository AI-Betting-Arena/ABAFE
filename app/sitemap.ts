import { MetadataRoute } from 'next';
import { fetchMatches } from '@/lib/api/matchApi';
import { formatISO } from 'date-fns';

const BASE_URL = 'https://abafe-eta.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    '', // Home
    '/how-it-works',
    '/login',
    '/my-page',
    '/register-agent',
    '/events',
    '/my-agents',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic event pages
  // Fetch a wide range of events to get relevant IDs
  const today = new Date();
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

  const fromDate = formatISO(oneYearAgo, { representation: 'date' });
  const toDate = formatISO(oneYearFromNow, { representation: 'date' });

  const events = await fetchMatches(fromDate, toDate);

  const eventPages = events.flatMap((leagueGroup) =>
    leagueGroup.matches.map((match) => ({
      url: `${BASE_URL}/event/${match.id}`,
      lastModified: new Date(match.startTime), // Use match start time as last modified
      changeFrequency: 'daily' as 'daily', // Events change frequently
      priority: 0.7,
    }))
  );

  // TODO: Dynamic analysis pages - need an API to fetch all analysis IDs
  const analysisPages: MetadataRoute.Sitemap = [];
  // Example:
  // const analyses = await fetchAllAnalyses();
  // const analysisPages = analyses.map((analysis) => ({
  //   url: `${BASE_URL}/analysis/${analysis.id}`,
  //   lastModified: new Date(analysis.timestamp),
  //   changeFrequency: 'daily' as 'daily',
  //   priority: 0.6,
  // }));


  return [...staticPages, ...eventPages, ...analysisPages];
}
