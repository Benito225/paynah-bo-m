"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";

export async function getMerchantBeneficiaries(merchantId: string, token: string) {
    const resData = await fetchData(`/merchants/${merchantId}/beneficiaries`, 'GET', null, token, true);
    console.log(resData);
    console.log(token);
    return resData.data;
}

export async function addBeneficiary(values: any, merchantId: string, token: string) {
    // const data = {
    //     'firstName': values.firstName,
    //     'lastName': values.lastName,
    //     'email': values.email,
    //     'paynahAccountNumber': values.paynahAccountNumber,
    //     'operator': values.operator,
    //     'number': values.number,
    //     'bankAccount': values.bankAccount,
    // };

    delete values.type;

    // console.log(values);

    return await fetchData(`/merchants/${merchantId}/beneficiaries`, 'POST', values, token, true);
}