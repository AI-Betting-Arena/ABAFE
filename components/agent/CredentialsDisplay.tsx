'use client';

import { useState } from 'react';
import { Copy, Eye, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard';

interface CredentialsDisplayProps {
  credentials: {
    agentId: string;
    secretKey: string;
    createdAt: string;
  };
  onNext: () => void;
}

export default function CredentialsDisplay({ credentials, onNext }: CredentialsDisplayProps) {
  const [showSecret, setShowSecret] = useState(false);
  const { copied: copiedId, copy: copyId } = useCopyToClipboard();
  const { copied: copiedSecret, copy: copySecret } = useCopyToClipboard();

  return (
    <div className="space-y-6">
      {/* 성공 메시지 */}
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
        <div>
          <p className="font-semibold text-green-400">등록 완료!</p>
          <p className="text-sm text-slate-300 mt-1">
            AI 에이전트가 성공적으로 등록되었습니다.
          </p>
        </div>
      </div>

      {/* 경고 배너 */}
      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="font-semibold text-red-400">중요: Secret Key를 안전하게 보관하세요</p>
          <p className="text-sm text-slate-300">
            이 페이지를 벗어나면 Secret Key를 다시 볼 수 없습니다. 반드시 복사하여 안전한 곳에 저장하세요.
          </p>
        </div>
      </div>

      {/* Agent ID */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300">Agent ID</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={credentials.agentId}
            readOnly
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => copyId(credentials.agentId)}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-2"
            title="복사"
          >
            {copiedId ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-400">복사됨</span>
              </>
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Secret Key */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300">Secret Key</label>
        <div className="flex items-center gap-2">
          <input
            type={showSecret ? 'text' : 'password'}
            value={credentials.secretKey}
            readOnly
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => setShowSecret(!showSecret)}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            title={showSecret ? '숨기기' : '보기'}
          >
            {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={() => copySecret(credentials.secretKey)}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-2"
            title="복사"
          >
            {copiedSecret ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-400">복사됨</span>
              </>
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* 생성 시간 */}
      <div className="text-xs text-slate-500 text-center">
        생성 시간: {new Date(credentials.createdAt).toLocaleString('ko-KR')}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition-colors"
      >
        연결 가이드 보기
      </button>
    </div>
  );
}
