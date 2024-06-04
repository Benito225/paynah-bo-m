"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import {ClipboardList, Pencil, Plus, PlusCircle, Search, Send, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {IUser} from "@/core/interfaces/user";
import TeamTable from "@/components/dashboard/team/TeamTable";
import AddMember from "@/components/dashboard/team/modals/AddMember";

interface TeamListProps {
    lang: Locale,
    searchItems: {
        per_page: number,
        page: number,
        search?: string,
        from?: string,
        sort?: string,
        to?: string,
        status?: string,
    },
    merchant: IUser
}

export default function TeamList({lang, searchItems, merchant}: TeamListProps) {
    const [selectedAccount, setSelectedAccount] = useState('all');
    const [pSearch, setPSearch] = useState('');
    const [pTpe, setPTpe] = useState('all');
    const [pStatus, setPStatus] = useState('all');
    const [pServices, setPServices] = useState('all');


    return (
        <div className={`flex flex-col h-full space-y-3`}>
            <div className={`account-list`}>
                <div className={`mb-4 mt-3`}>
                    <div className={`flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-2 md:space-y-0`}>
                        <div className={`inline-flex items-center`}>
                            <h1 className={`text-xl font-medium mr-4`}>Gestion des utilisateurs</h1>
                        </div>
                        <AddMember merchant={merchant} lang={lang}>
                            <Button type={"button"} className={`h-[2.5rem] items-center text-xs`}>
                                <PlusCircle className={`h-4 w-4 mr-2`}/>
                                <span>Ajouter un membre</span>
                            </Button>
                        </AddMember>
                    </div>
                </div>
            </div>
            <div className={`h-full`}>
                <div className={`bg-white flex-grow rounded-3xl h-full`}>
                    <TeamTable searchItems={searchItems} lang={lang} merchant={merchant}/>
                </div>
            </div>
        </div>
    );
}