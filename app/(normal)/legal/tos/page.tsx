import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
    title: "Terms and Conditions",
    description:"Read the Terms and Conditions of Reptracker to understand the rules, eligibility, subscription details, and usage policies of our fitness tracking platform."
}

const TOSpage = () => {
  return (
    <div className="md:max-w-[70%] flex justify-center flex-col mx-auto text-justify">
      <h1 className="text-3xl font-bold text-center mb-4">Reptracker - Terms and Conditions</h1>
      
      <p className="mb-4">
        Welcome to Reptracker! These Terms and Conditions govern your use of our fitness tracking platform,
        including all features, content, and services provided through our website and mobile application.
      </p>
      
      <p className="mb-6">
        By accessing or using Reptracker, you agree to be bound by these terms. If you do not agree, please do not use our services.
      </p>
      
      <div className="space-y-6">
        <Section title="1. Eligibility">
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 15 years old to use Reptracker.</li>
            <li>If you are under 18, you must have parental or guardian consent.</li>
            <li>You are responsible for ensuring that your use complies with applicable laws.</li>
          </ul>
        </Section>

        <Section title="2. Account Registration">
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate and complete information when creating an account.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree not to share your account with others or use another person’s account without permission.</li>
          </ul>
        </Section>

        <Section title="3. Subscription Plans and Payments">
          <ul className="list-disc pl-6 space-y-2">
            <li>Reptracker offers both free and premium subscription plans.</li>
            <li>Premium plans grant access to AI-generated workout plans, meal plans, and unlimited AI chat messages.</li>
            <li>Payments for premium subscriptions are non-refundable unless required by law.</li>
            <li>If you cancel your subscription, you will retain access until the end of the current billing cycle.</li>
            <li>We reserve the right to modify subscription fees with prior notice.</li>
          </ul>
        </Section>

        <Section title="4. Use of the Platform">
          <ul className="list-disc pl-6 space-y-2">
            <li>You agree to use Reptracker for personal fitness tracking purposes only.</li>
            <li>You must not engage in any activity that disrupts or harms our services.</li>
            <li>Unauthorized access, data mining, or scraping of our platform is strictly prohibited.</li>
          </ul>
        </Section>

        <Section title="5. Health Disclaimer">
          <ul className="list-disc pl-6 space-y-2">
            <li>Reptracker provides fitness and nutrition-related content for informational purposes only.</li>
            <li>We do not provide medical advice. Always consult a healthcare professional before starting a new fitness or nutrition plan.</li>
            <li>Use of our AI-generated meal and workout plans is at your own risk.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }:{title:string,children:React.ReactNode}) => (
  <div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

export default TOSpage;