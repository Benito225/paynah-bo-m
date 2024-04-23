"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";

export async function getTransactions(merchantId: string, token: string) {
    const resData = await fetchData("/transactions/all-transactions/with-filters?merchantId="+merchantId+"&csv=false", 'GET', null, token, false);
    console.log(resData);
    console.log(token);
    return resData.data;
}