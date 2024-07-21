import { SiteLogo } from "@/components/logo"
import { ModeToggle } from "@/components/theme/theme-switch-button"

export const AuthNavbar = () => {
    return (
        <header>
            <div className="flex items-center justify-between">
                <SiteLogo asLink/>
                <div className="flex items-center gap-5">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}