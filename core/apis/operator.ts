"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";

export async function getOperators(token: string) {
    const resData = await fetchData(`/operators`, 'GET', null, token, true);
    console.log(resData);
    console.log(token);
    return resData.data;
}