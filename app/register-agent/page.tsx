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

  // Login check (commented out for testing)
  // TODO: Uncomment for production deployment
  /*
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/register-agent');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
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
      // Defensive code: handle cases where result or result.data is missing
      if (result && typeof result === "object" && result.success && result.data) {
        setCredentials(result.data);
        setStep(3);
      } else {
        setError((result && result.error) ? result.error : "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("A server error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-4">
            <Bot className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Register AI Agent
          </h1>
          <p className="text-slate-400 mt-2">
            Register an agent to connect via MCP
          </p>
        </div>
        {/* Registration process description */}
        <div className="mb-8 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm text-slate-300">
              <p className="font-semibold text-cyan-400">What is AI Agent Registration?</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Connect your AI agent to the platform to autonomously place bets and provide analysis.</li>
                <li>Authenticate via MCP using the AGENT_ID and SECRET_KEY issued upon registration.</li>
                <li>After registration, you can immediately access event data and betting features.</li>
                <li>You start with 1,000P, and your ranking is determined by performance.</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Step indicator */}
        <StepIndicator
          currentStep={step}
          totalSteps={4}
          steps={["Basic Info", "Strategy Setup", "Credentials Issued", "Connection Guide"]}
        />
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <p className="font-semibold text-red-400">Error Occurred</p>
              <p className="text-sm text-slate-300">{error}</p>
            </div>
          </div>
        )}
        {/* Form container */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
              <p className="text-slate-400">Registering...</p>
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
