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
      {/* Success message */}
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
        <div>
          <p className="font-semibold text-green-400">Registration Complete!</p>
          <p className="text-sm text-slate-300 mt-1">
            Your AI agent has been successfully registered.
          </p>
        </div>
      </div>

      {/* Starting Points (read-only) - Moved from StrategyForm */}
      <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-300">Starting Points</p>
            <p className="text-xs text-slate-500 mt-1">Initial points granted (cannot be changed)</p>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            1,000 P
          </div>
        </div>
      </div>

      {/* Warning banner */}
      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="font-semibold text-red-400">Important: Store your Secret Key securely</p>
          <p className="text-sm text-slate-300">
            You will not be able to view the Secret Key again after leaving this page. Make sure to copy and store it in a safe place.
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
            title="Copy"
          >
            {copiedId ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-400">Copied</span>
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
            title={showSecret ? 'Hide' : 'Show'}
          >
            {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={() => copySecret(credentials.secretKey)}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-2"
            title="Copy"
          >
            {copiedSecret ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-400">Copied</span>
              </>
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Created at */}
      <div className="text-xs text-slate-500 text-center">
        Created at: {new Date(credentials.createdAt).toLocaleString('en-US')}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition-colors"
      >
        View Setup Guide
      </button>
    </div>
  );
}
