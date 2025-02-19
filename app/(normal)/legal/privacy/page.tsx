import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Privacy Policy",
    description:"Learn how Reptracker collects, uses, and protects your data. Read our Privacy Policy to understand your rights and our commitment to data security."
}

const PrivacyPolicyPage = () => {
  return (
    <div className="md:max-w-[70%] flex justify-center flex-col mx-auto text-justify">
      <h1 className="text-3xl font-bold text-center mb-4">Reptracker - Privacy Policy</h1>
      
      <p className="mb-4">
        At Reptracker, we are committed to protecting your privacy. This Privacy Policy outlines how we collect,
        use, and safeguard your information when you use our fitness tracking platform.
      </p>
      
      <p className="mb-6">
        By accessing or using Reptracker, you consent to the practices described in this policy. If you do not agree,
        please discontinue use of our services.
      </p>
      
      <div className="space-y-6">
        <Section title="1. Information We Collect">
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal Information: Name, email, age, and other account details provided during registration.</li>
            <li>Usage Data: Information about your activity on the platform, including workouts, meal plans, and preferences.</li>
            <li>Device Data: Information such as IP address, browser type, and device details for security purposes.</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and improve our services, including workout tracking and AI-generated recommendations.</li>
            <li>To personalize user experience and offer relevant fitness and nutrition insights.</li>
            <li>To ensure security, prevent fraud, and comply with legal obligations.</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing and Disclosure">
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not sell your personal information to third parties.</li>
            <li>We may share data with trusted service providers for analytics, security, and operational purposes.</li>
            <li>We may disclose information if required by law or to protect our legal rights.</li>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <ul className="list-disc pl-6 space-y-2">
            <li>We implement industry-standard security measures to protect your data.</li>
            <li>Users are responsible for keeping their account credentials secure.</li>
            <li>No online platform can guarantee 100% security, but we take reasonable steps to safeguard user data.</li>
          </ul>
        </Section>

        <Section title="5. Your Rights and Choices">
          <ul className="list-disc pl-6 space-y-2">
            <li>You can access, update, or delete your account information through your profile settings.</li>
            <li>You may opt out of certain data collection practices by adjusting your preferences.</li>
            <li>For data deletion requests, contact our support team.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }:{title:string, children:React.ReactNode}) => (
  <div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

export default PrivacyPolicyPage
