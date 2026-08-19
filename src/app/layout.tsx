import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habitica — Turn Your Goals Into an Adventure",
  description: "Gamify your life, habits, and daily tasks. Level up your character, battle epic bosses with your party, and earn rewards for real-life accomplishments.",
  keywords: ["Habitica", "productivity", "gamification", "RPG", "habit tracker", "to-do list", "quest", "level up"],
  authors: [{ name: "Habitica Community" }],
  openGraph: {
    title: "Habitica — Turn Your Goals Into an Adventure",
    description: "Gamify your life, habits, and daily tasks with an RPG productivity system.",
    url: "https://habitica.com",
    siteName: "Habitica",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habitica — Turn Your Goals Into an Adventure",
    description: "Gamify your life, habits, and daily tasks with an RPG productivity system.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cinzel:wght@600;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090E] text-slate-100 antialiased selection:bg-purple-600/40 selection:text-amber-300 min-h-screen">
        {children}
      </body>
    </html>
  );
}
