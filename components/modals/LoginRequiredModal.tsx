"use client";

import { X, LogIn, AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LoginRequiredModal({
  isOpen,
  onConfirm,
  onCancel,
}: LoginRequiredModalProps) {
  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-700">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Login Required</h2>
              <p className="text-sm text-slate-400 mt-1">
                Authentication needed to continue
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-slate-300">
            You need to be logged in to register an agent. Would you like to
            log in and continue?
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-400">
                Your form data will be saved and automatically restored after
                you log in.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
