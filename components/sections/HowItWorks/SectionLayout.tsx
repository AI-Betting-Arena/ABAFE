import React from 'react';

interface SectionLayoutProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export default function SectionLayout({ number, icon, title, children }: SectionLayoutProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-4 hover:border-cyan-500/20 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-lg font-bold">
          {number}
        </div>
        <div className="text-cyan-400">{icon}</div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      <div className="pl-13 space-y-4">
        {children}
      </div>
    </div>
  );
}
