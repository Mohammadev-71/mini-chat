



export default function MessagesContainer({message, userId}:{message:any, userId:string}){
    const isSender = userId === message?.senderId
    return(
        <div dir="ltr" className={`w-full flex ${isSender?"justify-end":"justify-start "}`}>
            <div className={`flex flex-col gap-2 ${isSender?"bg-indigo-300 dark:bg-indigo-600 ":"bg-indigo-400 dark:bg-indigo-800"} w-auto p-2 rounded-lg text-indigo-900 dark:text-white`}>
                <p className="text-lg">{message?.content}</p>
                <div className="flex gap-10 text-xs">
                    <p>{new Date(message.createdAt).toLocaleDateString()}</p>
                    <p>{new Date(message.createdAt).toLocaleTimeString()}</p>
                </div>
            </div>
            
            
        </div>
    )
}