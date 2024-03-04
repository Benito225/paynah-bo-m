import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decodeToken } from "react-jwt";
import {fetchData} from "@/lib/api";
import {IUser} from "@/core/interfaces/user";
import NextAuth, {AuthError} from "next-auth";
import {getLocale} from "@/middleware";

const config = {
    providers: [
        CredentialsProvider({
            id: "merchant",
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const {username, password} = credentials as {
                    username: string;
                    password: string;
                }

                const data = {
                    'username': username,
                    'password': password,
                };

                const authResponse = await fetchData('/user-accounts/login', 'POST', data);

                if (!authResponse.success) {
                    throw new AuthError(authResponse.message);
                }

                const user = decodeToken(authResponse.data.accessToken) as IUser;
                user.accessToken = authResponse.data.accessToken;
                console.log('user', user);

                return user as any;
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = request.nextUrl.pathname.startsWith(`/fr/dashboard`) || request.nextUrl.pathname.startsWith(`/en/dashboard`);
            const isOnHome = request.nextUrl.pathname === "/fr" || request.nextUrl.pathname === "/en";


            if (isOnDashboard || isOnHome) {
                if (!isLoggedIn) {
                    return Response.redirect(new URL('/auth/login', request.nextUrl));
                }
            } else if (isLoggedIn) {
                if (request.nextUrl.pathname.startsWith(`/en/dashboard`)) {
                    return Response.redirect(new URL(`/en/dashboard`, request.nextUrl));
                } else {
                    return Response.redirect(new URL(`/fr/dashboard`, request.nextUrl));
                }
            }
        },
        jwt(params: any) {
            if (params.trigger === "update") {
                return {...params.token, ...params.session.user}
            }

            if (params.user?.sub) {
                params.token.sub = params.user.sub;
                params.token.login = params.user.login;
                params.token.firstname = params.user.firstname;
                params.token.lastname = params.user.lastname;
                params.token.isFirstConnection = params.user.isFirstConnection;
                params.token.codeOTP = params.user.codeOTP;
                params.token.merchantsIds = params.user.merchantsIds;
                params.token.accessToken = params.user.accessToken;
            }
            return params.token;
        },
        session({session, trigger, token}: any) {
            if (session.user) {
                session.user.sub = token.sub;
                session.user.login = token.login;
                session.user.firstname = token.firstname;
                session.user.lastname = token.lastname;
                session.user.isFirstConnection = token.isFirstConnection;
                session.user.codeOTP = token.codeOTP;
                session.user.merchantsIds = token.merchantsIds;
                session.user.accessToken = token.accessToken;
            }
            return session;
        }
    }
} satisfies NextAuthConfig

export const {handlers, auth, signIn, signOut} = NextAuth(config);