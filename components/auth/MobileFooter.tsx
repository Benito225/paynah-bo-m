import {Locale} from "@/i18n.config";
import Link from "next/link";

interface AuthMobileFooterProps {
    lang: Locale
}

export default function AuthMobileFooter({lang}: AuthMobileFooterProps) {
    return (
        <footer className={`block md:hidden`}>
            <div className={`max-w-screen-2xl border-t border-[#efefef] bg-[#fbfbfb] py-4 px-4 md:px-6 lg:px-8`}>
                <div className={`flex items-center`}>
                    <div className={`menu-and-copyrighting font-light text-xs space-y-1 flex flex-col items-center justify-center w-full`}>
                        <Link className={`hover:underline underline-offset-1 text-center duration-300`} href={`#`}>Politique de
                            confidentialité</Link>
                        <span className={`text-center`}>Copyright &copy; 2023 Paynah. Tous droits réservés</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}