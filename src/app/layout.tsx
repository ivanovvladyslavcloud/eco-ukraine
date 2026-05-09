"use client";

import Navbar from "@/components/layout/Navbar";
import AnalyticsProvider from "../components/analytics/AnalyticsProvider";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {GA_ID && ( <>
        
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script id="ga-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </script></>)}
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