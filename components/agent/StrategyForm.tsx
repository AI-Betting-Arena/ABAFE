'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Shield, BarChart3 } from 'lucide-react';

interface StrategyFormProps {
  initialData?: {
    investmentStyle: 'aggressive' | 'conservative' | 'balanced';
    primaryLeague: 'EPL' | 'LaLiga' | 'Bundesliga' | 'SerieA';
  };
  onBack: () => void;
  onNext: (data: {
    investmentStyle: 'aggressive' | 'conservative' | 'balanced';
    primaryLeague: 'EPL' | 'LaLiga' | 'Bundesliga' | 'SerieA';
  }) => void;
}

export default function StrategyForm({ initialData, onBack, onNext }: StrategyFormProps) {
  const [investmentStyle, setInvestmentStyle] = useState<'aggressive' | 'conservative' | 'balanced'>(
    initialData?.investmentStyle || 'balanced'
  );
  const [primaryLeague, setPrimaryLeague] = useState<'EPL' | 'LaLiga' | 'Bundesliga' | 'SerieA'>(
    initialData?.primaryLeague || 'EPL'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ investmentStyle, primaryLeague });
  };

  const investmentStyles = [
    {
      value: 'aggressive' as const,
      label: '공격적',
      icon: <TrendingUp className="w-6 h-6" />,
      description: '고위험 고수익 전략',
      color: 'red',
    },
    {
      value: 'conservative' as const,
      label: '보수적',
      icon: <Shield className="w-6 h-6" />,
      description: '저위험 안정 수익',
      color: 'green',
    },
    {
      value: 'balanced' as const,
      label: '균형',
      icon: <BarChart3 className="w-6 h-6" />,
      description: '중위험 균형 수익',
      color: 'blue',
    },
  ];

  const leagues = [
    { value: 'EPL' as const, label: 'English Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { value: 'LaLiga' as const, label: 'La Liga (Spain)', flag: '🇪🇸' },
    { value: 'Bundesliga' as const, label: 'Bundesliga (Germany)', flag: '🇩🇪' },
    { value: 'SerieA' as const, label: 'Serie A (Italy)', flag: '🇮🇹' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Investment Style */}
      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-300">
          Investment Style <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {investmentStyles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => setInvestmentStyle(style.value)}
              className={`
                p-6 rounded-lg border-2 transition-all
                ${investmentStyle === style.value
                  ? `border-${style.color}-500 bg-${style.color}-500/10`
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }
              `}
            >
              <div className={`${investmentStyle === style.value ? `text-${style.color}-400` : 'text-slate-400'} mb-3`}>
                {style.icon}
              </div>
              <h3 className="font-semibold text-white mb-1">{style.label}</h3>
              <p className="text-sm text-slate-400">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Primary League */}
      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-300">
          Primary League <span className="text-red-400">*</span>
        </label>
        <div className="space-y-2">
          {leagues.map((league) => (
            <button
              key={league.value}
              type="button"
              onClick={() => setPrimaryLeague(league.value)}
              className={`
                w-full flex items-center gap-3 p-4 rounded-lg border transition-colors
                ${primaryLeague === league.value
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }
              `}
            >
              <span className="text-2xl">{league.flag}</span>
              <span className={`font-medium ${primaryLeague === league.value ? 'text-white' : 'text-slate-300'}`}>
                {league.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Starting Points (읽기 전용) */}
      <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-300">Starting Points</p>
            <p className="text-xs text-slate-500 mt-1">초기 지급 포인트 (변경 불가)</p>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            1,000 P
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          이전
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition-colors"
        >
          등록하기
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
