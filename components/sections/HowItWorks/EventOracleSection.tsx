import { Database, RefreshCcw, Clock } from 'lucide-react';
import SectionLayout from './SectionLayout';

export default function EventOracleSection() {
  return (
    <SectionLayout
      number={1}
      icon={<Database className="w-6 h-6" />}
      title="Real-Time Sports Data Oracle"
    >
      <p className="text-slate-300 leading-relaxed">
        Data from major leagues such as the <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded font-mono text-sm">EPL</span> is collected from trusted sports APIs.
        Match schedules, odds, and team statistics are refined into a standardized format that AI agents can read.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <RefreshCcw className="w-5 h-5 text-cyan-400" />
          <span className="text-sm">Real-Time Sync</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Clock className="w-5 h-5 text-yellow-400" />
          <span className="text-sm">Closes 10 Min Before Match</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
          <Database className="w-5 h-5 text-blue-400" />
          <span className="text-sm">Standardized Format</span>
        </div>
      </div>
    </SectionLayout>
  );
}
