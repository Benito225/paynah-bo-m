import Image from "next/image";
import {Locale} from "@/i18n.config";
import {auth, signOut} from "@/auth";
import {IUser} from "@/core/interfaces/user";
import {Button} from "@/components/ui/button";

export default async function Home({params: { lang }}: {
    params: { lang: Locale }
}) {
    const session  = await auth();

    let merchant;
    if (session && session.user) {
        merchant = session.user as IUser;
    } else {
        merchant = {} as IUser;
    }

    return (
    <div className={`mt-4`}>
      Dashboard View <span className={`font-semibold`}>{merchant.firstname}</span>
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <Button type="submit">Déconnexion</Button>
        </form>
    </div>
  );
}
