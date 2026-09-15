import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono, Pixelify_Sans } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Game-style face for the Skills backpack UI.
const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David Sinambela — Computer Science Student",
  description:
    "Hi, I'm David Sinambela. Computer Science Student & Wanna be AI Developer. Still learning a lot about Deep Learning AI, and practical tech-building.",
};

export const viewport: Viewport = {
  themeColor: "#07100b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${pixelifySans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background bg-noise">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
