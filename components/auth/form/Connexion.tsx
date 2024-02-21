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

interface AuthFormConnexionProps {
    lang: Locale
}

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Le champ Identifiant est requis"
    }).email({message: "Le champ Identifiant doit être un email"}),
    password: z.string().min(1, {
        message: "Le champ Clé d'accès est requis"
    })
})

export default function AuthFormConnexion({ lang }: AuthFormConnexionProps) {

    const [isLoading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const connexionForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const errorsArray = Object.values(connexionForm.formState.errors);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setLoading(true);

        setShowConError(true);

        // if (errorsArray.length > 0) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1500);
        // }

        // const res = await signIn("client", {
        //     username: values.username,
        //     password: values.password,
        //     redirect: false
        // });

        // if (res?.error) {
        //     setLoading(false);
        //     return toast.error(res.error, {
        //         className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
        //     });
        // }
    }

    return (
        <div>
            <div className={`px-16 py-5 bg-white border border-[#ededed] rounded-3xl`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div className={`${showError ? 'animate-rotation-left' : 'animate-rotation-right'}`}>
                        <svg className={`w-5 h-5 ${showError && 'fill-[#ff0000]'}`} viewBox="0 0 21.656 27.07">
                            <path
                                d="M14.828,16.889a1.354,1.354,0,0,0-1.354,1.354V22.3a1.354,1.354,0,0,0,2.707,0V18.242A1.354,1.354,0,0,0,14.828,16.889ZM21.6,11.475V8.768a6.768,6.768,0,1,0-13.535,0v2.707A4.061,4.061,0,0,0,4,15.535V25.01A4.061,4.061,0,0,0,8.061,29.07H21.6a4.061,4.061,0,0,0,4.061-4.061V15.535A4.061,4.061,0,0,0,21.6,11.475ZM10.768,8.768a4.061,4.061,0,1,1,8.121,0v2.707H10.768ZM22.949,25.01A1.354,1.354,0,0,1,21.6,26.363H8.061A1.354,1.354,0,0,1,6.707,25.01V15.535a1.354,1.354,0,0,1,1.354-1.354H21.6a1.354,1.354,0,0,1,1.354,1.354Z"
                                transform="translate(-4 -2)"/>
                        </svg>
                    </div>
                    <div>
                        {showConError && (
                            <p className={`text-xs text-[#e00000]`}>{`Identifiant ou clé d'accès Incorrect, réessayez !`}</p>
                        )}
                        {errorsArray.length > 0 && (
                            <div className={`text-center`}>
                                <ul className={`text-xs text-[#e00000]`}>
                                    {errorsArray.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Form {...connexionForm}>
                        <form onSubmit={connexionForm.handleSubmit(onSubmit)} className="space-y-5">
                            <div className={`grid grid-cols-1 gap-4`}>
                                <div>
                                    <FormField
                                        control={connexionForm.control}
                                        name="username"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                               placeholder="Identifiant" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                                {/*<FormMessage className={`text-xs`}/>*/}
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={connexionForm.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className={`relative`}>
                                                        <Input className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`} type={showPassword ? 'text' : 'password'}
                                                               placeholder="Clé d'accès" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                        <svg onClick={handleTogglePassword} className={`h-6 w-6 cursor-pointer ${showPassword ? 'fill-[#414141]' : 'fill-[#c1c1c1]'}  absolute top-4 right-4`} viewBox="0 0 28.065 19.104">
                                                            <g transform="translate(0.325) rotate(1)">
                                                                <path d="M0,0H18.622V18.622H0Z" transform="translate(0.539)" fill="none"/>
                                                                <g transform="matrix(1, -0.017, 0.017, 1, 5.314, 18.08)">
                                                                    <path d="M0,0H0Z" transform="translate(0 -3.249)" fill="none"/>
                                                                    <path d="M12.917,15.748a5.622,5.622,0,1,0,0,3.748h4.076v3.748h3.748V19.5h1.874V15.748ZM7.622,19.5A1.874,1.874,0,1,1,9.5,17.622,1.874,1.874,0,0,1,7.622,19.5Z" transform="translate(-7.063 -26.436)"/>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </FormControl>
                                                {/*<FormMessage className={`text-xs`}/>*/}
                                            </FormItem>
                                        )}
                                    />

                                    <Link href={Routes.auth.sendOtp.replace("{lang}", lang)} className={`text-sm hover:font-medium inline-block mt-3 duration-100`}>{`J'ai perdu ma clé`}</Link>
                                </div>
                            </div>
                            <Button type={`submit`} className={`w-full !mb-1`}>
                                Déverouiller
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}