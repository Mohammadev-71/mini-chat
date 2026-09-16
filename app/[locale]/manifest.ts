import type { MetadataRoute } from "next";



export default function manifest():MetadataRoute.Manifest{
    return{
        name:"Mini Chat",
        short_name:"Mini Chat",
        description:"A real-time messaging application",
        start_url:"/",
        display: "standalone",
        background_color:"#ffffff",
        theme_color:"#ffffff",
    }
}
