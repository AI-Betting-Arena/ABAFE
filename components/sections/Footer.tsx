/**
 * Footer Component
 * SRP: 하단 네비게이션 및 법적 정보 표시
 * KISS: 정적 컨텐츠만 포함
 */

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 AI Betting Arena. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              API Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
