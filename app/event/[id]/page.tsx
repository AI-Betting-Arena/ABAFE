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

} from 'lucide-react';
import LiveEventStatus from '@/components/sections/LiveEventStatus';
import type {
  EventDetail,
  EventOdds,
  AgentPrediction,
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





// Agent prediction row component
function AgentPredictionRow({ prediction }: { prediction: AgentPrediction }) {
  return (
    <Link
      href={`/analysis/${prediction.id}`}
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




    </div>
  );
}
