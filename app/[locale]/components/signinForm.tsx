"use client";
import { useTranslations } from "next-intl";
import PasswordField from "./PasswordField";
import { useEffect, useState ,type ChangeEvent} from "react";
import { Link as IntLink } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useActionState } from "react";
import { VscLoadingCompact } from "react-icons/vsc";
import ErrorMessage from "./ErrorMessage";
import { redirect } from "next/navigation";
import signinAction from "@/app/actions/signin";


export default function SigninForm() {
    const t = useTranslations("signin");
    const [state, formAction, isPending] = useActionState(signinAction,null)
    
    
    useEffect(()=>{
        if(state && !state?.success && state?.message){
            alert(state?.message)
        }

        if(state && state.success){
            redirect("/")
        }
    },[state, state?.success])
    
    const firstErrorMsg = state?.errors?.[0]?.message 
    const firstErrorPath = state?.errors?.[0]?.path[0] 

    
    return (
        <form action={formAction} className="flex flex-col justify-start items-center bg-white/15 dark:bg-black/20 backdrop-blur-md border border-white/2 dark:border-white/10 rounded-2xl p-6 shadow-xl z-10 min-w-full md:min-w-1/2 lg:min-w-1/4 gap-4 relative">


        <div className="flex items-center w-full justify-between">
            <LanguageSwitcher/>
            <ThemeSwitcher/>
        </div>
        

        <h1 className="text-2xl">{t("title")}</h1>


        <label className="w-full text-indigo-800 dark:text-indigo-300">
            {t("label.email")}
            <input
            defaultValue={state?.values?.email as string}
            className="w-full p-4 bg-white/50 dark:bg-black/50 shadow-inner rounded-lg outline-none text-indigo-800 dark:text-indigo-300"
            type="email"
            name="email"
            placeholder={t("placeholder.email")}
            />
        </label>


        {
            firstErrorPath==="email"&&(
                <ErrorMessage message={t(`errors.${firstErrorMsg}`)}/>
            )
        }

        <PasswordField
            defaultValue={state?.values?.password as string}
            placeholder={t("placeholder.password")}
            label={t("label.password")}
        />

        {
            firstErrorPath==="password"&&(
                <ErrorMessage message={t(`errors.${firstErrorMsg}`)}/>
            )
        }

        
        <div className="flex flex-col justiy-center items-center text-indigo-800 dark:text-indigo-300">
            <p>{t("signup")}</p>
            <IntLink className="text-blue-700 dark:text-blue-600" href={"/signup"}>
                {t("signupLink")}
            </IntLink>
        </div>

        <button className=" p-2 bg-white/50 dark:bg-black/50 shadow-inner rounded-lg outline-none text-indigo-800 dark:text-indigo-300" type="submit">{isPending?<VscLoadingCompact  className="animate-spin"/>:t("submitBtn")}</button>
        </form>
    );
}
