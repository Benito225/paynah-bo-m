import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCFA(amount: number) {
  const formattedAmount = amount.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' });

  return formattedAmount;
}

export function hiddeBalance(amount: string) {
    const amountToString = `${amount}`;
    return amountToString.replace(/./g, '*');
}
