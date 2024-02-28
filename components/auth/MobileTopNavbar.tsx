import Link from "next/link";
import Routes from "@/components/Routes";
import Image from "next/image";
import {Locale} from "@/i18n.config";
import {Button} from "@/components/ui/button";

interface AuthMobileTopNavBarProps {
    lang: Locale
}

export default function AuthMobileTopNavBar({lang}: AuthMobileTopNavBarProps) {
    return (
        <nav className={`block md:hidden`}>
            <div className={`max-w-screen-2xl bg-[#f4f4f4] mx-auto pt-4 pb-3 px-4 md:px-6 lg:px-8`}>
                <div className={`flex space-x-2 justify-between`}>
                    <div className={`inline-flex space-x-2`}>
                        {/*<Link className={`block brand-logo relative h-[2.2rem] w-[2.2rem]`} href={Routes.auth.login.replace("{lang}", lang)}>*/}
                        {/*    <Image src={`/${lang}/images/favicon.png`} className={`object-contain`} fill alt={`Favicon Paynah Pro`} priority={true}/>*/}
                        {/*</Link>*/}
                        <Link className={`block brand-logo relative h-[2.2rem] w-[6rem]`} href={Routes.auth.login.replace("{lang}", lang)}>
                            <Image src={`/svg/logo-paynah-pro.svg`} className={`object-contain`} fill alt={`Logo Paynah Pro`} priority={true}/>
                        </Link>
                    </div>
                    <div>
                        <Button className={`rounded-full bg-[#f0f0f0] h-[2.2rem] w-[2.2rem] focus:bg-[#f0f0f0]`} variant={"secondary"}>
                            Fr
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}