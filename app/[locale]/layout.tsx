// app/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Fonts
import {
  alexBrush,
  dancingScript,
  greatVibes,
  outfit,
  parisienne,
} from "@/lib/fonts";

// Favicon
import Favicon from "@/public/assets/favicon/favicon.ico";

// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

// Next Intl
import { NextIntlClientProvider } from "next-intl";

// ShadCn
import { Toaster } from "@/components/ui/toaster";

// Components
import { BaseNavbar, BaseFooter } from "@/app/components";

// Contexts
import Providers from "@/contexts/Providers";

// SEO
import { JSONLD, ROOTKEYWORDS } from "@/lib/seo";

// Variables
import { BASE_URL, GOOGLE_SC_VERIFICATION, LOCALES } from "@/lib/variables";

export const metadata: Metadata = {
  title: "RabbitBill | Free Invoice Generator",
  description:
    "Create invoices effortlessly with RabbitBill, a free invoice generator. Try it now!",
  icons: [{ rel: "icon", url: Favicon.src }],
  keywords: ROOTKEYWORDS,
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
  authors: {
    name: "Rabi Chbibi",
    url: "https://rabbitbill.vercel.app",
  },
  verification: {
    google: GOOGLE_SC_VERIFICATION,
  },
};

export function generateStaticParams() {
  const locales = LOCALES.map((locale) => locale.code);
  return locales;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          id="json-ld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </head>
      <body
        className={`${outfit.className} ${dancingScript.variable} ${parisienne.variable} ${greatVibes.variable} ${alexBrush.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {/* Navbar */}
            <BaseNavbar />

            {/* Main Content */}
            <div className="pt-24">
              {" "}
              {/* Add padding to avoid overlap with Navbar */}
              {children}
            </div>

            {/* Footer */}
            <BaseFooter />

            {/* Toast component */}
            <Toaster />

            {/* Vercel analytics */}
            <Analytics />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
