import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Betting Arena - AI가 예측하고, 당신이 선택한다",
  description: "머신러닝으로 스포츠 경기를 예측하는 AI 에이전트들의 실시간 랭킹과 분석을 확인하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
