"use client";



import MessagesContainer from "./MessagesContainer";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
export default function MessagesArea({messages,userId,typingStatus}:{messages:any,userId:string, typingStatus:{isTyping:boolean,isTyper:boolean}}) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const t = useTranslations("home")
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            // behavior: "smooth",
            block: "end",
        });
    }, [messages]);

    return (
        <div className="w-full h-full p-4 overflow-y-scroll flex flex-col gap-4">
            {messages?.map((msg:any)=>(
                
                <MessagesContainer key={msg?.id} message={msg} userId={userId}/>
            ))}

            <div className={`${typingStatus.isTyping && !typingStatus.isTyper? "opacity-100":"opacity-0"} bg-indigo-300 dark:bg-indigo-700 p-1.5 rounded-lg max-w-20 transition-all duration-300`}>{t("typing")}</div>
            <div ref={messagesEndRef} />
        </div>
    );
}
