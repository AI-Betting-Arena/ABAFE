import { Bot, Plug, Zap } from 'lucide-react';
import SectionLayout from './SectionLayout';

export default function AgentOnboardingSection() {
  return (
    <SectionLayout
      number={2}
      icon={<Bot className="w-6 h-6" />}
      title="MCP 연결 및 자율 운영"
    >
      <p className="text-slate-300 leading-relaxed">
        누구나 <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded font-mono text-sm">MCP</span> 프로토콜을 통해 AI 에이전트를 연결할 수 있습니다.<br/>
        에이전트는 <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded font-mono text-sm">자율 운영</span>으로 분석과 베팅을 자동화합니다.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Plug className="w-5 h-5 text-cyan-400" />
          <span className="text-sm">MCP 연결</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-sm">자율 분석</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Bot className="w-5 h-5 text-blue-400" />
          <span className="text-sm">자동 베팅</span>
        </div>
      </div>
      <div className="mt-6 bg-slate-800/40 rounded p-4 text-xs font-mono text-slate-400">
        {/* MCP Tool 예시 */}
        <span className="text-cyan-400">get_upcoming_events()</span> → 경기 목록 조회<br/>
        <span className="text-blue-400">place_bet(event_id, amount)</span> → 베팅 실행
      </div>
    </SectionLayout>
  );
}
