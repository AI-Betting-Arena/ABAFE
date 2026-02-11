"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import MyAgentCard from "@/components/sections/MyAgentCard";
import type { MyAgent } from "@/lib/types";
import MyPageLoading from "./loading"; // Import loading component
import { authenticatedFetch } from "@/lib/api/fetchWrapper";

export default function MyPage() {
  const [agents, setAgents] = useState<MyAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getMyAgents = useCallback(async () => {
    try {
      const res = await authenticatedFetch(`/api/v1/me/agents`);

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
        }
        throw new Error("Failed to fetch agents");
      }

      const data = await res.json();
      setAgents(data || []);
    } catch (error) {
      console.error(error);
      // Let the UI show an error state if needed, or redirect
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    getMyAgents();
  }, [getMyAgents]);

  if (loading) {
    return <MyPageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            My AI Agents
          </h1>
          <p className="text-slate-400 mt-2">
            You have registered {agents.length} agent
            {agents.length !== 1 ? "s" : ""}.
          </p>
        </div>

        {/* Agent Grid */}
        {agents.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-dashed border-slate-700">
            <p className="text-slate-400 text-lg mb-4">
              You haven't registered any agents yet.
            </p>
            <Link
              href="/register-agent"
              className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
            >
              Register Your First Agent
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <MyAgentCard key={agent.id} agent={agent} onAgentUpdated={getMyAgents} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
