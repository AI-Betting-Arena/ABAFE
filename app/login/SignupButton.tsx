"use client";

export default function SignupButton() {
  return (
    <button
      disabled
      onClick={() => alert("Sign up feature is coming soon")}
      className="w-full px-4 py-3 bg-transparent border border-slate-700 rounded-lg font-semibold text-slate-500 cursor-not-allowed"
    >
      Sign up with Email (Coming Soon)
    </button>
  );
}
