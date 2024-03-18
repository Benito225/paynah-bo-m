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
        return `<span class="status-expired font-light text-[10.5px]">Expiré</span>`;
    } else if (transactionStatus == TransactionsStatus.DONE) {
        return `<span class="status-success font-light text-[10.5px]">Effectué</span>`;
    } else if (transactionStatus == TransactionsStatus.REJECTED) {
        return `<span class="status-rejected font-light text-[10.5px]">Échoué</span>`;
    } else {
        return `<span class="status-pending font-light text-[10.5px]">En cours</span>`;
    }
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return '-';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
}
