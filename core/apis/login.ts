"use server";

import {signIn, signOut} from "@/auth";
import {fetchData} from "@/lib/api";
import {IUser} from "@/core/interfaces/user";
import {decodeToken} from "react-jwt";
import {data} from "autoprefixer";

export async function login(values: any, redirect:boolean = true) {
    return signIn("merchant", {
        username: values.username,
        password: values.password,
        redirect: redirect
    });
}

export async function logout() {
    return await signOut();
}

export async function sendOtp(values: any) {
    const data = {
        'username': values.username,
    };

    // return await fetchData('/user-accounts/send-reset-password-mail', 'POST', data);
    return await fetchData('/user-accounts/send-otp', 'POST', data);
}

export async function validateOtp(values: any, username: string) {
    const data = {
        'otpCode': values.otp,
        'username': username
    };

    return await fetchData('/user-accounts/verify-otp', 'POST', data);
}

export async function resetPassword(values: any, token: string) {
    const user = decodeToken(token) as IUser;
    console.log('resetP-user-dec', user);
    console.log(token);

    const data = {
        'token': token,
        'password': values.password,
        'id': user?.id
    };

    const resData = await fetchData('/user-accounts/reset-password', 'POST', data);
    console.log(resData);

    return resData;
}

export async function generateNewToken(refreshToken: string) {
    const data = {
        refreshToken: refreshToken
    };

    const newTokenRes = await fetchData('/user-accounts/refresh-token', 'POST', data);

    if (!newTokenRes.success) {
        throw Error('RefreshToken dont work');
    }

    return newTokenRes.data;
}

export async function getAccountCountryInfo(countryId: string) {
    const resData = await fetchData(`/countries/${countryId}`, 'GET');

    if (!resData.success) {
        return {};
    }

    return resData.data;
}