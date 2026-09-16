import { Metadata } from "next"

export const metadata:Metadata={
    title:"Mini chat| signin page",
    description:"signin to get your chats"
}

export default function Layout({children}:{children:React.ReactNode}){
    return(
        <main>{children}</main>
    )
}