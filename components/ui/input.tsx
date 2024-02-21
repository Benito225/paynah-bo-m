import * as React from "react"

import { cn } from "@/lib/utils"
import {useFormField} from "@/components/ui/form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        const {error, formItemId} = useFormField()

        return (
            <input
                type={type}
                className={cn(
                    `${error && "!border-[#e95d5d]"} flex h-[3.3rem] w-full rounded-xl bg-[#f0f0f0] focus:bg-white border border-[#f0f0f0] px-5 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#626262] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
