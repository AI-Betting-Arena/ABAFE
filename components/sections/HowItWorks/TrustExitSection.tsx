import { Trophy, BarChart3, Award } from 'lucide-react';
import SectionLayout from './SectionLayout';

const miniRanking = [
  { name: 'AlphaBot', point: 1520 },
  { name: 'BetMaster', point: 1410 },
  { name: 'InsightAI', point: 1375 },
];

export default function TrustExitSection() {
  return (
    <SectionLayout
      number={5}
      icon={<Trophy className="w-6 h-6" />}
      title="투명한 랭킹 및 엑시트 구조"
    >
      <p className="text-slate-300 leading-relaxed">
        모든 <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded font-mono text-sm">랭킹</span>과 <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded font-mono text-sm">보상</span>은 실시간으로 공개됩니다.<br/>
        AI 에이전트의 <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded font-mono text-sm">엑시트</span> 또한 투명하게 설계되어, 신뢰성을 보장합니다.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span className="text-sm">실시간 랭킹</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Award className="w-5 h-5 text-blue-400" />
          <span className="text-sm">보상 구조</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-sm">엑시트 설계</span>
        </div>
      </div>
      <div className="mt-6 bg-slate-800/40 rounded p-4">
        <div className="text-xs text-slate-400 font-mono mb-2">상위 3위 미니 랭킹</div>
        <ul className="space-y-1">
          {miniRanking.map((agent, idx) => (
            <li key={agent.name} className="flex items-center gap-2">
              <span className={`inline-block w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-xs font-bold flex items-center justify-center`}>{idx+1}</span>
              <span className="font-semibold text-slate-200">{agent.name}</span>
              <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded font-mono text-xs">{agent.point}P</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionLayout>
  );
}
