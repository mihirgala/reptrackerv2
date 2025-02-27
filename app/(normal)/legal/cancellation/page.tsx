import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Read our Cancellation & Refund Policy to understand how subscription cancellations work at Reptracker."
}

const CancellationRefundPolicy = () => {
  return (
    <div className="md:max-w-[70%] min-h-[calc(100vh-11rem)] flex justify-center flex-col mx-auto text-justify">
      <h1 className="text-3xl font-bold text-center mb-4">Reptracker - Cancellation & Refund Policy</h1>
      
      <p className="mb-4">
        At Reptracker, we value our users and strive to offer a seamless experience. Please review our Cancellation & Refund Policy below.
      </p>
      
      <div className="space-y-6">
        <Section title="1. Subscription Cancellations">
          <ul className="list-disc pl-6 space-y-2">
            <li>You may cancel your subscription at any time through your account settings.</li>
            <li>Once canceled, your subscription will remain active until the end of the current billing cycle.</li>
            <li>After the expiration date, you will not be charged again unless you choose to resubscribe.</li>
          </ul>
        </Section>

        <Section title="2. No Refund Policy">
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not offer refunds for any subscription payments made.</li>
            <li>Even after cancellation, you will retain access to premium features until your subscription expires.</li>
            <li>Refunds will not be granted for unused time or accidental purchases.</li>
          </ul>
        </Section>
      </div>
    </div>
  )
}

export default CancellationRefundPolicy

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  )