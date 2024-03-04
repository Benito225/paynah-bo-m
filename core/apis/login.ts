"use server";

import {signIn, signOut} from "@/auth";

export async function login(values: any) {
    return signIn("merchant", {
        username: values.username,
        password: values.password,
        redirect: true
    });
}