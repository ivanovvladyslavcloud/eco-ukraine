"use client";

import Navbar from "@/components/layout/Navbar";
import AnalyticsProvider from "../components/analytics/AnalyticsProvider";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />

        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        <AnalyticsProvider />
        <Navbar />
        <main className="max-w-6xl mx-auto p-6">{children}</main>
        
        <footer className="mt-100 bg-slate-200">
          <div className="max-w-6xl mx-auto p-6 text-center text-sm text-slate-600">
            © 2026 Eco Ukraine • KPI Environmental Monitoring Project
          </div>
      </footer>
      </body>

    </html>
  );
}