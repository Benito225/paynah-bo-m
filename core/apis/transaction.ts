"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";

interface queryParams {
    merchantId?: string;
    coreBankId?: string;
}

export async function getTransactions(query: queryParams, token: string) {
    const resData = await fetchData(`/transactions/all-transactions/with-filters?merchantId=${query.merchantId}&bankAccountId=${query.coreBankId}&csv=false&perPage=6`, 'GET', null, token, false);
    console.log(resData);
    console.log(token);
    return resData.data;
}