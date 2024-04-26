import {Metadata} from "next";
import {Locale} from "@/i18n.config";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: "Home",
}

export default async function HomePage({params: { lang }}: {
    params: { lang: Locale }
}) {
    const session  = await auth();

    if (session && session.user) {
        return redirect('/dashboard');
    } else {
        return redirect('/auth/login');
    }
}
