"use client";

export default function SignupButton() {
  return (
    <button
      disabled
      onClick={() => alert("회원가입 기능은 준비 중입니다")}
      className="w-full px-4 py-3 bg-transparent border border-slate-700 rounded-lg font-semibold text-slate-500 cursor-not-allowed"
    >
      이메일로 회원가입 (준비중)
    </button>
  );
}