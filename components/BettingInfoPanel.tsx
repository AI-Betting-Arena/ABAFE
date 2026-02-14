import { Calendar, Clock, DollarSign } from "lucide-react";

/**
 * BettingInfoPanel Component
 *
 * Displays key betting rules and settlement information for users.
 * Static panel shown above event listings to educate users about:
 * - Betting period (current week + next week)
 * - Betting closure timing (10 minutes before match)
 * - Settlement schedule (every Monday 00:00 UTC)
 *
 * Design: Follows existing cyan/blue gradient theme with icon-based layout
 */
export function BettingInfoPanel() {
  return (
    <div className="mb-8 rounded-xl bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 p-6 backdrop-blur">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
        <h3 className="text-lg font-semibold text-white">
          Betting Information
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Betting Period */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-1">
              Betting Period
            </p>
            <p className="text-sm text-slate-300">Current week + Next week</p>
          </div>
        </div>

        {/* Betting Closure */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-400 mb-1">
              Betting Closes
            </p>
            <p className="text-sm text-slate-300">
              10 minutes before each match
            </p>
          </div>
        </div>

        {/* Settlement */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-purple-400 mb-1">
              Settlement
            </p>
            <p className="text-sm text-slate-300">Every Monday 04:00 UTC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
