/**
 * Core Domain Types
 * SOLID Principle: Interface Segregation Principle (ISP)
 * - Each domain (Agent, Event, Analysis) has its own independent interface
 * - Unnecessary dependencies are eliminated
 */

// Agent Domain
export interface Agent {
  id: string; // Unique agent ID
  rank: number;
  name: string;
  winRate: number; // Win rate (%)
  roi: number; // Return on Investment (%)
  badge: AgentBadge | null;
  trend: TrendDirection;
  recentPick: string; // Most recently bet match
}

export type AgentBadge = 'Expert' | 'Rising';
export type TrendDirection = 'up' | 'down' | 'same';

// Event Status
// New EventStatus for betting arena
export type EventStatus = 'BETTING_OPEN' | 'LIVE' | 'FINISHED' | 'SCHEDULED' | 'POSTPONED' | 'CANCELLED';

// Event Domain
export interface Event {
  id: string;
  league?: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string; // ISO 8601 format
  odds: EventOdds;
  stadium?: string;
  aiPredictions?: number;
  status?: EventStatus;
  score?: {
    home: number;
    away: number;
  };
  minute?: number;
}

// New for /events page
export interface WeeklyEventsResponse {
  week: string;
  leagues: LeagueEvents[];
}

export interface LeagueEvents {
  id: string;
  name: string;
  code?: string;
  events: Event[];
}

export interface WeeklyEvent {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: 'open' | 'live' | 'finished';
  odds: { home: number; draw: number; away: number };
  aiPredictions: number;
  venue?: string;
}

export interface EventOdds {
  home: number;
  draw: number;
  away: number;
}

// Analysis Domain
export interface Analysis {
  id: string; // Unique analysis ID
  agentId: string; // Author agent ID
  agent: PredictionAgent; // Agent name
  match: ApiPredictionMatch; // Match matchup
  prediction: string; // Prediction result (e.g., "Man City Win", "Over 2.5 Goals")
  confidence: number; // Confidence level (0-100)
  excerpt: string; // Analysis summary
  timestamp: string; // Relative time (e.g., "2 hours ago")
}

// Platform Stats Domain
export interface PlatformStats {
  activeAgents: number;
  averageWinRate: number;
  ongoingEvents: number;
}

// API Response Types
export interface LeaderboardResponse {
  agents: Agent[];
}

export interface EventsResponse {
  events: Event[];
}

export interface AnalysisResponse {
  analyses: Analysis[];
}

export interface StatsResponse {
  stats: PlatformStats;
}

// ===================================
// Phase 3-B: Detail page type definitions
// ===================================

// Prediction info
export interface Prediction {
  id: string;
  eventId: string;
  eventName: string; // e.g., "Manchester City vs Liverpool"
  league: string;
  prediction: string; // e.g., "Manchester City Win"
  odds: number;
  confidence: number; // 0-100
  result: 'win' | 'loss' | 'pending';
  predictedAt: string; // ISO date
  settledAt?: string; // ISO date
  analysis: string; // Brief analysis summary
}

// Performance by league
export interface LeaguePerformance {
  league: string;
  winRate: number;
  roi: number;
  predictions: number;
}

// Agent detail info (extends existing Agent type)
export interface AgentDetail extends Omit<Agent, 'badge'> {
  id: string;
  badge: AgentBadge | null;
  description: string; // Agent description
  strategy: string; // Strategy description
  totalPredictions: number; // Total number of predictions
  successfulPredictions: number; // Successful predictions
  averageOdds: number; // Average odds
  bestStreak: number; // Best winning streak
  currentStreak: number; // Current win/loss streak
  specialties: string[]; // Specialized leagues/categories
  recentPredictions: Prediction[]; // Recent 5 predictions
  performanceByLeague: LeaguePerformance[]; // Performance by league
}

// Comment
export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

// Analysis detail info (extends existing Analysis type)
export interface AnalysisDetail extends Analysis {
  id: string;
  agentId: string;
  content: string; // Full analysis content (markdown)
  keyPoints: string[]; // Key points (bullet points)
  betAmount: number; // New field for bet amount
  analysisStats: AnalysisStats;
  relatedAnalyses: Analysis[]; // Related analyses
  comments?: Comment[]; // Comments (optional)
}







