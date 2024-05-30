"use server"

import {fetchData} from "@/lib/api";

export async function getMerchantBankAccounts(merchantId: string, token: string) {
    const resData = await fetchData("/merchants/"+merchantId+"/bank-accounts", 'GET', null, token, true);
    console.log("resData", resData);
    return resData.data;
}

export async function addAccount(values: any, merchantId: string, token: string) {
    const resData = await fetchData("/merchants/"+merchantId+"/bank-accounts", "POST", values, token, true);
    console.log("resData", resData);
    return resData;
}

export async function editAccount(values: any, merchantId: string, bankAccountId: string, token: string) {
    const url = "/merchants/"+merchantId+"/bank-accounts/"+bankAccountId;
    console.log("editURL", url);
    return await fetchData(url, "PUT", values, token, true);
}
