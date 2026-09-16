import { useTranslations } from "next-intl";
import Contacts from "./components/Contacts";



export default function Home() {
  const t = useTranslations("home")
  return (
    <main className="w-screen h-screen relative flex justify-start items-start overflow-hidden bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-900">
      <Contacts/>

      <div className="hidden lg:flex flex-col justify-center items-center w-full h-full gap-4">
          <h1 className="text-3xl">{t("title")}</h1>
          <h1 className="text-2xl">{t("subtitle")}</h1>
      </div>
    </main>
  );
}
