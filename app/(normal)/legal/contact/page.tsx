import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Reptracker for support, feedback, or inquiries. Reach out to us via email at reptrackerfit@gmail.com."
};

const ContactPage = () => {
  return (
    <div className="md:max-w-[70%] flex justify-center flex-col mx-auto text-justify">
      <h1 className="text-3xl font-bold text-center mb-4">Reptracker - Contact Us</h1>

      <p className="mb-4">
        We&apos;d love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out.
      </p>

      <div className="space-y-6">
        <Section title="How to Reach Us">
          <p>
            The best way to contact us is via email. We strive to respond to all inquiries within 24-48 hours.
          </p>
        </Section>

        <Section title="Email Support">
          <p className="text-lg font-medium">📧 reptrackerfit@gmail.com</p>
          <p>
            Please provide a clear subject line for your email so we can assist you efficiently. Whether it's a technical issue, 
            a billing question, or general feedback, we&apos;re here to help.
          </p>
        </Section>

        <Section title="Common Inquiries">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Technical Support:</strong> Facing issues with the platform? Describe the problem in detail, and we&apos;ll work on a solution.</li>
            <li><strong>Billing Questions:</strong> Need help with your subscription? Let us know your registered email and details.</li>
            <li><strong>Feedback & Suggestions:</strong> Have ideas on how we can improve? We&apos;d love to hear them!</li>
          </ul>
        </Section>

        <Section title="Response Time">
          <p>
            Our team is available Monday to Friday. We typically respond within 24-48 hours, but response times may vary on weekends and holidays.
          </p>
        </Section>
      </div>
    </div>
  )
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
)

export default ContactPage