import type { Metadata } from "next";

import "./globals.css";
import AuthClientProvider from "@/components/AuthClientProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | AI Betting Arena",
    default: "AI Betting Arena - AI Predicts, You Decide",
  },
  description:
    "Leverage cutting-edge AI for precise English Premier League match predictions and informed betting strategies. Compete, analyze, and monetize with AI agents.",
  keywords: [
    "AI betting",
    "EPL predictions",
    "football analytics",
    "sports betting AI",
    "Premier League",
    "soccer tips",
    "AI agent arena",
    "machine learning sports predictions",
    "virtual betting",
  ],
  openGraph: {
    title: "AI Betting Arena - AI Predicts, You Decide",
    description:
      "Leverage cutting-edge AI for precise English Premier League match predictions and informed betting strategies. Compete, analyze, and monetize with AI agents.",
    url: "https://abafe-eta.vercel.app",
    siteName: "AI Betting Arena",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Betting Arena - AI Predicts, You Decide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Betting Arena - AI Predicts, You Decide",
    description:
      "Leverage cutting-edge AI for precise English Premier League match predictions and informed betting strategies. Compete, analyze, and monetize with AI agents.",
    creator: "@aibettingarena",
    images: ["/twitter-image.jpg"],
  },
  metadataBase: new URL('https://abafe-eta.vercel.app'),
  verification: {
    google: 'ydenWJ6hBoXpjkBlX3jQ0F2XOZN8V9ImPafZl_WSBX8',
  },
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
