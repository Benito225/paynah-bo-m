"use client"

import {IUser} from "@/core/interfaces/user";
import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {X} from "lucide-react";
import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {ScaleLoader} from "react-spinners";
import {addAccount} from "@/core/apis/bank-account";

interface AccountsActionProps {
    lang: string,
    mode: string,
    merchant: IUser,
    children: React.ReactNode,
    isAccountActionLoading: boolean,
    setAccountActionLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function AccountsAction({lang, merchant, children, mode, isAccountActionLoading, setAccountActionLoading}: AccountsActionProps) {
    const [open, setOpen] = useState(false);

    const formSchema = z.object({
        name: z.string().min(2),
        type: z.string().min(2),
        isMain: z.boolean(),
    })

    const AccountsActionAddForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            isMain: false,
            type: "PAY-DEP",
        }
    });

    async function onSubmitAccountsAddAction(values: z.infer<typeof formSchema>) {
        console.log(values);
        setAccountActionLoading(true);

        addAccount(values, String(merchant.merchantsIds[0].id), String(merchant.accessToken))
            .then((res) => {
                if (res.success) {
                    setAccountActionLoading(false);
                    setOpen(false);
                    toast.error('Compte ajouté avec succès !', {
                        className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
                    });
                } else {
                    console.log(res);
                    setAccountActionLoading(false);
                    return toast.error(res.message, {
                        className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
                    });
                }
            }).catch(err => {
            setAccountActionLoading(false);
            return toast.error('Une erreur est survénue', {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        });
    }

    function resetModal() {
        AccountsActionAddForm.reset();
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className={`sm:max-w-[38rem] overflow-y-hidden overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
                <div>
                    <div className={`rounded-t-2xl bg-white px-8 pb-4 pt-5`}>
                        <div className={`flex justify-between items-center space-x-3`}>
                            <h2 className={`text-base text-[#626262] font-medium`}>{`Ajouter un compte`}</h2>
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
                        <Form {...AccountsActionAddForm}>
                            <form onSubmit={AccountsActionAddForm.handleSubmit(onSubmitAccountsAddAction)}
                                  className={``}>
                                <div className={`flex flex-col items-center gap-6 mb-5`}>
                                    <div className={`w-full`}>
                                        <FormField
                                            control={AccountsActionAddForm.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl className={''}>
                                                        <div>
                                                            <div className={`inline-flex space-x-3 mb-1.5`}>
                                                                <h3 className={`text-sm font-medium`}>Nom du
                                                                    compte</h3>
                                                            </div>
                                                            <Input type={`text`}
                                                                   className={`font-light text-sm`}
                                                                   placeholder="Entrez le nom du compte" {...field}
                                                                   style={{
                                                                       backgroundColor: field.value ? '#fff' : '#EAEAEA',
                                                                   }}/>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`inline-flex items-center text-sm italic font-medium space-x-1.5 mt-2`}>
                                        <svg className={`w-5 h-auto`} viewBox="0 0 16.178 16.175">
                                            <defs>
                                                <clipPath id="clip-pathInfo">
                                                    <rect width="16.178" height="16.175" fill="none"/>
                                                </clipPath>
                                            </defs>
                                            <g clipPath="url(#clip-pathInfo)">
                                                <path
                                                    d="M16.179,8.1A8.089,8.089,0,1,1,8.1,0a8.082,8.082,0,0,1,8.076,8.1m-1,.015a7.085,7.085,0,1,0-6.954,7.064,7.082,7.082,0,0,0,6.954-7.064"
                                                    transform="translate(0 0)"/>
                                                <path
                                                    d="M180.048,191.318c-.132.117-.269.228-.394.351-.108.106-.218.18-.368.1a.27.27,0,0,1-.114-.363,4.43,4.43,0,0,1,.307-.716A2.747,2.747,0,0,1,180.6,189.6a1.175,1.175,0,0,1,1.658.442,1.437,1.437,0,0,1,.144.623c.014,1.057.006,2.113.006,3.17v.274c.185-.166.338-.3.484-.436a.263.263,0,0,1,.451.23,1.032,1.032,0,0,1-.031.147,2.985,2.985,0,0,1-.881,1.371,1.963,1.963,0,0,1-.939.515,1.148,1.148,0,0,1-1.392-1.123c0-1.1,0-2.191,0-3.287v-.179l-.046-.026"
                                                    transform="translate(-173.155 -183.094)"/>
                                                <path
                                                    d="M196.607,100.237a1.221,1.221,0,1,1,1.206,1.23,1.218,1.218,0,0,1-1.206-1.23"
                                                    transform="translate(-190.032 -95.713)"/>
                                            </g>
                                        </svg>
                                        <span>Conseils utiles</span>
                                    </div>
                                    <ul className={`flex font-light text-sm flex-col italic mt-1.5`}>
                                        <li>- Utilisez un nom significatif</li>
                                        <li>- Soyez bref en ne saisissant que 22 caractères au maximum</li>
                                        <li>- Évitez des caractères complexe</li>
                                    </ul>
                                </div>
                                <div className={`flex justify-center items-center`}>
                                    <Button type={"submit"}
                                            className={`mt-8 w-40 text-sm`} disabled={isAccountActionLoading}>
                                        {isAccountActionLoading ?
                                            <ScaleLoader color="#fff" height={15} width={3}/> : `Confirmer`}
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