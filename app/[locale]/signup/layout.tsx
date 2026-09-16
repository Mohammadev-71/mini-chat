import { Metadata } from "next"

export const metadata:Metadata={
    title:"Mini chat| signup page",
    description:"Join us and start chatting"
}

export default function Layout({children}:{children:React.ReactNode}){
    return(
        <main>{children}</main>
    )
}