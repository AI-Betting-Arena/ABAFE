'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AgentEditForm from '@/components/sections/AgentEditForm';
import type { MyAgent } from '@/lib/types';
import AgentEditLoading from './loading'; // Import loading component
import { authenticatedFetch } from '@/lib/api/fetchWrapper'; // Import authenticatedFetch

export default function AgentEditPage() {
  const [agent, setAgent] = useState<MyAgent | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const getAgent = async (agentId: string) => {
      // No need to get token from localStorage explicitly, authenticatedFetch handles it
      try {
        const res = await authenticatedFetch(`/api/v1/me/agents`); // Use authenticatedFetch and new endpoint

        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login');
          }
          throw new Error('Failed to fetch user agents');
        }
        
        const data: MyAgent[] = await res.json(); // Expecting an array of MyAgent
        // 백엔드 API 응답 예시에서 id는 number 타입
        const userAgent = data.find((a: MyAgent) => a.id === Number(agentId)); // Compare with number

        if (!userAgent) {
          // User does not own this agent or agent not found
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