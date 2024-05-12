"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";
import { format, formatISO } from "date-fns";

const INIT_PAYOUT_DESC = "Envoi d'argent";

export async function generatePaymentLinkToShare(values: any, merchantId: string, token: string) {
    const data = {
        'bankAccountId': values.bankAccountId,
        'firstName': values.firstName,
        'lastName': values.lastName,
        'phoneNumber': "+2250759958400", // optional parameter
        'email': values.email,
        'amount': values.amount,
        'motif': "Collecte de fonds",
        'canal': getCanalToPaymentLink(values.phoneNumber, values.email),
        'expirationDate': formatISO(new Date()),
    };
    console.log(data);
    return await fetchData(`/merchants/${merchantId}/payment-link/generate`, 'POST', data, token, true);
}

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

export async function initPayout(values: any, merchantId: string, token: string) {
    const data = {
        'bankAccountId': values.bankAccountId,
        'firstName': values.firstName,
        'lastName': values.lastName,
        'operator': values.operator,
        'phoneNumber': values.phoneNumber,
        'paynahAccount': values.paynahAccount,
        'bankAccount': values.bankAccount,
        'amount': values.amount,
        'description': INIT_PAYOUT_DESC,
        'mode': getPayoutModeSendToAPI(values.mode),
        'feeSupport': false,
    };
    console.log(data)
    return await fetchData(`/merchants/${merchantId}/quick-payout`, 'POST', data, token, true);
}

const getPayoutModeSendToAPI = (activeSendMode: string) => {
    let mode = 0;
    switch (activeSendMode) {
        case "direct":
            mode = 1
            break;
        case "mm":
            mode = 2
            break;
        case "bank":
            mode = 3
            break;
        default:
            break;
        }
    return mode;
}

const getCanalToPaymentLink = (phoneNumber: string, email: string) => {
    let mode = 'SMS';
    if (email.trim().length > 0) {
        mode = 'EMAIL';
    }
    if (phoneNumber.trim().length > 0) {
        mode = 'SMS';
    }
    return mode;
}