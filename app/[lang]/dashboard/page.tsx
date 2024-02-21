import Image from "next/image";
import {Locale} from "@/i18n.config";

export default function Home({params: { lang }}: {
    params: { lang: Locale }
}) {
  return (
    <div>
      Dashboard View
    </div>
  );
}
