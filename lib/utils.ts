import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {TransactionsStatus} from "@/components/dashboard/serenity-space/LastTransactions";

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

export function getStatusBadge(transactionStatus: string): string {
    if (transactionStatus == TransactionsStatus.EXPIRED) {
        return `<span class="status-expired font-medium text-[10.5px]">Expiré</span>`;
    } else if (transactionStatus == TransactionsStatus.DONE) {
        return `<span class="status-success font-medium text-[10.5px]">Effectué</span>`;
    } else if (transactionStatus == TransactionsStatus.REJECTED) {
        return `<span class="status-rejected font-medium text-[10.5px]">Échoué</span>`;
    } else {
        return `<span class="status-pending font-medium text-[10.5px]">En cours</span>`;
    }
}

export function formatDate(dateString: string, lang: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return '-';
    }

    const day = String(date.getDate());
    const month = date.toLocaleString(lang, { month: 'short' })
    const year = date.getFullYear();

    const currentYear = new Date().getFullYear();

    // if (year === currentYear) {
    //     return `${day} ${month} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    // } else {
        return `${day} ${month} ${year} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    // }
}
