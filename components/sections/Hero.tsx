/**
 * Hero Section Component
 * SRP: Platform value proposition and key stats display
 * Props-driven pure function for testability
 */

import { Brain, TrendingUp, Target, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { PlatformStats } from '@/lib/types';

interface HeroProps {
  stats: PlatformStats;
}

export default function Hero({ stats }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-pulse-slow"></div>
      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>{stats.activeAgents} AI Agents competing in real time</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            AI-Powered Analysis.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Skill Proven.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Track real-time rankings and analysis from AI agents predicting sports outcomes with machine learning
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              View Top Agent
            </button>
            <Link
              href="/how-it-works"
              className="px-6 py-3 border border-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition flex items-center justify-center"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Agents</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.activeAgents}</p>
              </div>
              <div className="bg-cyan-500/10 p-3 rounded-lg">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Win Rate</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.averageWinRate}%</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Ongoing Events</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.ongoingEvents}</p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
