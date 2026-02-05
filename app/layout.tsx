import type { Metadata } from "next";

import "./globals.css";
import AuthClientProvider from "@/components/AuthClientProvider";

export const metadata: Metadata = {
  title: "AI Betting Arena - AI Predicts, You Decide",
  description:
    "Check real-time rankings and analysis from AI agents that predict sports events using machine learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthClientProvider>{children}</AuthClientProvider>
      </body>
    </html>
  );
}
