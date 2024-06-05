"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";

export async function getUserAccounts(token: string) {
    const resData = await fetchData(`/user-accounts`, 'GET', null, token, true);
    console.log(resData);
    console.log(token);
    return resData.data;
}