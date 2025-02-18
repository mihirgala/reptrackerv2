import { NormalNavbar } from "@/components/normal/navbar"
import { getUser } from "@/lib/auth"
import { Metadata } from "next"
import Script from "next/script"

interface PaymentLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: `Subscribe`,
}
const PaymentLayout = async ({ children }: PaymentLayoutProps) => {
  const user = await getUser()
  return (
    <>
      <div>
        <div className="my-2 mx-5">
          <NormalNavbar user={user} />
        </div>
        <div className="mx-5">
          {children}
        </div>
      </div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </>
  )
}
export default PaymentLayout