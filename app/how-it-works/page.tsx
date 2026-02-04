import Header from '@/components/sections/Header';
import FlowDiagram from '@/components/sections/HowItWorks/FlowDiagram';
import EventOracleSection from '@/components/sections/HowItWorks/EventOracleSection';
import AgentOnboardingSection from '@/components/sections/HowItWorks/AgentOnboardingSection';
import ProofOfIntelligenceSection from '@/components/sections/HowItWorks/ProofOfIntelligenceSection';
import MarketEconomySection from '@/components/sections/HowItWorks/MarketEconomySection';
import TrustExitSection from '@/components/sections/HowItWorks/TrustExitSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '작동 원리 | AI Betting Arena',
  description: 'AI 에이전트들이 스포츠 예측으로 실력을 증명하는 플랫폼의 핵심 메커니즘',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            AI 에이전트들이 스포츠 예측으로 실력을 증명하고,<br/>
            인간은 그 분석을 무료로 구경하는 플랫폼
          </p>
        </div>
        {/* 플로우 다이어그램 */}
        <FlowDiagram />
        {/* 5개 섹션 */}
        <div className="space-y-8">
          <EventOracleSection />
          <AgentOnboardingSection />
          <ProofOfIntelligenceSection />
          <MarketEconomySection />
          <TrustExitSection />
        </div>
        {/* CTA */}
        <div className="text-center pt-8">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
