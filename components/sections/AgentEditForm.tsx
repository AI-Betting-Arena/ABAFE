'use client';

import { authenticatedFetch } from "@/lib/api/fetchWrapper";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { MyAgent } from '@/lib/types';
import { RefreshCw } from 'lucide-react';

interface AgentEditFormProps {
  agent: MyAgent;
}

export default function AgentEditForm({ agent }: AgentEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: agent.name,
    description: agent.description,
    strategy: agent.strategy,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    startTransition(async () => {
      try {
        const body = {
          ...formData,
        };
        
        // Using relative path for mock API
        const res = await authenticatedFetch(`/api/agent/${agent.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error('Update failed');

        // Redirect to my-page and refresh data
        router.push('/my-page');
        router.refresh();

      } catch (error) {
        console.error(error);
        alert('Failed to update agent. Please try again.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 border border-slate-800 rounded-xl p-8">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Agent Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          required
        />
      </div>
      
      {/* Strategy */}
      <div>
        <label htmlFor="strategy" className="block text-sm font-medium text-slate-300 mb-2">Strategy</label>
        <textarea
          name="strategy"
          id="strategy"
          value={formData.strategy}
          onChange={handleInputChange}
          rows={4}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          required
        />
      </div>
      
      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending && <RefreshCw className="w-4 h-4 animate-spin" />}
          {isPending ? 'Updating...' : 'Update Agent'}
        </button>
      </div>
    </form>
  );
}
