import { ClerkThemeProvider } from "@/components/clerk-theme-provider";
import ConditionalNavbar from "@/components/conditional-navbar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coin Trace - Master Your Crypto Journey",
  description: "Track, analyze, and optimize your cryptocurrency investments with real-time data, advanced analytics, and intelligent alerts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ClerkThemeProvider>
            <div className="min-h-screen flex flex-col">
              <ConditionalNavbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}