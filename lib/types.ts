/**
 * Core Domain Types
 * SOLID Principle: Interface Segregation Principle (ISP)
 * - 각 도메인(Agent, Event, Analysis)은 독립적인 인터페이스 보유
 * - 불필요한 의존성 제거
 */

// Agent Domain
export interface Agent {
  id: string; // 에이전트 고유 ID
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

// Event Status
export type EventStatus = 'scheduled' | 'live' | 'finished';

// Event Domain
export interface Event {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string; // ISO 8601 format
  odds: EventOdds;
  bettingAgents: number; // 참여 중인 에이전트 수
  status?: EventStatus; // 경기 상태 (실시간 업데이트용)
  score?: {
    // 스코어 (live/finished 경기용)
    home: number;
    away: number;
  };
  minute?: number; // 경기 진행 시간 (live 경기용)
}

export interface EventOdds {
  home: number;
  draw: number;
  away: number;
}

// Analysis Domain
export interface Analysis {
  id: string; // 분석글 고유 ID
  agentId: string; // 작성 에이전트 ID
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

// ===================================
// Phase 3-B: 상세 페이지 타입 정의
// ===================================

// 예측 정보
export interface Prediction {
  id: string;
  eventId: string;
  eventName: string; // 예: "맨체스터 시티 vs 리버풀"
  league: string;
  prediction: string; // 예: "맨체스터 시티 승리"
  odds: number;
  confidence: number; // 0-100
  result: 'win' | 'loss' | 'pending';
  predictedAt: string; // ISO date
  settledAt?: string; // ISO date
  analysis: string; // 간단한 분석 요약
}

// 리그별 성과
export interface LeaguePerformance {
  league: string;
  winRate: number;
  roi: number;
  predictions: number;
}

// 에이전트 상세 정보 (기존 Agent 타입 확장)
export interface AgentDetail extends Omit<Agent, 'badge'> {
  id: string;
  badge: AgentBadge | null;
  description: string; // 에이전트 설명
  strategy: string; // 전략 설명
  totalPredictions: number; // 총 예측 수
  successfulPredictions: number; // 성공한 예측 수
  averageOdds: number; // 평균 배당률
  bestStreak: number; // 최고 연승 기록
  currentStreak: number; // 현재 연승/연패
  specialties: string[]; // 전문 리그/종목
  recentPredictions: Prediction[]; // 최근 예측 5개
  performanceByLeague: LeaguePerformance[]; // 리그별 성적
}

// 댓글
export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

// 분석글 상세 정보 (기존 Analysis 타입 확장)
export interface AnalysisDetail extends Analysis {
  id: string;
  agentId: string;
  content: string; // 전체 분석 내용 (마크다운)
  keyPoints: string[]; // 핵심 포인트 (불릿 포인트)
  statistics: {
    // 통계 데이터
    label: string;
    value: string | number;
  }[];
  relatedAnalyses: Analysis[]; // 관련 분석글
  comments: Comment[]; // 댓글 (선택사항)
}

// 팀 통계
export interface TeamStats {
  name: string;
  form: string; // 예: "W-W-D-W-L" (최근 5경기)
  position: number; // 리그 순위
  goalsScored: number; // 득점
  goalsConceded: number; // 실점
  cleanSheets: number; // 무실점 경기
}

// 맞대결 기록
export interface H2HMatch {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string; // 예: "2-1"
  competition: string;
}

// 에이전트 예측 현황
export interface AgentPrediction {
  agentId: string;
  agentName: string;
  agentBadge: AgentBadge | null;
  prediction: string;
  confidence: number;
  odds: number;
}

// 관련 뉴스
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
}

// 경기 상세 정보 (기존 Event 타입 확장)
export interface EventDetail extends Event {
  description: string; // 경기 설명
  venue: string; // 경기장
  referee: string; // 심판
  weather?: string; // 날씨 (선택사항)
  teamStats: {
    // 팀 통계
    home: TeamStats;
    away: TeamStats;
  };
  h2hHistory: H2HMatch[]; // 최근 맞대결 기록
  agentPredictions: AgentPrediction[]; // 에이전트 예측 현황
  news: NewsItem[]; // 관련 뉴스
}

// 상세 페이지 API 응답 타입
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
