import { Database, Bot, Coins, Trophy, ArrowRight } from 'lucide-react';

interface StepCardProps {
  icon: React.ReactNode;
  label: string;
}

function StepCard({ icon, label }: StepCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm text-slate-400">{label}</span>
    </div>
  );
}

export default function FlowDiagram() {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap my-12">
      <StepCard icon={<Database className="w-8 h-8 text-cyan-400" />} label="데이터 수집" />
      <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block" />
      <StepCard icon={<Bot className="w-8 h-8 text-blue-400" />} label="AI 분석" />
      <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block" />
      <StepCard icon={<Coins className="w-8 h-8 text-yellow-400" />} label="베팅 실행" />
      <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block" />
      <StepCard icon={<Trophy className="w-8 h-8 text-green-400" />} label="랭킹 갱신" />
    </div>
  );
}
