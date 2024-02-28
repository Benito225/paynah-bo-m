"use client"

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


interface SignUpCountryChoiceProps {
    showError: boolean,
    errorsArray: any[],
    stepOne: any,
    showConError: boolean,
    lang: string,
    onSubmit: any,
}

export default function SignUpCountryChoice({ showError, errorsArray, stepOne, showConError, lang, onSubmit }: SignUpCountryChoiceProps) {

    return (
        <div className={`formContainer mx-auto max-w-lg`}>
            <div className={`text-center mb-28`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Sélectionnez votre pays</h2>
            </div>
            <div className={`px-4 md:px-16 mb-[8.5rem] md:mb-[10.5rem]`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div>
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
                    <Form {...stepOne}>
                        <form onSubmit={stepOne.handleSubmit(onSubmit)} className="space-y-5">
                            <div className={`grid grid-cols-6 gap-4 relative`}>
                                <div className={`col-span-5 md:col-span-6`}>
                                    <FormField
                                        control={stepOne.control}
                                        name="country"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        {/*<Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                                                        {/*       placeholder="E-mail" {...field} style={{*/}
                                                        {/*    backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                                                        {/*}} />*/}
                                                        {/*stepOne.formState.errors.country?.message*/}
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className={`w-full ${stepOne.formState.errors.country?.message && "!border-[#e95d5d]"} px-4 font-light text-sm ${showConError && "border-[#e95d5d]"}`} style={{
                                                                backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                            }}>
                                                                <SelectValue  placeholder="Choisir un pays"/>
                                                            </SelectTrigger>
                                                            <SelectContent className={`bg-[#f0f0f0]`}>
                                                                <SelectItem className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`} value="Côte d'Ivoire">
                                                                    <div className={`inline-flex items-center space-x-2.5`}>
                                                                        <svg className={`w-7`} viewBox="0 0 38 25">
                                                                            <defs>
                                                                                <clipPath id="clip-path">
                                                                                    <rect width="38" height="25" rx="3" transform="translate(0 -0.061)" fill="#fff"/>
                                                                                </clipPath>
                                                                            </defs>
                                                                            <g transform="translate(0 0.061)" clipPath="url(#clip-path)">
                                                                                <g transform="translate(0.554 0.333)">
                                                                                    <path d="M0,4.5H36.765V29.009H0Z" transform="translate(0 -4.5)" fill="#f0f0f0"/>
                                                                                    <path d="M17.413,4.5H30.467V29.01H17.413Z" transform="translate(6.298 -4.5)" fill="#6da544"/>
                                                                                    <path d="M0,4.5H13.054V29.01H0Z" transform="translate(0 -4.5)" fill="#ff9811"/>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        <span className={`mt-[2px]`}>{`Côte d'Ivoire`}</span>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem className={`h-[3.1rem] font-light focus:bg-gray-100 cursor-pointer`} value="Bénin">
                                                                    <div className={`inline-flex items-center space-x-2.5`}>
                                                                        <svg className={`w-7`} viewBox="0 0 38 24">
                                                                            <defs>
                                                                                <clipPath id="clip-path">
                                                                                    <rect width="38" height="24" rx="3" transform="translate(0 0)" fill="#fff"/>
                                                                                </clipPath>
                                                                            </defs>
                                                                            <g transform="translate(0 0)" clipPath="url(#clip-path)">
                                                                                <g transform="translate(0.554 -0.157)">
                                                                                    <path d="M0,4.5H36.766V29.01H0Z" transform="translate(0 -4.5)" fill="#6da544"/>
                                                                                    <path d="M10.37,4.5H33.015V16.755H10.37Z" transform="translate(3.751 -4.5)" fill="#ffda44"/>
                                                                                    <path d="M10.37,13.5H33.015V25.755H10.37Z" transform="translate(3.751 -1.245)" fill="#d80027"/>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        <span className={`mt-[2px]`}>{`Bénin`}</span>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem className={`h-[3.1rem] font-light focus:bg-gray-100 cursor-pointer`} value="Cameroun">
                                                                    <div
                                                                        className={`inline-flex items-center space-x-2.5`}>
                                                                        <svg className={`w-7`} viewBox="0 0 38 24">
                                                                            <defs>
                                                                                <clipPath id="clip-path">
                                                                                    <rect width="38" height="24" rx="3"
                                                                                          transform="translate(0 -0.03)"
                                                                                          fill="#fff"/>
                                                                                </clipPath>
                                                                            </defs>
                                                                            <g transform="translate(0 0.03)"
                                                                               clipPath="url(#clip-path)">
                                                                                <g transform="translate(0.554 0.088)">
                                                                                    <path d="M0,4.5H36.765V29.01H0Z"
                                                                                          transform="translate(0 -4.5)"
                                                                                          fill="#d80027"/>
                                                                                    <path d="M0,4.5H12.255V29.01H0Z"
                                                                                          transform="translate(0 -4.5)"
                                                                                          fill="#496e2d"/>
                                                                                    <path
                                                                                        d="M20.58,4.5H32.835V29.01H20.58Zm-6.128,8.845.846,2.6h2.739l-2.216,1.61.846,2.605-2.216-1.61-2.216,1.61.847-2.605-2.216-1.61h2.739Z"
                                                                                        transform="translate(3.93 -4.5)"
                                                                                        fill="#ffda44"/>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        <span className={`mt-[2px]`}>{`Cameroun`}</span>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem className={`h-[3.1rem] font-light focus:bg-gray-100 cursor-pointer`} value="Guinée">
                                                                    <div className={`inline-flex items-center space-x-2.5`}>
                                                                        <svg className={`w-7`} viewBox="0 0 38 24">
                                                                            <defs>
                                                                                <clipPath id="clip-path">
                                                                                    <rect width="38" height="24" rx="3" transform="translate(0 -0.242)" fill="#fff"/>
                                                                                </clipPath>
                                                                            </defs>
                                                                            <g transform="translate(0 0.242)" clipPath="url(#clip-path)">
                                                                                <g transform="translate(0.554 -0.573)">
                                                                                    <path id="Tracé_36" data-name="Tracé 36" d="M0,4.5H36.765V29.009H0Z" transform="translate(0 -4.5)" fill="#ffda44"/>
                                                                                    <path id="Tracé_37" data-name="Tracé 37" d="M17.413,4.5H30.467V29.01H17.413Z" transform="translate(6.298 -4.5)" fill="#6da544"/>
                                                                                    <path id="Tracé_38" data-name="Tracé 38" d="M0,4.5H13.054V29.01H0Z" transform="translate(0 -4.5)" fill="#d80027"/>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        <span className={`mt-[2px]`}>{`Guinée`}</span>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem className={`h-[3.1rem] font-light focus:bg-gray-100 cursor-pointer`} value="Sénégal">
                                                                    <div className={`inline-flex items-center space-x-2.5`}>
                                                                        <svg className={`w-7`} viewBox="0 0 38 24">
                                                                            <defs>
                                                                                <clipPath id="clip-path">
                                                                                    <rect width="38" height="24" rx="3" transform="translate(0 -0.273)" fill="#fff"/>
                                                                                </clipPath>
                                                                            </defs>
                                                                            <g transform="translate(0 0.273)" clipPath="url(#clip-path)">
                                                                                <g transform="translate(0.554 -0.328)">
                                                                                    <path d="M0,4.5H36.765V29.009H0Z" transform="translate(0 -4.5)" fill="#ffda44"/>
                                                                                    <path d="M17.413,4.5H30.467V29.01H17.413Z" transform="translate(6.298 -4.5)" fill="#d80027"/>
                                                                                    <path d="M0,4.5H13.054V29.01H0Zm18.382,7.992,1.058,3.256h3.424l-2.77,2.013,1.058,3.256L18.382,19l-2.77,2.012,1.058-3.256L13.9,15.748h3.424Z" transform="translate(0 -4.5)" fill="#496e2d"/>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        <span className={`mt-[2px]`}> {`Sénégal`}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className={`col-span-1 text-center`}>
                                    <Button type={`submit`} className={`!mb-1 h-[3.3rem] w-[3.3rem] col-span-1 md:absolute md:top-[0] md:right-[-4.2rem]`}>
                                        <svg className={`fill-white h-5 w-6 stroke-white`} viewBox="0 0 35.108 27.574">
                                            <path d="M22.5,5.664a1.413,1.413,0,0,0,0,2l8.889,8.89H4.663a1.413,1.413,0,1,0,0,2.825H31.388L22.5,28.266a1.413,1.413,0,0,0,2,2l11.3-11.3a1.413,1.413,0,0,0,0-2L24.5,5.664A1.413,1.413,0,0,0,22.5,5.664Z" transform="translate(-2.25 -4.104)" strokeWidth="2.5" fillRule="evenodd"/>
                                        </svg>
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