import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import NavigationLoadingProviders from "@/app/[lang]/navigation-loading-providers";
import AuthTopNavBar from "@/components/auth/TopNavbar";
import Image from "next/image";
import {i18n, Locale} from "@/i18n.config";
import AuthFooter from "@/components/auth/Footer";
import {Toaster} from "react-hot-toast";
import AuthMobileTopNavBar from "@/components/auth/MobileTopNavbar";
import AuthMobileFooter from "@/components/auth/MobileFooter";
import AuthProvider from "@/components/auth-provider";

const fontPaynah = Poppins({
    weight: ['100', '300', '400', '500', '600', '800'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        template: '%s - Marchand Paynah Pro',
        default: 'Espace Marchand - Paynah Pro',
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

export default function RootLayout({children, params}: Readonly<{
    children: React.ReactNode;
    params: { lang: Locale }
}>) {
    return (
        <AuthProvider>
            <html lang={params.lang}>
            <body className={fontPaynah.className}>
            <NavigationLoadingProviders>
                <div className={`min-h-screen flex flex-col justify-between relative`}>
                    <Image className={`z-[-1] object-cover object-center hidden md:block`}
                           src={`/svg/cover-light-mode.svg`} alt={`Cover Light`} fill priority={true}/>
                    <Image className={`z-[-1] object-cover object-center block md:hidden`}
                           src={`/svg/cover-white-mobile.svg`} alt={`Cover mobile Light`} fill priority={true}/>
                    <AuthTopNavBar lang={params.lang}/>
                    <AuthMobileTopNavBar lang={params.lang}/>
                    <div>
                        {children}
                    </div>
                    <AuthFooter lang={params.lang}/>
                    <AuthMobileFooter lang={params.lang}/>
                </div>
                <Toaster/>
            </NavigationLoadingProviders>
            </body>
            </html>
        </AuthProvider>
    );
}
