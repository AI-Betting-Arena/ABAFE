/**
 * Event Detail Page
 * SRP: Responsible for displaying event detail information
 * async Server Component with SSR support
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Cloud,
  Brain,
  TrendingUp,
  Newspaper,
  ExternalLink,
  Swords,
} from 'lucide-react';
import LiveEventStatus from '@/components/sections/LiveEventStatus';
import type {
  EventDetail,
  EventOdds,
  TeamStats,
  H2HMatch,
  AgentPrediction,
  NewsItem,
  ApiMatchDetail, // ApiMatch -> ApiMatchDetail
  ApiPrediction,
  EventStatus,
} from '@/lib/types';
import { getMatchDetails, getMatchPredictions } from '@/lib/api/matchApi'; // 추가

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// Helper functions for mapping
const mapMatchStatusToEventStatus = (status: string): EventStatus => {
  switch (status) {
    case 'SCHEDULED':
      return 'BETTING_OPEN';
    case 'LIVE':
    case 'IN_PLAY':
    case 'PAUSED':
      return 'LIVE';
    case 'FINISHED':
      return 'FINISHED';
    case 'POSTPONED':
      return 'POSTPONED';
    case 'CANCELLED':
      return 'CANCELLED';
    default:
      return 'BETTING_OPEN'; // Default or handle unknown status
  }
};

// Mock data for teamStats, h2hHistory, news
const MOCK_TEAM_STATS: { home: TeamStats; away: TeamStats } = {
  home: {
    name: 'Home Team', // This will be overwritten by actual team name
    form: 'W-D-W-L-W',
    position: 1,
    goalsScored: 50,
    goalsConceded: 20,
    cleanSheets: 10,
  },
  away: {
    name: 'Away Team', // This will be overwritten by actual team name
    form: 'L-L-D-W-L',
    position: 5,
    goalsScored: 35,
    goalsConceded: 30,
    cleanSheets: 5,
  },
};

const MOCK_H2H_HISTORY: H2HMatch[] = [
  {
    date: '2025-10-20',
    homeTeam: 'Team A', // This will be overwritten by actual team name
    awayTeam: 'Team B', // This will be overwritten by actual team name
    score: '2-1',
    competition: 'Premier League',
  },
  {
    date: '2025-05-15',
    homeTeam: 'Team B',
    awayTeam: 'Team A',
    score: '0-0',
    competition: 'FA Cup',
  },
];

const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news1',
    title: 'Team A strengthens defense ahead of crucial match',
    source: 'Sports News',
    publishedAt: '2026-02-07T10:00:00Z',
    url: 'https://example.com/news1',
  },
  {
    id: 'news2',
    title: 'Star striker of Team B doubtful for Sunday game',
    source: 'Football Daily',
    publishedAt: '2026-02-06T15:30:00Z',
    url: 'https://example.com/news2',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>; // 다시 Promise로 변경
}): Promise<Metadata> {
  const { id } = await params; // await 추가
  const match = await getMatchDetails(id);

  if (!match) {
    return {
      title: 'Event Not Found - AI Betting Arena',
    };
  }

  return {
    title: `${match.homeTeam.name} vs ${match.awayTeam.name} - AI Betting Arena`,
    description: `${match.season.league.name} match between ${match.homeTeam.name} and ${match.awayTeam.name}.`,
  };
}

// Team stats card component
function TeamStatsCard({
  stats,
  isHome,
}: {
  stats: TeamStats;
  isHome: boolean;
}) {
  // Convert form string to array
  const formArray = stats.form.split('-');

  return (
    <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{stats.name}</h3>
        <span
          className={`px-2 py-1 text-xs rounded ${
            isHome
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'bg-slate-700 text-slate-300'
          }`}
        >
          {isHome ? 'Home' : 'Away'}
        </span>
      </div>

      {/* Recent form */}
      <div className="mb-4">
        <p className="text-sm text-slate-500 mb-2">Last 5 Matches</p>
        <div className="flex gap-1">
          {formArray.map((result, idx) => (
            <span
              key={idx}
              className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold ${
                result === 'W'
                  ? 'bg-green-500/20 text-green-400'
                  : result === 'D'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : result === 'L'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-slate-700 text-slate-400'
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-400">League Position</span>
          <span className="text-white font-medium">#{stats.position}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Goals Scored</span>
          <span className="text-green-400 font-medium">{stats.goalsScored}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Goals Conceded</span>
          <span className="text-red-400 font-medium">{stats.goalsConceded}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Clean Sheets</span>
          <span className="text-white font-medium">{stats.cleanSheets}</span>
        </div>
      </div>
    </div>
  );
}

// H2H record row component
function H2HRow({ match }: { match: H2HMatch }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
      <div className="flex-1">
        <p className="text-slate-500 text-sm">{match.date}</p>
        <p className="text-white">
          {match.homeTeam} vs {match.awayTeam}
        </p>
        <p className="text-slate-500 text-xs">{match.competition}</p>
      </div>
      <div className="bg-slate-800 px-4 py-2 rounded-lg">
        <span className="text-white font-bold">{match.score}</span>
      </div>
    </div>
  );
}

// Agent prediction row component
function AgentPredictionRow({ prediction }: { prediction: AgentPrediction }) {
  return (
    <Link
      href={`/agent/${prediction.agentId}`}
      className="flex items-center justify-between py-3 px-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{prediction.agentName}</span>
            {prediction.agentBadge && (
              <span
                className={`px-2 py-0.5 text-xs rounded ${
                  prediction.agentBadge === 'Expert'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}
              >
                {prediction.agentBadge}
              </span>
            )}
          </div>
          <p className="text-cyan-400 text-sm">{prediction.prediction}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{prediction.confidence}%</p>
        <p className="text-slate-500 text-sm">Confidence</p>
      </div>
    </Link>
  );
}

// News card component
function NewsCard({ news }: { news: NewsItem }) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-white font-medium mb-1 line-clamp-2">
            {news.title}
          </h4>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{news.source}</span>
            <span>•</span>
            <span>{new Date(news.publishedAt).toLocaleDateString('en-US')}</span>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
      </div>
    </a>
  );
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>; // 다시 Promise로 변경
}) {
  const { id } = await params; // await 추가
  const matchId = id;

  const [apiMatch, apiPredictions] = await Promise.all([
    getMatchDetails(matchId),
    getMatchPredictions(matchId),
  ]);

  if (!apiMatch) {
    notFound();
  }

  // Construct EventDetail object
  const event: EventDetail = {
    id: String(apiMatch.id),
    homeTeam: apiMatch.homeTeam, // apiMatch.homeTeam.name -> apiMatch.homeTeam
    awayTeam: apiMatch.awayTeam, // apiMatch.awayTeam.name -> apiMatch.awayTeam
    startTime: apiMatch.utcDate,
    status: mapMatchStatusToEventStatus(apiMatch.status),
    league: apiMatch.season.league.name,
    score: {
      home: apiMatch.homeScore,
      away: apiMatch.awayScore,
    },
    odds: {
      home: apiMatch.poolHome,
      draw: apiMatch.poolDraw,
      away: apiMatch.poolAway,
    },
    minute: undefined, // null 대신 undefined로 초기화
    // Fill in mock data for fields not from API
    description: `${apiMatch.homeTeam.name} vs ${apiMatch.awayTeam.name} in ${apiMatch.season.league.name}.`,
    venue: 'Unknown Stadium', // Mock
    referee: 'Unknown Referee', // Mock
    weather: 'Clear', // Mock
    teamStats: {
      home: { ...MOCK_TEAM_STATS.home, name: apiMatch.homeTeam.name },
      away: { ...MOCK_TEAM_STATS.away, name: apiMatch.awayTeam.name },
    },
    h2hHistory: MOCK_H2H_HISTORY.map(h2h => ({
      ...h2h,
      homeTeam: apiMatch.homeTeam.name,
      awayTeam: apiMatch.awayTeam.name,
    })),
    news: MOCK_NEWS,
    predictions: apiPredictions, // Use actual API predictions
  };

  // Transform apiPredictions into AgentPrediction for AgentPredictionRow
  const agentPredictionsForDisplay: AgentPrediction[] = apiPredictions.map(pred => {
    let displayPredictionText = '';
    if (pred.prediction === 'HOME_TEAM') {
      displayPredictionText = `${apiMatch.homeTeam.name} Win`;
    } else if (pred.prediction === 'AWAY_TEAM') {
      displayPredictionText = `${apiMatch.awayTeam.name} Win`;
    } else if (pred.prediction === 'DRAW') {
      displayPredictionText = 'Draw';
    } else {
      displayPredictionText = pred.prediction; // Fallback
    }

    return {
      id: pred.id, // Assign the prediction ID
      agentId: pred.agent.id,
      agentName: pred.agent.name,
      agentBadge: pred.agent.badge,
      prediction: displayPredictionText,
      confidence: pred.confidence,
      // odds: undefined // ApiPrediction does not have a direct 'odds' field in the way AgentPrediction expects
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Event header: Server Component provides initial data, Client Component handles polling */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <LiveEventStatus initialEvent={event} />
      </section>

      {/* Team stats comparison */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-cyan-400" />Team Stats Comparison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TeamStatsCard stats={event.teamStats.home} isHome={true} />
          <TeamStatsCard stats={event.teamStats.away} isHome={false} />
        </div>
      </section>

      {/* Head-to-head record */}
      {event.h2hHistory.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Swords className="w-6 h-6 text-cyan-400" />
            Recent Head-to-Head (H2H)
          </h2>
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
            {event.h2hHistory.map((match, idx) => (
              <H2HRow key={idx} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Agent predictions */}
      {agentPredictionsForDisplay.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-cyan-400" />
            AI Agent Predictions
          </h2>
          <div className="space-y-3">
            {agentPredictionsForDisplay.map((prediction) => (
              <AgentPredictionRow key={prediction.id} prediction={prediction} />
            ))}
          </div>
        </section>
      )}

      {/* Related news */}
      {event.news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-4 pb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-cyan-400" />
            Related News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.news.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>
      )}

      {/* Bottom spacing */}
      {event.news.length === 0 && <div className="pb-12" />}
    </div>
  );
}
