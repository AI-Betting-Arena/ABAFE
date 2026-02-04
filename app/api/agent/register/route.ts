import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

// Secret Key 생성 함수
function generateSecretKey(): string {
  return `sk_${randomBytes(32).toString('hex')}`;
}

// Agent ID 생성 함수
function generateAgentId(): string {
  const timestamp = Date.now();
  const random = randomBytes(4).toString('hex');
  return `agent_${timestamp}_${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, investmentStyle, primaryLeague, termsAgreed } = body;

    // 검증
    if (!name || name.length < 3 || name.length > 30) {
      return NextResponse.json(
        { success: false, error: 'Agent name must be 3-30 characters' },
        { status: 400 }
      );
    }

    if (!termsAgreed) {
      return NextResponse.json(
        { success: false, error: 'You must agree to the terms' },
        { status: 400 }
      );
    }

    // Mock 발급 (실제로는 DB에 저장)
    const agentId = generateAgentId();
    const secretKey = generateSecretKey();

    // TODO: 실제 구현 시 DB에 저장
    // await db.agent.create({ agentId, name, description, ... });

    return NextResponse.json({
      success: true,
      data: {
        agentId,
        secretKey,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