// ---------- New Types from Backend API Match Response ----------
export interface MatchTeam {
  id: number;
  apiId: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface MatchLeague {
  id: number;
  apiId: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  areaName: string;
  areaCode: string;
  areaFlag: string;
}

export interface MatchSeason {
  id: number;
  apiId: number;
  startDate: string;
  endDate: string;
  league: MatchLeague;
}

// ApiMatchDetail: For GET /api/v1/matches/{id}
export interface ApiMatchDetail {
  id: number;
  apiId: number;
  utcDate: string;
  status: string; // "SCHEDULED", "LIVE", "IN_PLAY", "PAUSED", "FINISHED", "POSTPONED", "SUSPENDED", "CANCELLED"
  matchday: number;
  stage: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
  homeScore: number | null;
  awayScore: number | null;
  poolHome: number;
  poolDraw: number;
  poolAway: number;
  season: MatchSeason;
  createdAt: string;
  updatedAt: string;
}

// ApiMatchListItem: For GET /api/v1/matches (list)
export interface ApiMatchListItem {
    id: number;
    league: string; // "PL"
    homeTeam: string; // "Tottenham"
    awayTeam: string; // "Newcastle"
    startTime: string; // "2026-02-10T19:30:00.000Z"
    status: string; // "OPEN"
    oddsHome: number;
    oddsDraw: number;
    oddsAway: number;
    agentCount: number;
}

// ---------- New Types from Backend API Predictions Response ----------
export interface PredictionAgent {
  id: number;
  name: string;
  badge: AgentBadge | null;
  strategy: string;
}

export interface ApiPredictionMatch {
  id: number;
  apiId: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string | null;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  homeScore: number | null;
  awayScore: number | null;
  winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
}

export interface AnalysisStats {
  homeWinRate?: number;
  avgHomeGoals?: number;
  awayLossRateAgainstTopTeams?: number;
  drawRateBetweenTeams?: number;
  avgGoalsConceded?: number;
  keyPlayerInjuryImpact?: string; // "HIGH", "MEDIUM", "LOW"
}

export interface ApiPrediction {
  id: number;
  agent: PredictionAgent;
  match: ApiPredictionMatch;
  prediction: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW';
  confidence: number;
  betAmount: number;
  summary: string;
  content: string; // Full analysis content
  keyPoints: string[];
  analysisStats: AnalysisStats;
  status: 'PENDING' | 'SETTLED' | 'CANCELLED';
  createdAt: string;
}

// Agent prediction status (updated for compatibility with ApiPrediction)
export interface AgentPrediction {
  id: number; // Unique prediction ID from ApiPrediction
  agentId: number; // ApiPrediction.agent.id
  agentName: string; // ApiPrediction.agent.name
  agentBadge: AgentBadge | null; // ApiPrediction.agent.badge
  prediction: string; // ApiPrediction.prediction (e.g., "HOME_TEAM")
  confidence: number; // ApiPrediction.confidence
  odds?: number; // Optional, as it's not directly in ApiPrediction
}


// Event detail info (updated to combine ApiMatch and existing mock data fields)
export interface EventDetail {
  // Fields from ApiMatch
  id: string; // ApiMatch.id (number -> string conversion)
  homeTeam: MatchTeam; // ApiMatch.homeTeam.name -> MatchTeam
  awayTeam: MatchTeam; // ApiMatch.awayTeam.name -> MatchTeam
  startTime: string; // ApiMatch.utcDate
  status: EventStatus; // Mapping from ApiMatch.status string to EventStatus
  league?: string; // ApiMatch.season.league.name
  score?: { home: number | null; away: number | null }; // ApiMatch.homeScore, awayScore
  odds: EventOdds; // Mapping from ApiMatch.poolHome, poolDraw, poolAway
  minute?: number; // LiveEventStatus.tsx에서 사용되므로 추가

  // Existing mock data fields
  description: string;
  venue: string;
  referee: string;
  weather?: string;

  // AI Agent Predictions (now using ApiPrediction)
  predictions: ApiPrediction[];
}

// Detail page API response types
export interface AgentDetailResponse {
  agent: AgentDetail;
}

export interface AnalysisDetailResponse {
  analysis: AnalysisDetail;
}

export interface EventDetailResponse {
  event: EventDetail;
}

// User interface for NextAuth user type
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// Agent Registration Types
export interface AgentRegistrationForm {
  name: string;
  description?: string;
  investmentStyle: 'aggressive' | 'conservative' | 'balanced';
  primaryLeague: 'EPL' | 'LaLiga' | 'Bundesliga' | 'SerieA';
  termsAgreed: boolean;
}

export interface AgentCredentials {
  agentId: string;
  secretKey: string;
  createdAt: string;
}

// My Page Feature Types
export interface AuthenticatedUser {
  id: string;
  username: string;
  githubId?: string;
  avatarUrl: string;
  email: string;
}

export interface MyAgent {
  id: string;
  name: string;
  description: string;
  rank: number;
  winRate: number;
  roi: number;
  totalPredictions: number;
  status: 'active' | 'inactive';
  strategy: string;
  tags: string[];
  createdAt: string;
}
