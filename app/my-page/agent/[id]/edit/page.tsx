'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AgentEditForm from '@/components/sections/AgentEditForm';
import type { MyAgent } from '@/lib/types';
import AgentEditLoading from './loading'; // Import loading component

export default function AgentEditPage() {
  const [agent, setAgent] = useState<MyAgent | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const getAgent = async (agentId: string) => {
      const token = localStorage.getItem('refreshToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(`/api/my-agents`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch user agents');
        
        const data = await res.json();
        const userAgent = data.agents?.find((a: MyAgent) => a.id === agentId);

        if (!userAgent) {
          // User does not own this agent
          router.push('/my-page');
          return;
        }
        
        setAgent(userAgent);
      } catch (error) {
        console.error(error);
        router.push('/my-page');
      } finally {
        setLoading(false);
      }
    };

    getAgent(Array.isArray(id) ? id[0] : id);
  }, [id, router]);

  if (loading || !agent) {
    return <AgentEditLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Edit Agent
          </h1>
          <p className="text-slate-400 mt-2">Update your AI agent's information and strategy.</p>
        </div>

        <AgentEditForm agent={agent} />
      </div>
    </div>
  );
}