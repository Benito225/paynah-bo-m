import Link from "next/link";
import Routes from "@/components/Routes";
import Image from "next/image";
import {Locale} from "@/i18n.config";

interface AuthTopNavBarProps {
    lang: Locale
}

export default function AuthTopNavBar({lang}: AuthTopNavBarProps) {
    return (
        <nav className={`hidden md:block`}>
            <div className={`max-w-screen-2xl mx-auto py-5 px-4 md:px-6 lg:px-8`}>
                <Link className={`block brand-logo relative h-[3.5rem] w-[8rem]`} href={Routes.auth.login.replace("{lang}", lang)}>
                    <Image src={`/svg/logo-paynah-pro.svg`} className={`object-contain`} fill alt={`Logo Paynah Pro`} priority={true}/>
                </Link>
            </div>
        </nav>
    );
}