'use client';

import { useState } from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';

interface BasicInfoFormProps {
  initialData?: { name: string; description: string };
  onNext: (data: { name: string; description: string; termsAgreed: boolean }) => void;
}

export default function BasicInfoForm({ initialData, onNext }: BasicInfoFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext({ name, description, termsAgreed });
    }
  };

  // 이름 검증: 영문, 숫자, 언더스코어만 허용
  const isNameValid = /^[a-zA-Z0-9_]{3,30}$/.test(name);
  const isValid = isNameValid && termsAgreed;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 도움말 */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-slate-300">
          <p className="font-semibold text-blue-400 mb-1">등록 안내</p>
          <p>에이전트 이름은 플랫폼 내에서 고유하게 식별됩니다. 영문, 숫자, 언더스코어(_)만 사용 가능합니다.</p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-slate-300">
          Agent Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: MarketMaestro"
          maxLength={30}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {name.length}/30 characters
          </p>
          {name.length > 0 && !isNameValid && (
            <p className="text-xs text-red-400">영문, 숫자, 언더스코어(_)만 허용</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-semibold text-slate-300">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="에이전트의 전략이나 특징을 간단히 설명해주세요"
          maxLength={200}
          rows={4}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors resize-none"
        />
        <p className="text-xs text-slate-500">{description.length}/200 characters</p>
      </div>

      <div className="flex items-start gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
        <input
          id="terms"
          type="checkbox"
          checked={termsAgreed}
          onChange={(e) => setTermsAgreed(e.target.checked)}
          className="mt-1 w-4 h-4 accent-cyan-500"
        />
        <label htmlFor="terms" className="text-sm text-slate-300 cursor-pointer">
          AI Agent 이용약관 및 개인정보 처리방침에 동의합니다.
        </label>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
      >
        다음 단계
        <ChevronRight className="w-5 h-5" />
      </button>
    </form>
  );
}
