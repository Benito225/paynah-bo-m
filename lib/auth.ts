import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            id: "client",
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const {mobile, password, id} = credentials as {
                    mobile: string;
                    password: string;
                    id: string;
                }

                const data = {
                    'mobile': mobile,
                    'password': password,
                    'id': id
                };

                const authResponse = await fetch(`${process.env.BACKEND_API_ENDPOINT}/login`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    cache: "no-cache"
                });

                if (!authResponse.ok) {
                    throw Error('Vérifiez votre connexion internet SVP.');
                }

                const userResponse = await authResponse.json();
                if (userResponse.status_code != 200) {
                    throw Error(userResponse.status_message);
                }

                console.log(userResponse);

                return {
                    lastname: userResponse.data.user.lastname,
                    firstname: userResponse.data.user.firstname,
                    email: userResponse.data.user.email,
                    mobile: userResponse.data.user.mobile,
                    started: userResponse.data.user.started,
                    country: userResponse.data.user.country,
                    apiToken: userResponse.data.token,
                    id: userResponse.data.user.id
                }
            }
        })
    ],
    callbacks: {
        jwt(params: any) {
            if (params.trigger === "update") {
                return {...params.token, ...params.session.user}
            }

            if (params.user?.id) {
                params.token.id = params.user.id;
                params.token.lastname = params.user.lastname;
                params.token.firstname = params.user.firstname;
                params.token.mobile = params.user.mobile;
                params.token.started = params.user.started;
                params.token.country = params.user.country;
                params.token.apiToken = params.user.apiToken;
                params.token.email = params.user.email;
            }
            return params.token;
        },
        session({session, trigger, token}: any) {
            if (session.user) {
                session.user.id = token.id;
                session.user.lastname = token.lastname;
                session.user.firstname = token.firstname;
                session.user.mobile = token.mobile;
                session.user.started = token.started;
                session.user.country = token.country;
                session.user.apiToken = token.apiToken;
                session.user.email = token.email;
            }
            return session;
        }
    }
};
export default NextAuth(authOptions);