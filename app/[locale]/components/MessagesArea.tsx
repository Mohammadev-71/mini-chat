"use client";



import MessagesContainer from "./MessagesContainer";
import { useEffect, useRef } from "react";

export default function MessagesArea({messages,userId}:{messages:any,userId:string}) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

            <div ref={messagesEndRef} />
        </div>
    );
}
