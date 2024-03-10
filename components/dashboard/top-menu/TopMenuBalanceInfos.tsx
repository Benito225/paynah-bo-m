"use client"

import {Locale} from "@/i18n.config";
import {formatCFA, hiddeBalance} from "@/lib/utils";
import {useState} from "react";

interface TopMenuBalanceInfosProps {
    lang: Locale
}

export default function TopMenuBalanceInfos({lang}: TopMenuBalanceInfosProps) {

    const [displayBalance, setDisplayBalance] = useState(true);
    const [displayAvailableBalance, setDisplayAvailableBalance] = useState(false);
    const [balance, setBalance] = useState(800300);
    const [availableBalance, setAvailableBalance] = useState(800100);

    function toggleBalanceView() {
        setDisplayBalance(!displayBalance)
    }

    function toggleAvailableBalanceView() {
        setDisplayAvailableBalance(!displayAvailableBalance)
    }

    return (
        <div className={`account-sold`}>
                <div className={`inline-flex flex-col space-y-0`}>
                    <div className={`inline-flex items-center text-sm space-x-1`}>
                        <span className={`font-light text-[#8f9090]`}>Solde :</span>
                        <div className={`inline-flex items-center space-x-1`}>
                            <span className={`font-semibold duration-300`}>{displayBalance ? formatCFA(balance) : hiddeBalance(formatCFA(balance))}</span>
                            <svg onClick={toggleBalanceView} className={`w-3 h-3 cursor-pointer ${displayBalance && 'fill-[#adadad]'}`} viewBox="0 0 21.656 27.07">
                                <path
                                    d="M14.828,16.889a1.354,1.354,0,0,0-1.354,1.354V22.3a1.354,1.354,0,0,0,2.707,0V18.242A1.354,1.354,0,0,0,14.828,16.889ZM21.6,11.475V8.768a6.768,6.768,0,1,0-13.535,0v2.707A4.061,4.061,0,0,0,4,15.535V25.01A4.061,4.061,0,0,0,8.061,29.07H21.6a4.061,4.061,0,0,0,4.061-4.061V15.535A4.061,4.061,0,0,0,21.6,11.475ZM10.768,8.768a4.061,4.061,0,1,1,8.121,0v2.707H10.768ZM22.949,25.01A1.354,1.354,0,0,1,21.6,26.363H8.061A1.354,1.354,0,0,1,6.707,25.01V15.535a1.354,1.354,0,0,1,1.354-1.354H21.6a1.354,1.354,0,0,1,1.354,1.354Z"
                                    transform="translate(-4 -2)"/>
                            </svg>
                        </div>
                    </div>
                    <div className={`inline-flex items-center text-sm space-x-1`}>
                        <span className={`font-light text-[#8f9090]`}>Solde disponible :</span>
                        <div className={`inline-flex items-center space-x-1`}>
                            <span className={`font-semibold duration-300`}>{displayAvailableBalance ? formatCFA(availableBalance) : hiddeBalance(formatCFA(availableBalance))}</span>
                            <svg onClick={toggleAvailableBalanceView} className={`w-3 h-3 cursor-pointer ${displayAvailableBalance && 'fill-[#adadad]'}`} viewBox="0 0 21.656 27.07">
                                <path
                                    d="M14.828,16.889a1.354,1.354,0,0,0-1.354,1.354V22.3a1.354,1.354,0,0,0,2.707,0V18.242A1.354,1.354,0,0,0,14.828,16.889ZM21.6,11.475V8.768a6.768,6.768,0,1,0-13.535,0v2.707A4.061,4.061,0,0,0,4,15.535V25.01A4.061,4.061,0,0,0,8.061,29.07H21.6a4.061,4.061,0,0,0,4.061-4.061V15.535A4.061,4.061,0,0,0,21.6,11.475ZM10.768,8.768a4.061,4.061,0,1,1,8.121,0v2.707H10.768ZM22.949,25.01A1.354,1.354,0,0,1,21.6,26.363H8.061A1.354,1.354,0,0,1,6.707,25.01V15.535a1.354,1.354,0,0,1,1.354-1.354H21.6a1.354,1.354,0,0,1,1.354,1.354Z"
                                    transform="translate(-4 -2)"/>
                            </svg>
                        </div>
                    </div>
                </div>
        </div>
    );
}