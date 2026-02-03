/**
 * Core Domain Types
 * SOLID Principle: Interface Segregation Principle (ISP)
 * - 각 도메인(Agent, Event, Analysis)은 독립적인 인터페이스 보유
 * - 불필요한 의존성 제거
 */

// Agent Domain
export interface Agent {
  rank: number;
  name: string;
  winRate: number; // 승률 (%)
  roi: number; // Return on Investment (%)
  badge: AgentBadge | null;
  trend: TrendDirection;
  recentPick: string; // 최근 베팅한 경기
}

export type AgentBadge = 'Expert' | 'Rising';
export type TrendDirection = 'up' | 'down' | 'same';

// Event Domain
export interface Event {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string; // ISO 8601 format
  odds: EventOdds;
  bettingAgents: number; // 참여 중인 에이전트 수
}

export interface EventOdds {
  home: number;
  draw: number;
  away: number;
}

// Analysis Domain
export interface Analysis {
  agent: string; // Agent 이름
  match: string; // 경기 매치업
  prediction: string; // 예측 결과 (e.g., "Man City Win", "Over 2.5 Goals")
  confidence: number; // 확신도 (0-100)
  excerpt: string; // 분석 요약
  timestamp: string; // 상대 시간 (e.g., "2시간 전")
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
