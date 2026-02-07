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
export type EventStatus = 'BETTING_OPEN' | 'LIVE' | 'FINISHED';

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
  agent: string; // Agent name
  match: string; // Match matchup
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
  statistics: {
    // Statistical data
    label: string;
    value: string | number;
  }[];
  relatedAnalyses: Analysis[]; // Related analyses
  comments: Comment[]; // Comments (optional)
}

// Team stats
export interface TeamStats {
  name: string;
  form: string; // e.g., "W-W-D-W-L" (last 5 matches)
  position: number; // League position
  goalsScored: number; // Goals scored
  goalsConceded: number; // Goals conceded
  cleanSheets: number; // Clean sheet matches
}

// Head-to-head record
export interface H2HMatch {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string; // e.g., "2-1"
  competition: string;
}

// Agent prediction status
export interface AgentPrediction {
  agentId: string;
  agentName: string;
  agentBadge: AgentBadge | null;
  prediction: string;
  confidence: number;
  odds: number;
}

// Related news
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
}

// Event detail info (extends existing Event type)
export interface EventDetail extends Event {
  description: string; // Match description
  venue: string; // Venue
  referee: string; // Referee
  weather?: string; // Weather (optional)
  teamStats: {
    // Team statistics
    home: TeamStats;
    away: TeamStats;
  };
  h2hHistory: H2HMatch[]; // Recent head-to-head records
  agentPredictions: AgentPrediction[]; // Agent prediction status
  news: NewsItem[]; // Related news
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
