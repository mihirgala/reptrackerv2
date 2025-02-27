import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us"
}

const ContactPage = () => {
    return (
        <div className="md:max-w-[70%] min-h-[calc(100vh-11rem)] flex justify-center flex-col mx-auto text-justify">
            <h1 className="text-3xl font-bold text-center mb-4">Reptracker - Contact Us</h1>

            <p className="mb-4">
                Have questions or need assistance? Reach out to us, and we’ll be happy to help.
            </p>

            <div className="space-y-4">
                <Section title="Email">
                    <p className="text-lg font-medium">reptrackerfit@gmail.com</p>
                </Section>
            </div>
        </div>
    )
}

export default ContactPage


const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {children}
    </div>
)