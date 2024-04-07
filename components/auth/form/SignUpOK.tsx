"use client"

import React from "react";
import {Button} from "@/components/ui/button";


interface SignUpOKProps {
    lang: string,
}

export default function SignUpOK({ lang }: SignUpOKProps) {

    return (
        <div className={`formContainer mx-auto max-w-4xl`}>
            <div className={`text-center flex flex-col items-center mb-10`}>
                <span className="relative flex w-40 h-40 mb-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caebe4]"></span>
                    <span className="relative inline-flex rounded-full w-40 h-40 bg-[#41a38c]"></span>
                </span>
                <h2 className={`font-semibold text-center text-3xl md:text-4xl mb-3`}>Félicitations</h2>
                <p className={`text-[#626262] w-full md:w-[40%] md:leading-6 md:mx-auto text-lg md:text-xl`}>{`Votre demande d'inscritpion a bien été prise en compte.`}
                </p>
            </div>
        </div>
    );
}