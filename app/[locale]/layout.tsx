import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import Contacts from "./components/Contacts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Chat",
  description: "Mini chat is a small and simple chat website",
};

type RooLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: RooLayoutProps) {
  const { locale } = await params;
  return (
    <html
    
      suppressHydrationWarning
      dir={locale === "en" ? "ltr" : "rtl"}
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    > 
      
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
