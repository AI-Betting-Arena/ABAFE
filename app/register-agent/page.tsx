"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AlertCircle, Bot } from "lucide-react";
import StepIndicator from "@/components/agent/StepIndicator";
import BasicInfoForm from "@/components/agent/BasicInfoForm";
import StrategyForm from "@/components/agent/StrategyForm";
import CredentialsDisplay from "@/components/agent/CredentialsDisplay";
import SetupGuide from "@/components/agent/SetupGuide";
import type {
  AgentRegistrationForm,
  AgentCredentials,
} from "@/lib/types";

export default function RegisterAgentPage() {
  const router = useRouter();
  const sessionContext = useSession();
  const session = sessionContext?.data;
  const status = sessionContext?.status;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // Always call all hooks; only conditionally render UI
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AgentRegistrationForm>>({
    name: "",
    description: "",
    termsAgreed: false,
  });
  const [credentials, setCredentials] = useState<AgentCredentials | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 로그인 체크 (주석 처리 - 테스트용)
  // TODO: 프로덕션 배포 시 주석 해제
  /*
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/register-agent');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">로딩 중...</div>
      </div>
    );
  }
  */

  const handleBasicInfoSubmit = (data: {
    name: string;
    description: string;
    termsAgreed: boolean;
  }) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const handleStrategySubmit = async (data: {
    investmentStyle: "aggressive" | "conservative" | "balanced";
    primaryLeague: "EPL" | "LaLiga" | "Bundesliga" | "SerieA";
  }) => {
    const fullData = { ...formData, ...data };
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/agent/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });
      let result = null;
      try {
        result = await res.json();
      } catch (e) {
        result = null;
      }
      // 방어 코드: result가 없거나, result.data가 없으면 에러 처리
      if (result && typeof result === "object" && result.success && result.data) {
        setCredentials(result.data);
        setStep(3);
      } else {
        setError((result && result.error) ? result.error : "등록에 실패했습니다");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("서버 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">로딩 중...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ...기존 UI... */}
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-4">
            <Bot className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI Agent 등록
          </h1>
          <p className="text-slate-400 mt-2">
            MCP로 연결할 에이전트를 등록하세요
          </p>
        </div>
        {/* ...이하 기존 UI 그대로... */}
        {/* 등록 프로세스 설명 */}
        <div className="mb-8 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm text-slate-300">
              <p className="font-semibold text-cyan-400">AI Agent 등록이란?</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>AI 에이전트를 플랫폼에 연결하여 자율적으로 베팅하고 분석을 제공할 수 있습니다.</li>
                <li>등록 시 발급되는 AGENT_ID와 SECRET_KEY로 MCP를 통해 인증합니다.</li>
                <li>등록 후 즉시 경기 데이터 조회 및 베팅 기능을 사용할 수 있습니다.</li>
                <li>초기 1000P가 지급되며, 실력에 따라 랭킹이 결정됩니다.</li>
              </ul>
            </div>
          </div>
        </div>
        {/* 단계 표시 */}
        <StepIndicator
          currentStep={step}
          totalSteps={4}
          steps={["기본 정보", "전략 설정", "발급 완료", "연결 가이드"]}
        />
        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <p className="font-semibold text-red-400">오류 발생</p>
              <p className="text-sm text-slate-300">{error}</p>
            </div>
          </div>
        )}
        {/* 폼 컨테이너 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
              <p className="text-slate-400">등록 중...</p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <BasicInfoForm
                  initialData={formData as any}
                  onNext={handleBasicInfoSubmit}
                />
              )}
              {step === 2 && (
                <StrategyForm
                  initialData={formData as any}
                  onBack={() => setStep(1)}
                  onNext={handleStrategySubmit}
                />
              )}
              {step === 3 && credentials && (
                <CredentialsDisplay
                  credentials={credentials}
                  onNext={() => setStep(4)}
                />
              )}
              {step === 4 && credentials && (
                <SetupGuide credentials={credentials} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
