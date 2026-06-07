import "./globals.css";
import { Geist, Geist_Mono, Baloo_2, Dancing_Script } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata = {
  title: "Sai Krishna Rao Anugu — AI Software Engineer",
  description:
    "AI Software Engineer specializing in backend architecture, LLM integration, and scalable ML systems. M.Sc. in AI from Universität Siegen.",
  openGraph: {
    title: "Sai Krishna Rao Anugu — AI Software Engineer",
    description:
      "AI Software Engineer building scalable backend systems and AI-powered applications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Krishna Rao Anugu — AI Software Engineer",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${baloo2.variable} ${dancingScript.variable}`}
    >
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
