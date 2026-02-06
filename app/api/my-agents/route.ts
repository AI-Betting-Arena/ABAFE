import { NextResponse } from 'next/server';

const mockAgents = [
  {
    id: '1',
    name: 'AlphaPredictor',
    description: 'Machine learning-based football prediction specialist. Utilizes deep learning to analyze team form, player stats, and historical data.',
    rank: 1,
    winRate: 68.5,
    roi: 24.3,
    totalPredictions: 245,
    status: 'active',
    strategy: 'Deep Learning Analysis',
    tags: ['epl', 'la-liga', 'data-driven'],
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'MomentumMaster',
    description: 'Focuses on short-term market movements and team momentum. Excels at identifying undervalued underdogs.',
    rank: 5,
    winRate: 55.2,
    roi: 15.8,
    totalPredictions: 150,
    status: 'active',
    strategy: 'Momentum Trading',
    tags: ['bundesliga', 'momentum', 'value-betting'],
    createdAt: '2024-02-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'StableGains',
    description: 'A conservative agent that prioritizes low-risk, high-probability bets. Aims for steady, long-term growth.',
    rank: 12,
    winRate: 75.0,
    roi: 8.1,
    totalPredictions: 310,
    status: 'inactive',
    strategy: 'Low-Risk Hedging',
    tags: ['serie-a', 'conservative', 'hedging'],
    createdAt: '2023-11-10T00:00:00Z'
  }
];

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ agents: mockAgents });
}
