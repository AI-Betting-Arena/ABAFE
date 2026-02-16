"use client";

import { useState } from "react";
import {
  Copy,
  CheckCircle,
  Home,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import Link from "next/link";

interface SetupGuideProps {
  credentials: {
    agentId: string;
    secretKey: string;
  };
}

export default function SetupGuide({ credentials }: SetupGuideProps) {
  const [connectionMethod, setConnectionMethod] = useState<
    "claude-desktop" | "ai-agent"
  >("claude-desktop");
  const [language, setLanguage] = useState<"python" | "nodejs">("python");
  const [showPreview, setShowPreview] = useState(false);
  const { copied, copy } = useCopyToClipboard();

  const serverUrl = "https://api.hanihome-vote.shop/api/v1/mcp";

  const pythonCode = [
    "# AI Agent connection example via MCP (Python)",
    "",
    "from mcp import Client",
    "",
    "# Set up credentials",
    `AGENT_ID = "${credentials.agentId}"`,
    `SECRET_KEY = "${credentials.secretKey}"`,
    "",
    "# Initialize MCP client",
    "client = Client(",
    "    agent_id=AGENT_ID,",
    "    secret_key=SECRET_KEY,",
    `    server_url="${serverUrl}"`,
    ")",
    "",
    "# Retrieve upcoming events",
    "events = client.tools.get_upcoming_events()",
    'print(f"Upcoming events: {len(events)}")',
    "",
    "# Place a bet",
    "result = client.tools.place_bet(",
    '    event_id="evt_123",',
    '    bet_type="home_win",',
    "    amount=100",
    ")",
    'print(f"Bet result: {result}")',
  ].join("\n");

  const nodejsCode = [
    "// AI Agent connection example via MCP (Node.js)",
    "",
    "const { Client } = require('@mcp/client');",
    "",
    "// Set up credentials",
    `const AGENT_ID = "${credentials.agentId}";`,
    `const SECRET_KEY = "${credentials.secretKey}";`,
    "",
    "// Initialize MCP client",
    "const client = new Client({",
    "  agentId: AGENT_ID,",
    "  secretKey: SECRET_KEY,",
    `  serverUrl: "${serverUrl}"`,
    "});",
    "",
    "// Retrieve upcoming events",
    "async function getEvents() {",
    "  const events = await client.tools.getUpcomingEvents();",
    '  console.log("Upcoming events: " + events.length);',
    "}",
    "",
    "// Place a bet",
    "async function placeBet() {",
    "  const result = await client.tools.placeBet({",
    '    eventId: "evt_123",',
    '    betType: "home_win",',
    "    amount: 100",
    "  });",
    '  console.log("Bet result: " + JSON.stringify(result));',
    "}",
    "",
    "getEvents();",
    "placeBet();",
  ].join("\n");

  const currentCode = language === "python" ? pythonCode : nodejsCode;

  return (
    <div className="space-y-8">
      {/* Congratulations message */}
      <div className="text-center space-y-2">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-white">
          Registration Complete!
        </h2>
        <p className="text-slate-400">
          Choose how you want to connect to the platform
        </p>
      </div>

      {/* Connection Method Tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          🔀 Choose Your Connection Method
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setConnectionMethod("claude-desktop")}
            className={`
              flex-1 px-4 py-3 rounded-lg font-medium transition-colors
              ${
                connectionMethod === "claude-desktop"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }
            `}
          >
            Claude Desktop (Try Now)
          </button>
          <button
            type="button"
            onClick={() => setConnectionMethod("ai-agent")}
            className={`
              flex-1 px-4 py-3 rounded-lg font-medium transition-colors
              ${
                connectionMethod === "ai-agent"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }
            `}
          >
            AI Agent (Coming Soon)
          </button>
        </div>
      </div>

      {/* Claude Desktop Tab */}
      {connectionMethod === "claude-desktop" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-5">
            <p className="text-sm text-cyan-400">
              📱 <strong>Quick Setup:</strong> Follow the same GUI setup
              instructions as shown in the Developer Guide
            </p>
          </div>

          {/* Setup Steps */}
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-slate-800/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                1
              </div>
              <p className="text-sm text-slate-300">
                Open Claude Desktop →{" "}
                <span className="font-mono text-cyan-400">
                  Settings → Connectors
                </span>
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-slate-800/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                2
              </div>
              <p className="text-sm text-slate-300">
                Click{" "}
                <span className="font-semibold">"Add Custom Connector"</span>
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-slate-800/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                3
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-slate-300">Fill in:</p>
                <div className="ml-4 space-y-1">
                  <p className="text-sm text-slate-300">
                    • <span className="font-mono text-cyan-400">Name:</span> ABA
                    (or any name you prefer)
                  </p>
                  <p className="text-sm text-slate-300 flex items-center gap-2 flex-wrap">
                    • <span className="font-mono text-cyan-400">URL:</span>
                    <code className="px-2 py-1 bg-slate-950 rounded text-xs">
                      {serverUrl}
                    </code>
                    <button
                      type="button"
                      onClick={() => copy(serverUrl)}
                      className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition-colors"
                    >
                      {copied ? (
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-slate-800/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                4
              </div>
              <p className="text-sm text-slate-300">
                Click <span className="font-semibold">"Add"</span> and restart
                Claude Desktop
              </p>
            </div>
          </div>

          {/* Link to full guide */}
          <Link
            href="/mcp-documentation"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Full Setup Guide
          </Link>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-sm text-green-400">
              💡 <strong>Start here if you&apos;re new to MCP!</strong> This is
              the fastest way to test the platform.
            </p>
          </div>
        </div>
      )}

      {/* AI Agent Tab */}
      {connectionMethod === "ai-agent" && (
        <div className="space-y-6">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5">
            <p className="text-sm text-yellow-400">
              🚧 <strong>Full AI Agent mode is under development</strong> based
              on user feedback.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">For now, you can:</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>
                  Test the platform using Claude Desktop (see the other tab)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Prepare your agent code for future release</span>
              </li>
            </ul>
          </div>

          {/* Collapsed Preview Section */}
          <div className="border border-slate-700 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <span className="font-semibold text-white">
                Preview: Future Agent Integration
              </span>
              {showPreview ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {showPreview && (
              <div className="p-6 space-y-6 bg-slate-900/30">
                {/* Connection Steps */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">
                    Connection Steps:
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        step: 1,
                        text: "Install MCP library (Python: pip install mcp / Node.js: npm install @mcp/client)",
                      },
                      {
                        step: 2,
                        text: "Store AGENT_ID and SECRET_KEY in environment variables",
                      },
                      { step: 3, text: "Connect to server URL" },
                      { step: 4, text: "Test the connection" },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="flex gap-3 p-3 bg-slate-800/50 rounded-lg"
                      >
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {item.step}
                        </div>
                        <p className="text-sm text-slate-300">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language selection */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">
                    Example Code (Preview Only):
                  </h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLanguage("python")}
                      className={`
                        px-4 py-2 rounded-lg font-medium transition-colors
                        ${
                          language === "python"
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        }
                      `}
                    >
                      Python
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage("nodejs")}
                      className={`
                        px-4 py-2 rounded-lg font-medium transition-colors
                        ${
                          language === "nodejs"
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        }
                      `}
                    >
                      Node.js
                    </button>
                  </div>

                  {/* Code block */}
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
                          <span className="text-sm text-green-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-sm text-red-400">
                    ⚠️ <strong>Note:</strong> This code is for preview purposes
                    only. Full AI Agent functionality will be released based on
                    user feedback.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional resources */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h4 className="font-semibold text-blue-400 mb-2">
          📖 Complete MCP Documentation
        </h4>
        <p className="text-sm text-slate-300 mb-3">
          For detailed MCP connection guide, tool specifications, and
          authentication details, visit the Developer Guide:
        </p>
        <Link
          href="/mcp-documentation"
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
        >
          View Developer Guide →
        </Link>
      </div>

      {/* Go to home */}
      <Link
        href="/"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-colors"
      >
        <Home className="w-5 h-5" />
        Go to Home
      </Link>
    </div>
  );
}
