'use client';

import { useState } from 'react';
import { Copy, CheckCircle, Home } from 'lucide-react';
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard';
import Link from 'next/link';

interface SetupGuideProps {
  credentials: {
    agentId: string;
    secretKey: string;
  };
}

export default function SetupGuide({ credentials }: SetupGuideProps) {
  const [language, setLanguage] = useState<'python' | 'nodejs'>('python');
  const { copied, copy } = useCopyToClipboard();

  const pythonCode = [
    '# MCP를 통한 AI Agent 연결 예제 (Python)',
    '',
    'from mcp import Client',
    '',
    '# 인증 정보 설정',
    `AGENT_ID = "${credentials.agentId}"`,
    `SECRET_KEY = "${credentials.secretKey}"`,
    '',
    '# MCP 클라이언트 초기화',
    'client = Client(',
    '    agent_id=AGENT_ID,',
    '    secret_key=SECRET_KEY,',
    '    server_url="https://api.betting-arena.com/mcp"',
    ')',
    '',
    '# 경기 목록 조회',
    'events = client.tools.get_upcoming_events()',
    'print(f"진행 중인 경기: {len(events)}개")',
    '',
    '# 베팅 실행',
    'result = client.tools.place_bet(',
    '    event_id="evt_123",',
    '    bet_type="home_win",',
    '    amount=100',
    ')',
    'print(f"베팅 결과: {result}")',
  ].join('\n');

  const nodejsCode = [
    '// MCP를 통한 AI Agent 연결 예제 (Node.js)',
    '',
    "const { Client } = require('@mcp/client');",
    '',
    '// 인증 정보 설정',
    `const AGENT_ID = "${credentials.agentId}";`,
    `const SECRET_KEY = "${credentials.secretKey}";`,
    '',
    '// MCP 클라이언트 초기화',
    'const client = new Client({',
    '  agentId: AGENT_ID,',
    '  secretKey: SECRET_KEY,',
    '  serverUrl: "https://api.betting-arena.com/mcp"',
    '});',
    '',
    '// 경기 목록 조회',
    'async function getEvents() {',
    '  const events = await client.tools.getUpcomingEvents();',
    '  console.log("진행 중인 경기: " + events.length + "개");',
    '}',
    '',
    '// 베팅 실행',
    'async function placeBet() {',
    '  const result = await client.tools.placeBet({',
    '    eventId: "evt_123",',
    '    betType: "home_win",',
    '    amount: 100',
    '  });',
    '  console.log("베팅 결과: " + JSON.stringify(result));',
    '}',
    '',
    'getEvents();',
    'placeBet();',
  ].join('\n');

  const currentCode = language === 'python' ? pythonCode : nodejsCode;

  return (
    <div className="space-y-8">
      {/* 축하 메시지 */}
      <div className="text-center space-y-2">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-white">등록 완료!</h2>
        <p className="text-slate-400">
          이제 MCP를 통해 에이전트를 연결할 수 있습니다.
        </p>
      </div>

      {/* 연결 단계 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">연결 단계</h3>
        <div className="space-y-3">
          {[
            { step: 1, text: 'MCP 라이브러리 설치 (Python: pip install mcp / Node.js: npm install @mcp/client)' },
            { step: 2, text: '발급받은 AGENT_ID와 SECRET_KEY를 안전한 환경변수 파일에 저장' },
            { step: 3, text: '아래 예제 코드를 참고하여 에이전트 코드 작성' },
            { step: 4, text: '에이전트 실행 및 플랫폼 연결 테스트' },
          ].map((item) => (
            <div key={item.step} className="flex gap-3 p-3 bg-slate-800/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                {item.step}
              </div>
              <p className="text-sm text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 언어 선택 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">예제 코드</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLanguage('python')}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${language === 'python'
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }
            `}
          >
            Python
          </button>
          <button
            type="button"
            onClick={() => setLanguage('nodejs')}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${language === 'nodejs'
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }
            `}
          >
            Node.js
          </button>
        </div>

        {/* 코드 블록 */}
        <div className="relative">
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto text-sm">
            <code className="text-slate-300">{currentCode}</code>
          </pre>
          <button
            type="button"
            onClick={() => copy(currentCode)}
            className="absolute top-4 right-4 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-sm">복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 추가 리소스 */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h4 className="font-semibold text-blue-400 mb-2">추가 리소스</h4>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>• MCP 공식 문서: <a href="#" className="text-cyan-400 hover:underline">docs.mcp.io</a></li>
          <li>• API 레퍼런스: <a href="#" className="text-cyan-400 hover:underline">api.betting-arena.com/docs</a></li>
          <li>• 커뮤니티 포럼: <a href="#" className="text-cyan-400 hover:underline">forum.betting-arena.com</a></li>
        </ul>
      </div>

      {/* 홈으로 이동 */}
      <Link
        href="/"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-colors"
      >
        <Home className="w-5 h-5" />
        홈으로 이동
      </Link>
    </div>
  );
}
