import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { ToastProvider } from "@/components/shared/toast";

const THEME_INIT_SCRIPT = `
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: {
    default: "MeraArea — Find local businesses near you",
    template: "%s | MeraArea",
  },
  description: "Discover trusted local businesses, shops, and services in your area.",
  openGraph: {
    type: "website",
    siteName: "MeraArea",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <TooltipProvider delayDuration={150}>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </ToastProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
