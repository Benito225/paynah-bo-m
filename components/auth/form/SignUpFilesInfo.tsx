"use client"

import React from "react";
import {Button} from "@/components/ui/button";
import AddMerchantKycProps from "@/components/auth/form/AddMerchantKyc";


interface SignUpFilesInfoProps {
    lang: string,
    handleGoToBack: () => void,
    handleGoToNext: () => void,
    legalForm: { id: string; name: string; code: string; skaleetId: string; sk_document: any[]; company_type: number }
}

export default function SignUpFilesInfo({ lang, handleGoToBack, handleGoToNext, legalForm }: SignUpFilesInfoProps) {

    return (
        <div className={`formContainer mx-auto max-w-2xl`}>
            <div className={`text-center mb-28`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Préparez-vous pour terminer</h2>
                <p className={`text-[#626262] font-light text-sm md:text-base`}>{`Préparez les éléments suivants pour finaliser l'ouverture de votre compte. `}
                    {`S'ils ne sont pas prêts, vous pourriez les ajouter plus tard en vous reconnectant.`}
                </p>
            </div>
            <div className={`px-4 md:px-16 mb-[0.5rem] md:mb-[5.5rem]`}>
                {legalForm.company_type == 1 &&
                    <div className={`flex flex-col space-y-6`}>
                        <div className={`inline-flex items-start space-x-4 text-sm md:text-base`}>
                            <svg className={`h-5 w-5 shrink-0`} viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            <span className={`-mt-0.5`}>Votre CNI, Passeport, Carte consulaire ou carte de résidents pour les étrangers</span>
                        </div>
                    </div>
                }

                {legalForm.company_type == 2 &&
                    <div className={`flex flex-col space-y-6`}>
                        <div className={`inline-flex items-start space-x-4 text-sm md:text-base`}>
                            <svg className={`h-5 w-5 shrink-0`} viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            <span className={`-mt-0.5`}>{`La déclaration fiscale d'existant (DFE) de votre entreprise`}</span>
                        </div>
                        <div className={`inline-flex items-start space-x-4 text-sm md:text-base`}>
                            <svg className={`h-5 w-5 shrink-0`} viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            <span className={`-mt-0.5`}>Votre CNI, Passeport, Carte consulaire ou carte de résidents pour les étrangers</span>
                        </div>
                        <div className={`inline-flex items-start space-x-4 text-sm md:text-base`}>
                            <svg className={`h-5 w-5 shrink-0`} viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            <span className={`-mt-0.5`}>Le registre de commerce (RCCM) de votre entreprise</span>
                        </div>
                    </div>
                }

                {legalForm.company_type == 3 &&
                    <div className={`flex flex-col space-y-6`}>
                        <div className={`inline-flex items-start space-x-4 text-sm md:text-base`}>
                            <svg className={`h-5 w-5 shrink-0`} viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            <span className={`-mt-0.5`}>{`La déclaration fiscale d'existant (DFE) de votre entreprise`}</span>
                        </div>
                        <div className={`inline-flex items-start space-x-4 text-sm md:text-base`}>
                            <svg className={`h-5 w-5 shrink-0`} viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            <span className={`-mt-0.5`}>Votre CNI, Passeport, Carte consulaire ou carte de résidents pour les étrangers</span>
                        </div>
                        <div className={`inline-flex items-start space-x-4 text-sm md:text-base`}>
                            <svg className={`h-5 w-5 shrink-0`} viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            <span className={`-mt-0.5`}>{`La Décision/Arrêté ministérielle votre institution`}</span>
                        </div>
                    </div>
                }

                <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5 mt-[6.5rem] md:mt-[8rem]`}>
                    {/*<Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`}>*/}
                    {/*    Retour*/}
                    {/*</Button>*/}
                    <Button onClick={handleGoToNext} type={"button"} className={`!mb-1 w-full md:w-[9rem] h-[2.8rem]`}>
                        Continuer
                    </Button>
                </div>
            </div>
        </div>
    );
}