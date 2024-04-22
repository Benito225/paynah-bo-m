"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";

export async function getTransactions(merchantId: string, token: string) {
    const resData = await fetchData("/transactions/all-transactions/with-filters?merchantId="+merchantId+"&csv=false", 'GET', null, token, false);
    return resData.data;
}