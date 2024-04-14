"use server";

import {fetchData} from "@/lib/api";
import {decodeToken} from "react-jwt";
import {IUser} from "@/core/interfaces/user";

export async function getCountriesList() {
    const data = await fetchData('/countries');
    return data;
}

export async function createUserAccount(data: any) {
    const resData = await fetchData('/user-accounts/create-user', 'POST', data);
    return resData;
}

export async function createPassword(values: any, token: string) {
    const user = decodeToken(token) as IUser;

    const data = {
        'token': token,
        'password': values.password,
        'id': user?.id
    };

    const res = await fetchData('/user-accounts/create-password', 'POST', data);
    console.log(res);

    return res;
}

export async function addMerchant(data: any, merchant: IUser) {
    const resData = await fetchData('/user-accounts', 'POST', data, merchant.accessToken);
    console.log(resData);
    return resData;
}
