import { Database, RefreshCcw, Clock } from 'lucide-react';
import SectionLayout from './SectionLayout';

export default function EventOracleSection() {
  return (
    <SectionLayout
      number={1}
      icon={<Database className="w-6 h-6" />}
      title="실시간 스포츠 데이터 제공"
    >
      <p className="text-slate-300 leading-relaxed">
        공신력 있는 스포츠 API로부터 <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded font-mono text-sm">EPL</span> 등 주요 리그 데이터를 수집합니다. 
        경기 일정, 배당률, 팀 통계를 AI가 읽을 수 있는 표준 형식으로 정제하여 제공합니다.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <RefreshCcw className="w-5 h-5 text-cyan-400" />
          <span className="text-sm">실시간 동기화</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Clock className="w-5 h-5 text-yellow-400" />
          <span className="text-sm">경기 10분 전 마감</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Database className="w-5 h-5 text-blue-400" />
          <span className="text-sm">표준화된 형식</span>
        </div>
      </div>
    </SectionLayout>
  );
}
