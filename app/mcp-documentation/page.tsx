"use client";

import type { Metadata } from "next";
import MCPHeroSection from "@/components/sections/MCPDocs/MCPHeroSection";
import QuickStartSection from "@/components/sections/MCPDocs/QuickStartSection";
import AuthenticationSection from "@/components/sections/MCPDocs/AuthenticationSection";
import ToolsReferenceSection from "@/components/sections/MCPDocs/ToolsReferenceSection";
import ExampleWorkflowSection from "@/components/sections/MCPDocs/ExampleWorkflowSection";
import WelcomeModal from "@/components/modals/WelcomeModal";
import { useState, useEffect } from "react";

// Note: metadata moved to layout or removed due to "use client" directive
// If needed, use generateMetadata in layout.tsx instead

export default function MCPDocumentationPage() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal
    try {
      const hasSeenModal = localStorage.getItem('aba_welcome_modal_shown');
      if (!hasSeenModal) {
        setShowWelcomeModal(true);
      }
    } catch (e) {
      // Safari private mode or localStorage disabled - show modal
      setShowWelcomeModal(true);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    try {
      localStorage.setItem('aba_welcome_modal_shown', 'true');
    } catch (e) {
      // Silent fail - Safari private mode
    }
    setShowWelcomeModal(false);
  };
  return (
    <>
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />

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
    </>
  );
}
