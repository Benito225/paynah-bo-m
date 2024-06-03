"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";
import { format, formatISO } from "date-fns";

const INIT_PAYOUT_DESC = "Envoi d'argent";
const GET_PAY_LINK_DESC = "Collecte de fonds";

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
        'firstName': !values.firstName ? 'Destinataire' : values.firstName,
        'lastName': !values.lastName ? 'QuickPayment' : values.lastName,
        'email': values.email ?? '',
        'amount': values.amount,
        'motif': GET_PAY_LINK_DESC,
        'expirationDate': formatISO(new Date()),
    };

    if (!values.email) {
        delete data.email;
    }

    console.log(data);
    return await fetchData(`/merchants/${merchantId}/quick-payment-link`, 'POST', data, token, true);
}

export async function initPayout(values: any, merchantId: string, token: string) {
    let data: any;

    if (values.mode == 'direct') {
        data = {
            'bankAccountId': values.bankAccountId,
            'firstName': values.firstName == '' ? values.paynahAccount : values.firstName,
            'lastName': values.lastName == '' ? 'Bénéficiaire' : values.lastName,
            'paynahAccount': values.paynahAccount,
            'amount': values.amount,
            'description': INIT_PAYOUT_DESC,
            'mode': getPayoutModeSendToAPI(values.mode),
            'feeSupport': values.feeSupport
        };
    } else if (values.mode == 'mm') {
        data = {
            'bankAccountId': values.bankAccountId,
            'firstName': values.firstName == '' ? values.phoneNumber : values.firstName,
            'lastName': values.lastName == '' ? 'Bénéficiaire' : values.lastName,
            'operator': values.operator,
            'phoneNumber': values.phoneNumber,
            'amount': values.amount,
            'description': INIT_PAYOUT_DESC,
            'mode': getPayoutModeSendToAPI(values.mode),
            'feeSupport': values.feeSupport,
        };
    } else {
        data = {
            'bankAccountId': values.bankAccountId,
            'firstName': values.firstName == '' ? values.bankAccount : values.firstName,
            'lastName': values.lastName == '' ? 'Bénéficiaire' : values.lastName,
            'bankAccount': values.bankAccount,
            'amount': values.amount,
            'description': INIT_PAYOUT_DESC,
            'mode': getPayoutModeSendToAPI(values.mode),
            'feeSupport': values.feeSupport,
        }
    }

    console.log(data);
    return fetchData(`/merchants/${merchantId}/payout`, 'POST', data, token, true);
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