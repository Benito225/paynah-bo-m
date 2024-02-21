import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import NavigationLoadingProviders from "@/app/[lang]/navigation-loading-providers";
import {i18n, Locale} from "@/i18n.config";
import {Toaster} from "react-hot-toast";

const fontPaynah = Poppins({
  weight: ['100', '300', '400', '500', '600', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s - BO Marchand Paynah Pro',
    default: 'Espace Marchand - Paynah Pro'
  },
  description: 'Backoffice Marchand de Paynah Pro',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '520x520',
      url: '/images/favicon.png',
    },
  ],
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className={fontPaynah.className}>
      <NavigationLoadingProviders>
        {children}
        <Toaster />
      </NavigationLoadingProviders>
      </body>
    </html>
  );
}
