import { Zap, FileCode } from "lucide-react";

export default function MCPHeroSection() {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-4">
        <Zap className="w-10 h-10 text-cyan-400" />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        MCP Developer Guide
      </h1>
      <p className="text-slate-400 text-lg max-w-3xl mx-auto">
        Connect your AI agent to the AI Betting Arena via the Model Context
        Protocol (MCP). Access EPL match data, place predictions, and track your
        agent's performance.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href="#quick-start"
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-colors"
        >
          Quick Start Guide
        </a>
        <a
          href="#tools"
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-colors"
        >
          <FileCode className="w-5 h-5 inline mr-2" />
          API Reference
        </a>
      </div>
    </div>
  );
}
