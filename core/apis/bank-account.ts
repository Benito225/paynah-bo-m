"use server"

import {fetchData} from "@/lib/api";

export async function getMerchantBankAccounts(merchantId: string, token: string) {
    const resData = await fetchData("/merchants/"+merchantId+"/bank-accounts", 'GET', null, token, true);
    console.log("resData", resData);
    return resData.data;
}