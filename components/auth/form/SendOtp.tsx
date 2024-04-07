"use client"
import {Locale} from "@/i18n.config";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {useRouter} from "next13-progressbar";
import {sendOtp} from "@/core/apis/login";
import {useCookies} from "react-cookie";
import {ScaleLoader} from "react-spinners";

interface AuthSendOtpFormProps {
    lang: Locale
}

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Le champ Email est requis"
    }).email({message: "Le champ doit être un email"}),
})

export default function AuthSendOtpForm({ lang }: AuthSendOtpFormProps) {

    const [isLoading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);

    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['username']);

    const sendOtpForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        }
    });

    const errorsArray = Object.values(sendOtpForm.formState.errors);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const sendOtpRes = await sendOtp(values);

        if (!sendOtpRes.success) {
            setLoading(false);
            setShowConError(true);

            removeCookie('username');

            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1500);

            return toast.error(sendOtpRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        } else {
            setShowConError(false);
            setShowError(false);

            setCookie('username', sendOtpRes.data);

            router.push(Routes.auth.validateOtp.replace('{lang}', lang));
        }
    }

    return (
        <div>
            <div className={`px-4 md:px-16 mb-[8.5rem] md:mb-[10.5rem]`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div className={`${showError ? 'animate-rotation-left' : 'animate-rotation-right'}`}>
                        <svg className={`w-5 h-5 ${showError && 'fill-[#ff0000]'}`} viewBox="0 0 21.656 27.07">
                            <path
                                d="M14.828,16.889a1.354,1.354,0,0,0-1.354,1.354V22.3a1.354,1.354,0,0,0,2.707,0V18.242A1.354,1.354,0,0,0,14.828,16.889ZM21.6,11.475V8.768a6.768,6.768,0,1,0-13.535,0v2.707A4.061,4.061,0,0,0,4,15.535V25.01A4.061,4.061,0,0,0,8.061,29.07H21.6a4.061,4.061,0,0,0,4.061-4.061V15.535A4.061,4.061,0,0,0,21.6,11.475ZM10.768,8.768a4.061,4.061,0,1,1,8.121,0v2.707H10.768ZM22.949,25.01A1.354,1.354,0,0,1,21.6,26.363H8.061A1.354,1.354,0,0,1,6.707,25.01V15.535a1.354,1.354,0,0,1,1.354-1.354H21.6a1.354,1.354,0,0,1,1.354,1.354Z"
                                transform="translate(-4 -2)"/>
                        </svg>
                    </div>
                    <div>
                        {/*{showConError && (*/}
                        {/*    <p className={`text-xs text-[#e00000]`}>{`Cet identifiant ne correspond à aucun compte, réessayez !`}</p>*/}
                        {/*)}*/}
                        {/*{errorsArray.length > 0 && (*/}
                        {/*    <div className={`text-center`}>*/}
                        {/*        <ul className={`text-xs text-[#e00000]`}>*/}
                        {/*            {errorsArray.map((error, index) => (*/}
                        {/*                <li key={index}>{error.message}</li>*/}
                        {/*            ))}*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                </div>

                <div>
                    <Form {...sendOtpForm}>
                        <form onSubmit={sendOtpForm.handleSubmit(onSubmit)} className="space-y-5">
                            <div className={`grid grid-cols-6 gap-4 relative`}>
                                <div className={`col-span-5 md:col-span-6`}>
                                    <FormField
                                        control={sendOtpForm.control}
                                        name="username"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                               placeholder="E-mail" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                                {/*<FormMessage className={`text-xs`}/>*/}
                                            </FormItem>
                                        )}
                                    />
                                    <p className={`text-xs md:text-sm`}>Plus la peine, <Link href={Routes.auth.login.replace("{lang}", lang)} className={`text-xs md:text-sm font-medium hover:font-semibold inline-block mt-3 duration-100`}>{`J'ai retrouvé ma clé`}</Link></p>
                                </div>

                                <div className={`col-span-1 text-center`}>
                                    <Button type={`submit`} className={`!mb-1 h-[3.3rem] w-[3.3rem] md:absolute md:top-[0] md:right-[-4.2rem]`} disabled={isLoading}>
                                        {isLoading ? <ScaleLoader color="#fff" height={10} width={2} /> : <svg className={`fill-white h-5 w-6 stroke-white`} viewBox="0 0 35.108 27.574">
                                            <path d="M22.5,5.664a1.413,1.413,0,0,0,0,2l8.889,8.89H4.663a1.413,1.413,0,1,0,0,2.825H31.388L22.5,28.266a1.413,1.413,0,0,0,2,2l11.3-11.3a1.413,1.413,0,0,0,0-2L24.5,5.664A1.413,1.413,0,0,0,22.5,5.664Z" transform="translate(-2.25 -4.104)" strokeWidth="2.5" fillRule="evenodd"/>
                                        </svg>}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}