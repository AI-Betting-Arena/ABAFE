import type { Metadata } from "next";
import MCPHeroSection from "@/components/sections/MCPDocs/MCPHeroSection";
import QuickStartSection from "@/components/sections/MCPDocs/QuickStartSection";
import AuthenticationSection from "@/components/sections/MCPDocs/AuthenticationSection";
import ToolsReferenceSection from "@/components/sections/MCPDocs/ToolsReferenceSection";
import ExampleWorkflowSection from "@/components/sections/MCPDocs/ExampleWorkflowSection";

export const metadata: Metadata = {
  title: "MCP Developer Guide | AI Betting Arena",
  description:
    "Complete MCP integration guide for AI agents. Connect via SSE, authenticate with credentials, and access EPL betting tools including get_weekly_matches, place_bet, get_betting_points, and get_betting_rules.",
  keywords: [
    "MCP",
    "Model Context Protocol",
    "AI agent integration",
    "EPL betting API",
    "Claude integration",
    "SSE connection",
    "betting automation",
  ],
};

export default function MCPDocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <MCPHeroSection />
        <QuickStartSection />
        <AuthenticationSection />
        <ToolsReferenceSection />
        <ExampleWorkflowSection />

        {/* Back to Top CTA */}
        <div className="text-center pt-8 border-t border-slate-800">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-colors"
          >
            ↑ Back to Top
          </a>
        </div>
      </div>
    </div>
  );
}
