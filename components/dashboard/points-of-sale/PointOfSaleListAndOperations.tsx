"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import {ClipboardList, Pencil, Plus, PlusCircle, Search, Send, Trash2} from "lucide-react";
import {formatCFA, getPointsOfSaleStatusBadge, getStatusBadge} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import OperationsTable from "@/components/dashboard/accounts/OperationsTable";
import PaynahCard from "@/components/dashboard/serenity-space/PaynahCard";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {IUser} from "@/core/interfaces/user";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface PointOfSaleListAndOperationsProps {
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

export enum PointsOfSaleStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export default function PointOfSaleListAndOperations({lang, searchItems, merchant}: PointOfSaleListAndOperationsProps) {
    const [selectedAccount, setSelectedAccount] = useState('all');
    const [pSearch, setPSearch] = useState('');
    const [pTpe, setPTpe] = useState('all');
    const [pStatus, setPStatus] = useState('all');
    const [pServices, setPServices] = useState('all');

    const formSchema = z.object({
        search: z.string()
    })

    const filterableForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        }
    });

    const pointsStatus = [
        {key: 'all', value: 'Statut'},
        {key: 'Approved', value: 'Actif'},
        {key: 'Pending', value: 'Inactif'},
        // {key: 'Expired', value: 'Expiré'},
    ];

    const Tpe = [
        {key: 'all', value: 'Terminal ID'},
        {key: 'id', value: 'T909E88RR'},
    ];

    const Services = [
        {key: 'all', value: 'Points en ligne'},
        {key: 'id', value: 'Service 1'},
    ];

    return (
        <div className={`flex flex-col h-full space-y-3`}>
            <div className={`account-list`}>
                <div className={`mb-4 mt-3`}>
                    <div className={`flex flex-col 2xl:flex-row 2xl:justify-between items-start 2xl:items-center space-y-2 2xl:space-y-0`}>
                        <div className={`inline-flex items-center`}>
                            <h1 className={`text-lg font-medium mr-4`}>Points de vente (7)</h1>
                        </div>
                        <div className={`flex items-center w-full 2xl:w-auto justify-between space-x-3`}>
                            <Form {...filterableForm}>
                                <form className={`w-full`} action="#">
                                    {/*<div className={`relative w-[100%] 2xl:w-auto`}>*/}
                                    {/*    <Input value={pSearch} type={`text`} className={`font-normal pl-9 bg-white text-sm rounded-full h-[2.8rem] w-[18rem] 2xl:w-[20rem]`}*/}
                                    {/*           placeholder="Recherche" onChange={(e) => setPSearch(e.target.value)}/>*/}
                                    {/*    <Search className={`absolute h-4 w-4 top-3.5 left-3`} />*/}
                                    {/*</div>*/}
                                    <div className={`grid grid-cols-7 gap-2`}>
                                        <div className={`col-span-2`}>
                                            <div className={`relative`}>
                                                <Input value={pSearch} type={`text`}
                                                       className={`font-normal pl-9 bg-white text-xs rounded-full h-[2.5rem] w-full`}
                                                       placeholder="Recherchez"
                                                       onChange={(e) => setPSearch(e.target.value)}/>
                                                <Search className={`absolute h-4 w-4 top-3 left-3`}/>
                                            </div>
                                        </div>
                                        <div>
                                            <Select onValueChange={(value) => setPTpe(value)} defaultValue={pTpe}>
                                                <SelectTrigger
                                                    className={`w-full text-xs h-[2.5rem] rounded-full bg-white border border-[#e4e4e4] font-normal [&>span]:text-left`}>
                                                    <SelectValue placeholder="Terminal ID"/>
                                                </SelectTrigger>
                                                <SelectContent className={`bg-[#f0f0f0]`}>
                                                    {Tpe.map((item, index) => (
                                                        <SelectItem key={index}
                                                                    className={`text-xs px-7 flex items-center focus:bg-gray-100 font-normal`}
                                                                    value={item.key}>
                                                            {item.value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Select onValueChange={(value) => setPServices(value)}
                                                    defaultValue={pServices}>
                                                <SelectTrigger
                                                    className={`w-full text-xs h-[2.5rem] rounded-full bg-white border border-[#e4e4e4] font-normal [&>span]:text-left`}>
                                                    <SelectValue placeholder="Point en ligne"/>
                                                </SelectTrigger>
                                                <SelectContent className={`bg-[#f0f0f0]`}>
                                                    {Services.map((item, index) => (
                                                        <SelectItem key={index}
                                                                    className={`text-xs px-7 flex items-center focus:bg-gray-100 font-normal`}
                                                                    value={item.key}>
                                                            {item.value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Select onValueChange={(value) => setPStatus(value)} defaultValue={pStatus}>
                                                <SelectTrigger
                                                    className={`w-full text-xs h-[2.5rem] rounded-full bg-white border border-[#e4e4e4] font-normal [&>span]:text-left`}>
                                                    <SelectValue placeholder="Statut"/>
                                                </SelectTrigger>
                                                <SelectContent className={`bg-[#f0f0f0]`}>
                                                    {pointsStatus.map((item, index) => (
                                                        <SelectItem key={index}
                                                                    className={`text-xs px-7 flex items-center focus:bg-gray-100 font-normal`}
                                                                    value={item.key}>
                                                            {item.value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className={`flex justify-end items-center space-x-1 col-span-2`}>
                                            <Button className={`h-[2.5rem] items-center text-xs`}>
                                                <PlusCircle className={`h-4 w-4 mr-2`}/>
                                                <span>Terminal de paiement</span>
                                            </Button>
                                            <Button className={`h-[2.5rem] items-center text-xs`}>
                                                <PlusCircle className={`h-4 w-4 mr-2`}/>
                                                <span>Point en ligne</span>
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className={`flex p-1 space-x-3 2xl:min-h-[10rem] snap-x snap-mandatory overflow-x-auto`}>
                    {/*<PaynahCard merchant={merchant} onClick={() => setSelectedAccount('all')} lang={lang}*/}
                    {/*            className={`snap-end shrink-0 w-[28.5%] 2xl:w-[23%] cursor-pointer rounded-3xl ${selectedAccount == 'all' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'}`}/>*/}

                    <div onClick={() => setSelectedAccount('all')}
                         className={`snap-end shrink-0 w-[23%] 2xl:w-[20%] bg-white flex flex-col justify-between cursor-pointer ${selectedAccount == 'all' && 'outline outline-offset-2 outline-2 outline-[#FFC5AE]'} space-y-7 2xl:space-y-7 px-4 pb-4 pt-4 rounded-3xl`}>
                        <div className={`flex justify-between items-start`}>
                            <div>
                                <div className={`inline-flex flex-col`}>
                                    <div
                                        className={`mb-2.5 aspect-square rounded-xl p-2 bg-[#FFC5AE] w-[2.56em] h-[2.5rem] inline-flex justify-center items-center relative`}>
                                        <svg className={`h-[.8rem] fill-[#000] w-auto`} viewBox="0 0 14.63 14.627">
                                            <g transform="translate(0.15 0.15)">
                                                <path
                                                    d="M9.994.5A4.8,4.8,0,0,0,6.576,1.916l-.705.706a.9.9,0,0,0,0,1.267.917.917,0,0,0,1.267,0l.705-.705a3.042,3.042,0,1,1,4.3,4.3l-.706.705a.9.9,0,0,0,1.267,1.267l.705-.706A4.832,4.832,0,0,0,9.994.5ZM5.331,14.83A4.8,4.8,0,0,0,8.75,13.416l.7-.706a.895.895,0,0,0,0-1.267.917.917,0,0,0-1.267,0l-.705.705a3.043,3.043,0,1,1-4.3-4.3l.705-.705A.9.9,0,1,0,2.618,5.875l-.705.705a4.832,4.832,0,0,0,3.418,8.25Z"
                                                    transform="translate(-0.5 -0.503)"
                                                    strokeWidth="0.3"/>
                                                <path
                                                    d="M9.111,15.208a.9.9,0,0,0,1.267,0l4.817-4.817a.9.9,0,0,0,0-1.267.917.917,0,0,0-1.267,0L9.111,13.941a.9.9,0,0,0,0,1.267Z"
                                                    transform="translate(-4.99 -5.003)"
                                                    strokeWidth="0.3"/>
                                            </g>
                                        </svg>
                                        <svg className={`absolute bottom-1 right-1.5 h-2 w-2`} viewBox="0 0 7.4 7.4">
                                            <path
                                                d="M7.7,4a3.7,3.7,0,1,0,3.7,3.7A3.7,3.7,0,0,0,7.7,4ZM9.265,9.92,7.7,8.976,6.135,9.92l.414-1.78-1.38-1.2,1.82-.155L7.7,5.11l.71,1.678,1.82.155-1.38,1.2Z"
                                                transform="translate(-4 -4)"/>
                                        </svg>
                                    </div>
                                    <span
                                        className={`text-[13.5px] leading-4 font-normal text-[#626262]`}>Point de vente principal</span>
                                    {/*@ts-ignore*/}
                                    <span className={`text-[12px] font-light text-[#afafaf]`}>ID: {merchant.merchantsIds[0]['bank-account'][0].coreBankId}</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                    <button className={`text-[#626262]`}>
                                        <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 rounded-xl shadow-md" align={"end"}>
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <ClipboardList className="mr-2 h-3.5 w-3.5"/>
                                        <span className={`mt-[1.5px]`}>Détails du compte</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                            <div className={`inline-flex flex-col`}>
                                <h3 className={`text-[10px] font-light text-[#afafaf]`}>Compte créditeur</h3>
                                <span className={`text-xs font-medium`}>Compte principal</span>
                            </div>
                            <div className={`flex flex-col justify-end items-end h-full`}>
                                <div
                                    dangerouslySetInnerHTML={{__html: getPointsOfSaleStatusBadge(PointsOfSaleStatus.ACTIVE)}}></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSelectedAccount('1')}
                         className={`snap-end shrink-0 w-[23%] 2xl:w-[20%] bg-white flex flex-col justify-between cursor-pointer ${selectedAccount == '1' && 'outline outline-offset-2 outline-2 outline-[#FFE29C]'} space-y-7 2xl:space-y-7 px-4 pb-4 pt-4 rounded-3xl`}>
                        <div className={`flex justify-between items-start`}>
                            <div>
                                <div className={`inline-flex flex-col`}>
                                    <div
                                        className={`mb-2.5 aspect-square rounded-xl p-2 bg-[#FFE29C] w-[2.56em] h-[2.5rem] inline-flex justify-center items-center relative`}>
                                        <svg className={`h-[1.1rem] fill-[#000] w-auto`} viewBox="0 0 19.227 19.231">
                                            <g transform="translate(0.25 0.252)">
                                                <g transform="translate(0 0)">
                                                    <path
                                                        d="M16.785,3.671A9.043,9.043,0,0,0,11.331.22,9.085,9.085,0,0,0,3.688,1.936,9.1,9.1,0,0,0,.212,7.414c-.086.4-.12.805-.178,1.208-.009.066-.022.13-.034.195v1.1c.049.354.08.712.146,1.062A9.241,9.241,0,0,0,4.589,17.41,8.907,8.907,0,0,0,8.674,18.7a1.032,1.032,0,0,1,.141.03h.976V17.533l-.007.005V14.351h.007V13.5h0V9.836h8.926a9.069,9.069,0,0,0-1.929-6.165M7.846.965l.054.059a.847.847,0,0,0-.15.088,11.5,11.5,0,0,0-2.517,3.2.268.268,0,0,1-.279.168c-.785-.008-1.572,0-2.358,0H2.37A8.626,8.626,0,0,1,7.846.965m1.1.238V4.466H6.093A10.588,10.588,0,0,1,8.943,1.2M1.035,7.516A7.676,7.676,0,0,1,1.8,5.433a.246.246,0,0,1,.168-.121C2.884,5.3,3.8,5.305,4.756,5.305a11.026,11.026,0,0,0-.808,3.681H.81c.075-.5.126-.991.225-1.471M1.858,13.4A8.341,8.341,0,0,1,.847,9.89a.213.213,0,0,1,.009-.05H3.95a10.671,10.671,0,0,0,.808,3.668H4.125c-.688,0-1.378,0-2.066,0a.268.268,0,0,1-.2-.1m.571.935h.585c.664,0,1.329,0,1.993,0a.245.245,0,0,1,.188.091,12.482,12.482,0,0,0,2.634,3.3,8.49,8.49,0,0,1-5.4-3.4m2.364-4.5H8.94V13.5c-.066,0-.125.008-.184.008-.97,0-1.938,0-2.908,0a.237.237,0,0,1-.255-.168,9.8,9.8,0,0,1-.8-3.3c0-.064,0-.13,0-.207m4.151,7.7a10.625,10.625,0,0,1-2.833-3.177H8.944Zm0-8.549h-4.2c.08-.559.117-1.109.247-1.637.159-.646.395-1.275.608-1.908a.217.217,0,0,1,.155-.129c1.043-.008,2.085-.005,3.127,0a.248.248,0,0,1,.059.017ZM16.36,4.474H15.139c-.468,0-.938,0-1.406,0a.247.247,0,0,1-.188-.091A11.969,11.969,0,0,0,10.9,1.032a.5.5,0,0,1-.05-.074A8.64,8.64,0,0,1,16.36,4.474M9.792,1.208a10.578,10.578,0,0,1,2.843,3.254H9.792Zm4.141,7.776H9.785V5.305h2.377c.262,0,.525-.005.785.005a.218.218,0,0,1,.164.092,9.575,9.575,0,0,1,.829,3.516c0,.017-.005.036-.009.066m3.944.005H14.82c-.095-.632-.158-1.262-.292-1.876s-.337-1.2-.512-1.808h1.589c.378,0,.755,0,1.132,0a.229.229,0,0,1,.174.086,8.333,8.333,0,0,1,.975,3.541.446.446,0,0,1-.009.054"
                                                        transform="translate(0 0.001)"
                                                        strokeWidth="8"/>
                                                    <path
                                                        d="M103.625,80.924h-.009a2.616,2.616,0,0,0-1.844.767l-.37.371a.549.549,0,0,0,0,.778.56.56,0,0,0,.775,0l.372-.371a1.519,1.519,0,1,1,2.189,2.107l-.043.043-.372.371a.55.55,0,0,0,.778.776l.37-.371a2.617,2.617,0,0,0,0-3.7,2.634,2.634,0,0,0-1.853-.769"
                                                        transform="translate(-87.921 -70.277)"
                                                        strokeWidth="8"/>
                                                    <path
                                                        d="M84.894,104.418l-.372.372a1.519,1.519,0,0,1-2.189-2.108l.041-.041.37-.37a.549.549,0,1,0-.777-.777l-.37.37a2.617,2.617,0,0,0,1.849,4.468h.011a2.618,2.618,0,0,0,1.843-.766l.37-.371a.551.551,0,0,0,0-.778.561.561,0,0,0-.776,0"
                                                        transform="translate(-70.195 -88)"
                                                        strokeWidth="8"/>
                                                    <path
                                                        d="M99.73,96.547a.56.56,0,0,0-.775,0l-2.531,2.528a.55.55,0,0,0,0,.777h0a.549.549,0,0,0,.777,0l2.531-2.528a.549.549,0,0,0,0-.778"
                                                        transform="translate(-83.598 -83.709)"
                                                        strokeWidth="8"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <span
                                        className={`text-[13.5px] leading-4 font-normal text-[#626262]`}>E-commerce chaussure</span>
                                    {/*@ts-ignore*/}
                                    <span className={`text-[12px] font-light text-[#afafaf]`}>ID: 123397783</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                    <button className={`text-[#626262]`}>
                                        <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 rounded-xl shadow-md" align={"end"}>
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <ClipboardList className="mr-2 h-3.5 w-3.5"/>
                                        <span className={`mt-[1.5px]`}>Détails du compte</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                            <div className={`inline-flex flex-col`}>
                                <h3 className={`text-[10px] font-light text-[#afafaf]`}>Compte créditeur</h3>
                                <span className={`text-xs font-medium`}>Compte e-commerce</span>
                            </div>
                            <div className={`flex flex-col justify-end items-end h-full`}>
                                <div
                                    dangerouslySetInnerHTML={{__html: getPointsOfSaleStatusBadge(PointsOfSaleStatus.ACTIVE)}}></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSelectedAccount('2')}
                         className={`snap-end shrink-0 w-[23%] 2xl:w-[20%] bg-white flex flex-col justify-between cursor-pointer ${selectedAccount == '2' && 'outline outline-offset-2 outline-2 outline-[#FFE29C]'} space-y-7 2xl:space-y-7 px-4 pb-4 pt-4 rounded-3xl`}>
                        <div className={`flex justify-between items-start`}>
                            <div>
                                <div className={`inline-flex flex-col`}>
                                    <div
                                        className={`mb-2.5 aspect-square rounded-xl p-2 bg-[#FFE29C] w-[2.56em] h-[2.5rem] inline-flex justify-center items-center relative`}>
                                        <svg className={`h-[1.1rem] fill-[#000] w-auto`} viewBox="0 0 19.227 19.231">
                                            <g transform="translate(0.25 0.252)">
                                                <g transform="translate(0 0)">
                                                    <path
                                                        d="M16.785,3.671A9.043,9.043,0,0,0,11.331.22,9.085,9.085,0,0,0,3.688,1.936,9.1,9.1,0,0,0,.212,7.414c-.086.4-.12.805-.178,1.208-.009.066-.022.13-.034.195v1.1c.049.354.08.712.146,1.062A9.241,9.241,0,0,0,4.589,17.41,8.907,8.907,0,0,0,8.674,18.7a1.032,1.032,0,0,1,.141.03h.976V17.533l-.007.005V14.351h.007V13.5h0V9.836h8.926a9.069,9.069,0,0,0-1.929-6.165M7.846.965l.054.059a.847.847,0,0,0-.15.088,11.5,11.5,0,0,0-2.517,3.2.268.268,0,0,1-.279.168c-.785-.008-1.572,0-2.358,0H2.37A8.626,8.626,0,0,1,7.846.965m1.1.238V4.466H6.093A10.588,10.588,0,0,1,8.943,1.2M1.035,7.516A7.676,7.676,0,0,1,1.8,5.433a.246.246,0,0,1,.168-.121C2.884,5.3,3.8,5.305,4.756,5.305a11.026,11.026,0,0,0-.808,3.681H.81c.075-.5.126-.991.225-1.471M1.858,13.4A8.341,8.341,0,0,1,.847,9.89a.213.213,0,0,1,.009-.05H3.95a10.671,10.671,0,0,0,.808,3.668H4.125c-.688,0-1.378,0-2.066,0a.268.268,0,0,1-.2-.1m.571.935h.585c.664,0,1.329,0,1.993,0a.245.245,0,0,1,.188.091,12.482,12.482,0,0,0,2.634,3.3,8.49,8.49,0,0,1-5.4-3.4m2.364-4.5H8.94V13.5c-.066,0-.125.008-.184.008-.97,0-1.938,0-2.908,0a.237.237,0,0,1-.255-.168,9.8,9.8,0,0,1-.8-3.3c0-.064,0-.13,0-.207m4.151,7.7a10.625,10.625,0,0,1-2.833-3.177H8.944Zm0-8.549h-4.2c.08-.559.117-1.109.247-1.637.159-.646.395-1.275.608-1.908a.217.217,0,0,1,.155-.129c1.043-.008,2.085-.005,3.127,0a.248.248,0,0,1,.059.017ZM16.36,4.474H15.139c-.468,0-.938,0-1.406,0a.247.247,0,0,1-.188-.091A11.969,11.969,0,0,0,10.9,1.032a.5.5,0,0,1-.05-.074A8.64,8.64,0,0,1,16.36,4.474M9.792,1.208a10.578,10.578,0,0,1,2.843,3.254H9.792Zm4.141,7.776H9.785V5.305h2.377c.262,0,.525-.005.785.005a.218.218,0,0,1,.164.092,9.575,9.575,0,0,1,.829,3.516c0,.017-.005.036-.009.066m3.944.005H14.82c-.095-.632-.158-1.262-.292-1.876s-.337-1.2-.512-1.808h1.589c.378,0,.755,0,1.132,0a.229.229,0,0,1,.174.086,8.333,8.333,0,0,1,.975,3.541.446.446,0,0,1-.009.054"
                                                        transform="translate(0 0.001)"
                                                        strokeWidth="8"/>
                                                    <path
                                                        d="M103.625,80.924h-.009a2.616,2.616,0,0,0-1.844.767l-.37.371a.549.549,0,0,0,0,.778.56.56,0,0,0,.775,0l.372-.371a1.519,1.519,0,1,1,2.189,2.107l-.043.043-.372.371a.55.55,0,0,0,.778.776l.37-.371a2.617,2.617,0,0,0,0-3.7,2.634,2.634,0,0,0-1.853-.769"
                                                        transform="translate(-87.921 -70.277)"
                                                        strokeWidth="8"/>
                                                    <path
                                                        d="M84.894,104.418l-.372.372a1.519,1.519,0,0,1-2.189-2.108l.041-.041.37-.37a.549.549,0,1,0-.777-.777l-.37.37a2.617,2.617,0,0,0,1.849,4.468h.011a2.618,2.618,0,0,0,1.843-.766l.37-.371a.551.551,0,0,0,0-.778.561.561,0,0,0-.776,0"
                                                        transform="translate(-70.195 -88)"
                                                        strokeWidth="8"/>
                                                    <path
                                                        d="M99.73,96.547a.56.56,0,0,0-.775,0l-2.531,2.528a.55.55,0,0,0,0,.777h0a.549.549,0,0,0,.777,0l2.531-2.528a.549.549,0,0,0,0-.778"
                                                        transform="translate(-83.598 -83.709)"
                                                        strokeWidth="8"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <span
                                        className={`text-[13.5px] leading-4 font-normal text-[#626262]`}>App mobile Akwaba</span>
                                    {/*@ts-ignore*/}
                                    <span className={`text-[12px] font-light text-[#afafaf]`}>ID: 123397783</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                    <button className={`text-[#626262]`}>
                                        <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 rounded-xl shadow-md" align={"end"}>
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <ClipboardList className="mr-2 h-3.5 w-3.5"/>
                                        <span className={`mt-[1.5px]`}>Détails du compte</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                            <div className={`inline-flex flex-col`}>
                                <h3 className={`text-[10px] font-light text-[#afafaf]`}>Compte créditeur</h3>
                                <span className={`text-xs font-medium`}>Compte e-commerce</span>
                            </div>
                            <div className={`flex flex-col justify-end items-end h-full`}>
                                <div
                                    dangerouslySetInnerHTML={{__html: getPointsOfSaleStatusBadge(PointsOfSaleStatus.ACTIVE)}}></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSelectedAccount('3')}
                         className={`snap-end shrink-0 w-[23%] 2xl:w-[20%] bg-white flex flex-col justify-between cursor-pointer ${selectedAccount == '3' && 'outline outline-offset-2 outline-2 outline-[#E0AEFF]'} space-y-7 2xl:space-y-7 px-4 pb-4 pt-4 rounded-3xl`}>
                        <div className={`flex justify-between items-start`}>
                            <div>
                                <div className={`inline-flex flex-col`}>
                                    <div
                                        className={`mb-2.5 aspect-square rounded-xl p-2 bg-[#E0AEFF] w-[2.56em] h-[2.5rem] inline-flex justify-center items-center relative`}>
                                        <svg className={`h-[1.1rem] w-auto`} viewBox="0 0 24.079 17.114">
                                            <g transform="translate(0.076 0.097)">
                                                <g transform="translate(0 0)">
                                                    <path
                                                        d="M23.9,12.455a3.036,3.036,0,0,0-1.209-2.627,7.783,7.783,0,0,1-.665-.538c-3.431-2.8-6.971-5.467-10.505-8.137A1.539,1.539,0,0,0,10.487.731a2.319,2.319,0,0,1-1.5-.424A1.893,1.893,0,0,0,6.895.324C4.9,1.492,2.883,2.635.875,3.788a1.43,1.43,0,0,0-.743.829C-.285,6.109.343,7.324,1.193,8.64c.177-.893.309-1.632.472-2.363.24-1.076,1.024-1.359,1.9-.686,3.5,2.688,6.981,5.394,10.492,8.066a4.231,4.231,0,0,1,1.6,2.408,1.047,1.047,0,0,0,1.443.771,6.113,6.113,0,0,0,.821-.393c1.77-.955,3.55-1.894,5.241-2.988.368-.238.776-.488.738-1m-2.066-1.706c-1.708.985-3.418,1.965-5.12,2.96a.671.671,0,0,1-.835-.039c-1.11-.829-9.327-7.212-10.446-8.029-.277-.2-.305-.358.013-.541Q8.111,3.575,10.77,2.039a.466.466,0,0,1,.573.047c1.146.846,9.4,7.244,10.543,8.088.1.076.226.147.226.27-.034.189-.164.239-.278.305"
                                                        transform="translate(0 0)" stroke="#000" strokeWidth="0.2"/>
                                                    <path
                                                        d="M13.895,51.917c.208-.935.375-1.831.614-2.707.151-.551.606-.624,1.127-.223q4.658,3.58,9.311,7.166c.452.348.906.693,1.356,1.044a4.065,4.065,0,0,1,1.322,2.268c.071.255-.062.311-.276.226a2.1,2.1,0,0,1-.291-.175q-5.043-3.051-10.083-6.107a1.794,1.794,0,0,0-1.121-.3,2.52,2.52,0,0,1-1.848-.875.322.322,0,0,1-.111-.312"
                                                        transform="translate(-12.295 -43.139)" stroke="#000"
                                                        strokeWidth="0.2"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <span
                                        className={`text-[13.5px] leading-4 font-normal text-[#626262]`}>Terminal Station Angré 1</span>
                                    {/*@ts-ignore*/}
                                    <span className={`text-[12px] font-light text-[#afafaf]`}>ID: T87997374</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                    <button className={`text-[#626262]`}>
                                        <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 rounded-xl shadow-md" align={"end"}>
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <ClipboardList className="mr-2 h-3.5 w-3.5"/>
                                        <span className={`mt-[1.5px]`}>Détails du compte</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                            <div className={`inline-flex flex-col`}>
                                <h3 className={`text-[10px] font-light text-[#afafaf]`}>Compte créditeur</h3>
                                <span className={`text-xs font-medium`}>Compte Station Angré</span>
                            </div>
                            <div className={`flex flex-col justify-end items-end h-full`}>
                                <div
                                    dangerouslySetInnerHTML={{__html: getPointsOfSaleStatusBadge(PointsOfSaleStatus.INACTIVE)}}></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSelectedAccount('4')}
                         className={`snap-end shrink-0 w-[23%] 2xl:w-[20%] bg-white flex flex-col justify-between cursor-pointer ${selectedAccount == '4' && 'outline outline-offset-2 outline-2 outline-[#E0AEFF]'} space-y-7 2xl:space-y-7 px-4 pb-4 pt-4 rounded-3xl`}>
                        <div className={`flex justify-between items-start`}>
                            <div>
                                <div className={`inline-flex flex-col`}>
                                    <div
                                        className={`mb-2.5 aspect-square rounded-xl p-2 bg-[#E0AEFF] w-[2.56em] h-[2.5rem] inline-flex justify-center items-center relative`}>
                                        <svg className={`h-[1.1rem] w-auto`} viewBox="0 0 24.079 17.114">
                                            <g transform="translate(0.076 0.097)">
                                                <g transform="translate(0 0)">
                                                    <path
                                                        d="M23.9,12.455a3.036,3.036,0,0,0-1.209-2.627,7.783,7.783,0,0,1-.665-.538c-3.431-2.8-6.971-5.467-10.505-8.137A1.539,1.539,0,0,0,10.487.731a2.319,2.319,0,0,1-1.5-.424A1.893,1.893,0,0,0,6.895.324C4.9,1.492,2.883,2.635.875,3.788a1.43,1.43,0,0,0-.743.829C-.285,6.109.343,7.324,1.193,8.64c.177-.893.309-1.632.472-2.363.24-1.076,1.024-1.359,1.9-.686,3.5,2.688,6.981,5.394,10.492,8.066a4.231,4.231,0,0,1,1.6,2.408,1.047,1.047,0,0,0,1.443.771,6.113,6.113,0,0,0,.821-.393c1.77-.955,3.55-1.894,5.241-2.988.368-.238.776-.488.738-1m-2.066-1.706c-1.708.985-3.418,1.965-5.12,2.96a.671.671,0,0,1-.835-.039c-1.11-.829-9.327-7.212-10.446-8.029-.277-.2-.305-.358.013-.541Q8.111,3.575,10.77,2.039a.466.466,0,0,1,.573.047c1.146.846,9.4,7.244,10.543,8.088.1.076.226.147.226.27-.034.189-.164.239-.278.305"
                                                        transform="translate(0 0)" stroke="#000" strokeWidth="0.2"/>
                                                    <path
                                                        d="M13.895,51.917c.208-.935.375-1.831.614-2.707.151-.551.606-.624,1.127-.223q4.658,3.58,9.311,7.166c.452.348.906.693,1.356,1.044a4.065,4.065,0,0,1,1.322,2.268c.071.255-.062.311-.276.226a2.1,2.1,0,0,1-.291-.175q-5.043-3.051-10.083-6.107a1.794,1.794,0,0,0-1.121-.3,2.52,2.52,0,0,1-1.848-.875.322.322,0,0,1-.111-.312"
                                                        transform="translate(-12.295 -43.139)" stroke="#000"
                                                        strokeWidth="0.2"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <span
                                        className={`text-[13.5px] leading-4 font-normal text-[#626262]`}>Terminal Station Man 1</span>
                                    {/*@ts-ignore*/}
                                    <span className={`text-[12px] font-light text-[#afafaf]`}>ID: T829979004</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                    <button className={`text-[#626262]`}>
                                        <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 rounded-xl shadow-md" align={"end"}>
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <ClipboardList className="mr-2 h-3.5 w-3.5"/>
                                        <span className={`mt-[1.5px]`}>Détails du compte</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                            <div className={`inline-flex flex-col`}>
                                <h3 className={`text-[10px] font-light text-[#afafaf]`}>Compte créditeur</h3>
                                <span className={`text-xs font-medium`}>Compte Station Man</span>
                            </div>
                            <div className={`flex flex-col justify-end items-end h-full`}>
                                <div
                                    dangerouslySetInnerHTML={{__html: getPointsOfSaleStatusBadge(PointsOfSaleStatus.ACTIVE)}}></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSelectedAccount('5')}
                         className={`snap-end shrink-0 w-[23%] 2xl:w-[20%] bg-white flex flex-col justify-between cursor-pointer ${selectedAccount == '5' && 'outline outline-offset-2 outline-2 outline-[#E0AEFF]'} space-y-7 2xl:space-y-7 px-4 pb-4 pt-4 rounded-3xl`}>
                        <div className={`flex justify-between items-start`}>
                            <div>
                                <div className={`inline-flex flex-col`}>
                                    <div
                                        className={`mb-2.5 aspect-square rounded-xl p-2 bg-[#E0AEFF] w-[2.56em] h-[2.5rem] inline-flex justify-center items-center relative`}>
                                        <svg className={`h-[1.1rem] w-auto`} viewBox="0 0 24.079 17.114">
                                            <g transform="translate(0.076 0.097)">
                                                <g transform="translate(0 0)">
                                                    <path
                                                        d="M23.9,12.455a3.036,3.036,0,0,0-1.209-2.627,7.783,7.783,0,0,1-.665-.538c-3.431-2.8-6.971-5.467-10.505-8.137A1.539,1.539,0,0,0,10.487.731a2.319,2.319,0,0,1-1.5-.424A1.893,1.893,0,0,0,6.895.324C4.9,1.492,2.883,2.635.875,3.788a1.43,1.43,0,0,0-.743.829C-.285,6.109.343,7.324,1.193,8.64c.177-.893.309-1.632.472-2.363.24-1.076,1.024-1.359,1.9-.686,3.5,2.688,6.981,5.394,10.492,8.066a4.231,4.231,0,0,1,1.6,2.408,1.047,1.047,0,0,0,1.443.771,6.113,6.113,0,0,0,.821-.393c1.77-.955,3.55-1.894,5.241-2.988.368-.238.776-.488.738-1m-2.066-1.706c-1.708.985-3.418,1.965-5.12,2.96a.671.671,0,0,1-.835-.039c-1.11-.829-9.327-7.212-10.446-8.029-.277-.2-.305-.358.013-.541Q8.111,3.575,10.77,2.039a.466.466,0,0,1,.573.047c1.146.846,9.4,7.244,10.543,8.088.1.076.226.147.226.27-.034.189-.164.239-.278.305"
                                                        transform="translate(0 0)" stroke="#000" strokeWidth="0.2"/>
                                                    <path
                                                        d="M13.895,51.917c.208-.935.375-1.831.614-2.707.151-.551.606-.624,1.127-.223q4.658,3.58,9.311,7.166c.452.348.906.693,1.356,1.044a4.065,4.065,0,0,1,1.322,2.268c.071.255-.062.311-.276.226a2.1,2.1,0,0,1-.291-.175q-5.043-3.051-10.083-6.107a1.794,1.794,0,0,0-1.121-.3,2.52,2.52,0,0,1-1.848-.875.322.322,0,0,1-.111-.312"
                                                        transform="translate(-12.295 -43.139)" stroke="#000"
                                                        strokeWidth="0.2"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <span
                                        className={`text-[13.5px] leading-4 font-normal text-[#626262]`}>Terminal Station Angré 2</span>
                                    {/*@ts-ignore*/}
                                    <span className={`text-[12px] font-light text-[#afafaf]`}>ID: T87997374</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                    <button className={`text-[#626262]`}>
                                        <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 rounded-xl shadow-md" align={"end"}>
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <ClipboardList className="mr-2 h-3.5 w-3.5"/>
                                        <span className={`mt-[1.5px]`}>Détails du compte</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                            <div className={`inline-flex flex-col`}>
                                <h3 className={`text-[10px] font-light text-[#afafaf]`}>Compte créditeur</h3>
                                <span className={`text-xs font-medium`}>Compte Station Angré</span>
                            </div>
                            <div className={`flex flex-col justify-end items-end h-full`}>
                                <div
                                    dangerouslySetInnerHTML={{__html: getPointsOfSaleStatusBadge(PointsOfSaleStatus.ACTIVE)}}></div>
                            </div>
                        </div>
                    </div>

                    <div className={`w-1 snap-end`}></div>
                </div>
            </div>
            <div className={`h-full`}>
                <div className={`bg-white flex-grow rounded-3xl h-full`}>
                    <OperationsTable searchItems={searchItems} lang={lang} selectedAccount={selectedAccount}/>
                </div>
            </div>
        </div>
    );
}