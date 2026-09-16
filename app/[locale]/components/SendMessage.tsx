'use client'
import { IoSendSharp } from "react-icons/io5";
import MessagesArea from "../components/MessagesArea";
import { useEffect, useState,useRef } from "react";




type message = {
    id:string,
    chatId:string,
    content:string,
    senderId:string,
    createdAt:Date,
    updatedAt:Date,
    isRead:boolean
}




export default function SendMessage({chat}:{chat:any}){


    const [messages, setMessages] = useState<message[]>(chat?.chat?.messages)
    const [newMessage, setNewMessage] = useState<string>("")
    const socketRef = useRef<WebSocket | null>(null);


    useEffect(()=>{
        const connectingWithWSSwerver = ()=>{
            try {
                const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?userId=${chat.userId}&chatId=${chat.chat.id}`)

                socketRef.current = socket
                socket.onopen = ()=>{
                    console.log("connected to socket server")
                }

                socket.onmessage = (event)=>{
                    const data = JSON.parse(event.data)
                    setMessages([...messages,data.message])
                }

            } catch (error) {
                console.log(error)
            }
        }

        connectingWithWSSwerver()
    },[chat, messages, setMessages])


    const inputRef = useRef<HTMLInputElement | null>(null);
    const sendMessageHandler = ()=>{
        inputRef.current?.focus()
        const socket = socketRef.current
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not connected");
            return;
        }

        socket.send(JSON.stringify({
            content:newMessage,
            senderId:chat.userId,
            chatId:chat.chat.id
        }))
        setNewMessage("")
        
    }

    
    
    return(

        <div className="h-full w-full flex flex-col justify-between relative">
            <MessagesArea messages={messages} userId={chat?.userId}/>

            <form onSubmit={(e)=>{e.preventDefault(); sendMessageHandler()}} className="bg-white/40 dark:bg-black/40 shadow-lg rounded-lg">
                <div dir="ltr" className="flex gap-2 justify-center items-center w-full px-4">
                    <input ref={inputRef} value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}} type="text" className="w-full outline-none p-2.5 text-lg text-indigo-800 dark:text-white" name="" id="" />
                    <button type="submit" className="cursor-pointer text-indigo-700 dark:text-white hover:text-indigo-300">
                        <IoSendSharp size={22}/>
                    </button>
                    
                </div>
            </form>
        </div>
        
    )
}