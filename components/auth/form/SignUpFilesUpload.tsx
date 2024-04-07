"use client"

import React from "react";
import {Button} from "@/components/ui/button";


interface SignUpFilesUploadProps {
    lang: string,
    handleGoToBack: () => void,
    handleGoToNext: () => void
}

export default function SignUpFilesUpload({ lang, handleGoToBack, handleGoToNext }: SignUpFilesUploadProps) {

    return (
        <div className={`formContainer mx-auto max-w-4xl`}>
            <div className={`text-center mb-28`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Insérez vos pièces justificatives</h2>
                <p className={`text-[#626262] w-full md:w-[60%] md:mx-auto text-sm md:text-base`}>{`Joignez vos pièces d'identité et les documents d'entreprise en suivant l'ordre définie. `}
                </p>
            </div>
            <div className={`px-4 mb-[0.5rem] md:mb-[5.5rem]`}>


                <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5 mt-[6.5rem] md:mt-[8rem]`}>
                    <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`}>
                        Retour
                    </Button>
                    <Button onClick={handleGoToNext} type={"button"} className={`!mb-1 w-full md:w-[9rem] h-[2.8rem]`}>
                        Continuer
                    </Button>
                </div>
            </div>
        </div>
    );
}