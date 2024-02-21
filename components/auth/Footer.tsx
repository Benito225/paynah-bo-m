import {Locale} from "@/i18n.config";
import Link from "next/link";

interface AuthFooterProps {
    lang: Locale
}

export default function AuthFooter({lang}: AuthFooterProps) {
    return (
        <footer>
            <div className={`max-w-screen-2xl mx-auto py-5 px-4 mt-[2.401rem] md:px-6 lg:px-8`}>
                <div className={`flex space-x-3 items-center justify-between`}>
                    <div className={`langSwitch cursor-pointer group inline-flex items-center space-x-1`}>
                        <svg className={`h-4 w-4 fill-gray-footer group-hover:fill-gray-footer/80 duration-300`} viewBox="0 0 16.859 16.859">
                            <path
                                d="M10.421,2a8.429,8.429,0,1,0,8.438,8.429A8.425,8.425,0,0,0,10.421,2Zm5.841,5.058H13.776a13.191,13.191,0,0,0-1.163-3A6.768,6.768,0,0,1,16.262,7.058ZM10.429,3.72a11.874,11.874,0,0,1,1.61,3.338H8.819A11.874,11.874,0,0,1,10.429,3.72Zm-6.524,8.4a6.594,6.594,0,0,1,0-3.372H6.754a13.921,13.921,0,0,0-.118,1.686,13.921,13.921,0,0,0,.118,1.686ZM4.6,13.8H7.083a13.191,13.191,0,0,0,1.163,3,6.732,6.732,0,0,1-3.65-3ZM7.083,7.058H4.6a6.732,6.732,0,0,1,3.65-3,13.191,13.191,0,0,0-1.163,3Zm3.346,10.081A11.874,11.874,0,0,1,8.819,13.8h3.22A11.874,11.874,0,0,1,10.429,17.139ZM12.4,12.115H8.457a12.4,12.4,0,0,1-.135-1.686,12.294,12.294,0,0,1,.135-1.686H12.4a12.294,12.294,0,0,1,.135,1.686A12.4,12.4,0,0,1,12.4,12.115Zm.211,4.687a13.191,13.191,0,0,0,1.163-3h2.487A6.768,6.768,0,0,1,12.612,16.8ZM14.1,12.115a13.921,13.921,0,0,0,.118-1.686A13.921,13.921,0,0,0,14.1,8.743h2.849a6.594,6.594,0,0,1,0,3.372Z"
                                transform="translate(-2 -2)"/>
                        </svg>
                        <span className={`text-gray-footer group-hover:text-gray-footer/80 text-xs mt-[0.1rem]`}>Français</span>
                        <span className={`mt-0.5`}>
                            <svg className={`h-2.5 w-2.5 stroke-gray-footer group-hover:stroke-gray-footer/80`} viewBox="0 0 12.216 7.108">
                              <path d="M17.888,11.5l-4.694,4.694L8.5,11.5" transform="translate(-7.086 -10.086)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"
                                    strokeWidth="2"/>
                            </svg>
                        </span>
                    </div>
                    <div className={`menu-and-copyrighting font-light text-xs space-x-2 inline-flex`}>
                        <span>Copyright &copy; 2023 Paynah. Tous droits réservés</span>
                        <span>|</span>
                        <Link className={`hover:underline underline-offset-1 duration-300`} href={`#`}>Politique de
                            confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}