"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";
import { format } from "date-fns";

export async function generateQuickPaymentLink(values: any, merchantId: string, token: string) {
    const data = {
        'bankAccountId': values.bankAccountId,
        'firstName': values.firstName,
        'lastName': values.lastName,
        'phoneNumber': values.phoneNumber,
        'email': values.email,
        'amount': values.amount,
        'motif': "Transfert d'argent",
        'expirationDate': format(new Date(), "yyyy-MM-dd"),
    };

    return await fetchData(`/merchants/${merchantId}/quick-payment-link`, 'POST', data, token, true);
}