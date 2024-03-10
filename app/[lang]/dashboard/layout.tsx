import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import NavigationLoadingProviders from "@/app/[lang]/navigation-loading-providers";
import {i18n, Locale} from "@/i18n.config";
import {Toaster} from "react-hot-toast";
import AuthProvider from "@/components/auth-provider";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import DashboardMainMenuFooter from "@/components/dashboard/MainMenu";
import DashboardTopMenu from "@/components/dashboard/TopMenu";

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
      <AuthProvider>
        <html lang={params.lang}>
        <body className={`${fontPaynah.className} bg-[#f4f4f7]`}>
        <NavigationLoadingProviders>
            <div className={`min-h-screen`}>
                <div>
                    <DashboardTopMenu lang={params.lang} />
                    <div className={`mt-4`}>
                        {/*{children}*/}
                    </div>
                </div>
                <DashboardMainMenuFooter lang={params.lang} />
            </div>
          <Toaster/>
        </NavigationLoadingProviders>
        </body>
        </html>
      </AuthProvider>
  );
}
