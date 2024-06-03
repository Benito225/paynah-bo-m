"use client"

import {IUser} from "@/core/interfaces/user";
import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {PlusCircle, SquarePen, X} from "lucide-react";
import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {isPhoneValid} from "@/components/auth/form/AddMerchant";
import {PhoneInput} from "react-international-phone";
import Link from "next/link";
import {ScaleLoader} from "react-spinners";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {IAccount} from "@/core/interfaces/account";

interface AddOnlinePointOfSaleProps {
    lang: string,
    merchant: IUser,
    children: React.ReactNode,
    bankAccountsRes?: any
}

export default function AddOnlinePointOfSale({lang, merchant, children, bankAccountsRes}: AddOnlinePointOfSaleProps) {
    const [showErrorPhone, setShowErrorPhone] = useState(false);

    const [isEndStep, setIsEndStep] = useState(false);

    function nextStep() {

    }

    const accounts: IAccount[] = bankAccountsRes?.accounts ?? [];
    // console.log(bankAccountsRes);

    const formSchema = z.object({
        name: z.string().min(2),
        account: z.string().min(2),
    })

    const AddPointOfSaleForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            account: "",
        }
    });

    async function onSubmitAddOnlinePointOfSale(values: z.infer<typeof formSchema>) {
        console.log(values);

        nextStep();
    }

    function resetModal() {
        AddPointOfSaleForm.reset();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className={`sm:max-w-[38rem] overflow-y-hidden overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
                <div>
                    <div className={`rounded-t-2xl bg-white px-8 pb-4 pt-5`}>
                        <div className={`flex justify-between items-center space-x-3`}>
                            <h2 className={`text-base text-[#626262] font-medium`}>{`Ajouter un point de vente en ligne`}</h2>
                            <DialogClose onClick={() => {
                                resetModal()
                            }}>
                                <X strokeWidth={2.4} className={`text-[#767676] h-5 w-5`}/>
                            </DialogClose>
                        </div>
                    </div>
                </div>
                <div className={`min-h-[6rem] pt-2 pb-5 px-8`}>
                    <div className={``}>
                        <Form {...AddPointOfSaleForm}>
                            <form onSubmit={AddPointOfSaleForm.handleSubmit(onSubmitAddOnlinePointOfSale)}
                                  className={``}>
                                <div className={`flex flex-col items-center gap-6 mb-5`}>
                                    <div className={`w-full`}>
                                        <FormField
                                            control={AddPointOfSaleForm.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl className={''}>
                                                        <div>
                                                            <div className={`inline-flex space-x-3 mb-1.5`}>
                                                                <h3 className={`text-sm font-medium`}>Nom du point de vente en ligne</h3>
                                                            </div>
                                                            <Input type={`text`}
                                                                   className={`font-light text-sm`}
                                                                   placeholder="Entrez le nom" {...field}
                                                                   style={{
                                                                       backgroundColor: field.value ? '#fff' : '#EAEAEA',
                                                                   }}/>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className={`w-full`}>
                                        <FormField
                                            control={AddPointOfSaleForm.control}
                                            name="account"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div>
                                                            <div className={`inline-flex space-x-3 mb-2`}>
                                                                <h3 className={`text-sm font-medium`}>Compte créditeur
                                                                    du point de vente en ligne</h3>
                                                            </div>
                                                            <Select onValueChange={(value) => {
                                                                field.onChange(value);
                                                            }} defaultValue={''}>
                                                                <SelectTrigger className={`w-full px-4 font-light text-sm`}
                                                                               style={{
                                                                                   backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                               }}>
                                                                    <SelectValue
                                                                        placeholder="Choisissez le compte créditeur"/>
                                                                </SelectTrigger>
                                                                <SelectContent className={`z-[999] bg-[#f0f0f0]`}>
                                                                    {accounts.map((account: IAccount, index) => (
                                                                        <SelectItem key={account.id}
                                                                                    className={`font-normal text-sm px-7 focus:bg-gray-100`}
                                                                                    value={account.id}>
                                                                            {account.name ? account.name : (account.isMain ? 'Compte Principal' : 'Compte')}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className={`flex justify-center items-center`}>
                                    <Button type={"submit"}
                                            className={`mt-3 w-48 text-sm`}>
                                        {`Ajouter`}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}