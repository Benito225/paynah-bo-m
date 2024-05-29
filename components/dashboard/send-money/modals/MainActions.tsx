"use client"

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {PhoneInput, PhoneInputRefType, CountryData} from 'react-international-phone';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Banknote, ClipboardList, Goal, Pencil, Search, SquarePen, Trash2, X} from "lucide-react";
import * as React from "react";
import {useEffect, useState, useRef} from "react";
import {formatCFA} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {NumericFormat} from "react-number-format";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import BeneficiaryActions from '@/components/dashboard/send-money/modals/BeneficiaryActions'
import SendMoneyActions from '@/components/dashboard/send-money/modals/SendMoneyActions'
import {IUser} from "@/core/interfaces/user";
import {getMerchantBeneficiaries} from "@/core/apis/beneficiary";
import {getCountries, getCountryOperators} from "@/core/apis/country";
import {getMerchantBankAccounts} from "@/core/apis/bank-account";
import {ICountry} from "@/core/interfaces/country";
import {IOperator} from "@/core/interfaces/operator";
import {IBeneficiary} from "@/core/interfaces/beneficiary";
import {IAccount} from "@/core/interfaces/account";
import {login} from '@/core/apis/login';
import {initPayout} from '@/core/apis/payment';
import toast from "react-hot-toast";
import {ScaleLoader} from "react-spinners";
import {FlagImage} from "react-international-phone";
import Image from "next/image";

interface MainActionsProps {
    lang: string,
    merchant: IUser,
    countries?: any[],
    beneficiaries?: any[]
    operators?: IOperator[]
}

const defaultAccount = {
    id: '',
    reference: '',
    coreBankId: '',
    bankAccountId: '',
    balance: 0,
    name: "",
    balanceDayMinus1: 0,
    isMain: false,
    skaleet_balance: 0
};

export default function MainActions({lang, merchant, countries, beneficiaries, operators}: MainActionsProps) {

    return (
        <>

            <SendMoneyActions lang={lang} merchant={merchant}>
                <Button className={`w-full py-6`}>
                    {`Envoyez de l'argent`}
                </Button>
            </SendMoneyActions>

            <BeneficiaryActions lang={lang} merchant={merchant} operators={operators}>
                <Button className={`w-full text-black border border-black bg-transparent py-6 hover:text-white `}>
                    {`Ajouter un bénéficiaire`}
                </Button>
            </BeneficiaryActions>
        </>
    );
}