


import { Link as IntLink} from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { IoLanguageOutline } from "react-icons/io5";

export default function LanguageSwitcher(){
    
    const pathName = usePathname()
    const locale = useLocale()
    const nextLocale = locale === "en"?"ar":"en"
    return(
        <IntLink href={pathName} locale={nextLocale}>
            <IoLanguageOutline size={24}/>
        </IntLink>
    )
}