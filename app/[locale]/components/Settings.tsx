'use client'


import { useTranslations } from "next-intl"
import ThemeSwitcher from "./ThemeSwitcher"
import LanguageSwitcher from "./LanguageSwitcher"








export default function Settings(){
    const t = useTranslations("home.settings")
    return(
        <div className="mb-8 p-4 flex justify-between items-center border-b">
            <h1 className="text-2xl font-bold">{t("title")}</h1>

            <div className="flex gap-4 items-center ">
                <ThemeSwitcher/>
                <LanguageSwitcher/>
            </div>
        </div>
    )
}