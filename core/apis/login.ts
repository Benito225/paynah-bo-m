"use server";

import {signIn, signOut} from "@/auth";
import {fetchData} from "@/lib/api";
import {IUser} from "@/core/interfaces/user";
import {decodeToken} from "react-jwt";

export async function login(values: any) {
    return signIn("merchant", {
        username: values.username,
        password: values.password,
        redirect: true
    });
}

export async function sendOtp(values: any) {
    const data = {
        'username': values.username,
    };

    return await fetchData('/user-accounts/send-reset-password-mail', 'POST', data);
}

export async function validateOtp(values: any, token: string) {
    const user = decodeToken(token) as IUser;

    const otp = values.c1+''+values.c2+''+values.c3+''+values.c4+''+values.c5+''+values.c6;
    const data = {
        'codeOTP': otp,
        'id': user?.sub
    };

    console.log(data);

    return await fetchData('/user-accounts/verify-otp', 'POST', data, token);
}

export async function resetPassword(values: any, token: string) {
    const user = decodeToken(token) as IUser;

    const data = {
        'password': values.password,
        'id': user?.sub
    };

    return await fetchData('/user-accounts/reset-password', 'POST', data, token);
}