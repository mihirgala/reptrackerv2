import { SiteLogo } from "@/components/logo"
import { ModeToggle } from "@/components/theme/theme-switch-button"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const AuthNavbar = () => {
    return (
        <header>
            <div className="flex items-center justify-between">
                <SiteLogo asLink/>
                <div className="flex items-center gap-5">
                    <Button variant={"outline"} asChild><Link href={"/faq"}>Learn more&nbsp;<ExternalLinkIcon /></Link></Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}