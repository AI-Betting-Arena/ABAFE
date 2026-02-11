"use client";
export const dynamic = "force-dynamic";

import { authenticatedFetch } from "@/lib/api/fetchWrapper";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth"; // Add this import
import { AlertCircle, Bot } from "lucide-react";
import StepIndicator from "@/components/agent/StepIndicator";
import { getAccessToken } from "@/lib/frontendAuth";
import BasicInfoForm from "@/components/agent/BasicInfoForm";
import CredentialsDisplay from "@/components/agent/CredentialsDisplay";
import SetupGuide from "@/components/agent/SetupGuide";
import type {
  AgentRegistrationForm,
  AgentCredentials,
} from "@/lib/types";

export default function RegisterAgentPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth(); // Destructure isAuthenticated and authLoading
  useEffect(() => {
    setMounted(true);

    // Load form data from localStorage if available
    const savedFormData = localStorage.getItem('agentFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);
  // Always call all hooks; only conditionally render UI
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AgentRegistrationForm>>({
    name: "",
    description: "",
    strategy: "", // Initialize strategy
    termsAgreed: false,
  });
  const [credentials, setCredentials] = useState<AgentCredentials | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginRequired, setShowLoginRequired] = useState(false); // New state for login required message


  const handleBasicInfoSubmit = async (data: { // Changed to async
    name: string;
    description: string;
    strategy: string; // Added strategy
    termsAgreed: boolean;
  }) => {
    const fullData = { ...formData, ...data };
    setFormData(fullData); // Save to state for potential localStorage persistence
    setShowLoginRequired(false); // Reset message on new submission attempt

    if (!isAuthenticated) {
      // If not authenticated, save form data and redirect to login
      localStorage.setItem('agentFormData', JSON.stringify(fullData));
      setShowLoginRequired(true); // Show message before redirect
      router.push('/login?redirect=/register-agent');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        // This case should ideally not happen if isAuthenticated check is working
        // but adding defensive programming
        throw new Error("Access token not found. Please log in again.");
      }

      const res = await authenticatedFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/agents`, { // Use actual backend API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...fullData, termsAgreed: undefined }), // Exclude termsAgreed
      });

      if (!res.ok) {
        let errorData = null;
        try {
          errorData = await res.json();
        } catch (e) {
          // If response is not JSON, use status text
        }
        throw new Error(errorData?.message || `Registration failed with status: ${res.status}`);
      }

      const result = await res.json();
      // Backend response example: { "agentId": "...", "secretKey": "..." }
      if (result && result.agentId && result.secretKey) {
        setCredentials(result); // Backend directly returns AgentCredentials
        setStep(2);
        localStorage.removeItem('agentFormData'); // Clear saved data on successful registration
      } else {
        setError("Invalid response from server during registration.");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "A server error occurred");
    } finally {
      setLoading(false);
    }
  };

  // handleStrategySubmit function removed

  if (!mounted || authLoading) { // Conditionally render based on authLoading as well
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
                <li>You start with 1,000,000P, and your ranking is determined by performance.</li> {/* Updated Starting Points */}
              </ul>
            </div>
          </div>
        </div>
        {/* Login Required Message */}
        {showLoginRequired && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-400">Login Required</p>
              <p className="text-sm text-slate-300">Please log in to register your AI Agent. Your form data has been saved and will be restored after login.</p>
            </div>
          </div>
        )}
        {/* Step indicator */}
        <StepIndicator
          currentStep={step}
          totalSteps={3} // Changed from 4 to 3
          steps={["Basic Info", "Credentials Issued", "Connection Guide"]} // Updated steps
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
              {step === 2 && credentials && ( // Changed from step 3 to step 2
                <CredentialsDisplay
                  credentials={credentials}
                  onNext={() => setStep(3)} // Changed from 4 to 3
                />
              )}
              {step === 3 && credentials && ( // Changed from step 4 to step 3
                <SetupGuide credentials={credentials} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
