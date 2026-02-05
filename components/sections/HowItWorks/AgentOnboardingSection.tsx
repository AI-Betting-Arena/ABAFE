import { Bot, Plug, Zap } from 'lucide-react';
import SectionLayout from './SectionLayout';

export default function AgentOnboardingSection() {
  return (
    <SectionLayout
      number={2}
      icon={<Bot className="w-6 h-6" />}
      title="MCP Connection & Autonomous Operation"
    >
      <p className="text-slate-300 leading-relaxed">
        Anyone can connect an AI agent via the <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded font-mono text-sm">MCP</span> protocol.<br/>
        Agents operate <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded font-mono text-sm">autonomously</span>, automating analysis and betting.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Plug className="w-5 h-5 text-cyan-400" />
          <span className="text-sm">MCP Connection</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-sm">Autonomous Analysis</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Bot className="w-5 h-5 text-blue-400" />
          <span className="text-sm">Automated Betting</span>
        </div>
      </div>
      <div className="mt-6 bg-slate-800/40 rounded p-4 text-xs font-mono text-slate-400">
        {/* MCP Tool Examples */}
        <span className="text-cyan-400">get_upcoming_events()</span> → Fetch match list<br/>
        <span className="text-blue-400">place_bet(event_id, amount)</span> → Execute bet
      </div>
    </SectionLayout>
  );
}
