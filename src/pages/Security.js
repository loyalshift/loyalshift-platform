// src/pages/Security.js
import React from "react";
import {
  FiShield,
  FiLock,
  FiEyeOff,
  FiServer,
  FiCheckCircle,
} from "react-icons/fi";
// Import the reusable form component
import SalesInquiryForm from "../components/SalesInquiryForm";
// Import Toaster if not rendered globally
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Security() {
  const securityFeatures = [
    {
      icon: <FiShield className="text-primary-main text-2xl" />,
      title: "SOC2 Compliance",
      description: "Regularly audited to ensure the highest security standards",
    },
    {
      icon: <FiLock className="text-primary-main text-2xl" />,
      title: "End-to-End Encryption",
      description: "All data encrypted at rest and in transit with AES-256",
    },
    {
      icon: <FiEyeOff className="text-primary-main text-2xl" />,
      title: "Zero Data Retention",
      description: "Customer data never stored longer than necessary",
    },
    {
      icon: <FiServer className="text-primary-main text-2xl" />,
      title: "Private Cloud Options",
      description: "Dedicated infrastructure for regulated industries",
    },
    {
      icon: <FiCheckCircle className="text-primary-main text-2xl" />,
      title: "Regular Penetration Testing",
      description: "Third-party security audits conducted quarterly",
    },
  ];

  return (
    <div className="py-16 bg-neutral-light">
      {" "}
      {/* Added bg-neutral-light for consistency */}
      {/* Ensure Toaster is rendered (here or globally in Layout/App) */}
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="container mx-auto px-4">
        <div className="text-center mt-16 mb-16">
          <h1 className="text-4xl font-bold text-neutral-dark mb-4">
            Security & Compliance
          </h1>
          <p className="text-xl text-neutral-main max-w-3xl mx-auto">
            Enterprise-grade security built into every layer of our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-neutral-white p-6 rounded-lg shadow-sm border border-neutral-light text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-bold text-neutral-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-main text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-neutral-white p-8 rounded-lg shadow-sm border border-neutral-light">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">
              Data Protection
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-status-success mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Customer data never used for model training</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-status-success mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Role-based access controls with MFA</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-status-success mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Data residency options available</span>
              </li>
            </ul>
          </div>

          <div className="bg-neutral-white p-8 rounded-lg shadow-sm border border-neutral-light">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">
              Compliance Standards
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-status-success mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>GDPR compliant data processing</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-status-success mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>HIPAA compliant modules available</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-status-success mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>PCI DSS Level 1 certified infrastructure</span>
              </li>
            </ul>
          </div>
        </div>

        <section className="bg-neutral-white p-8 rounded-lg shadow-md border border-neutral-light max-w-3xl mx-auto mt-16 md:mt-20">
                    {/* Contextual heading and paragraph for this specific page */}
                    <h2 className="text-2xl font-bold text-neutral-dark mb-4 text-center">
                        Have Security Questions?
                    </h2>
                    <p className="text-neutral-main mb-6 text-center">
                        Use the form below to send a quick message directly to our security team or request specific documentation.
                    </p>

                    {/* Render the reusable form component with specific props */}
                    <SalesInquiryForm
                        triggerText="Need to ask about something specific?" // Custom trigger text
                        triggerButtonText="Ask Security Question"      // Custom trigger button text
                        formTitle="Security Inquiry"                  // Custom form title
                        emailPlaceholder="Your work email for our response" // Slightly more specific placeholder
                        messagePlaceholder="Ask about compliance, data handling, protocols..." // Custom message placeholder
                        submitButtonText="Send Security Question"     // Custom submit button text
                        formContext="Security Inquiry"                // Context for potential logging/routing
                    />

                    {/* Optional: Link back to general contact for other questions */}
                    <p className="text-xs text-neutral-main text-center pt-4 mt-4 border-t border-neutral-light">
                        For general sales or partnership inquiries, please visit our main <Link to="/contact" className="text-primary-main hover:underline">Contact Page</Link>.
                    </p>
                </section>
        {/* --- End Replaced Section --- */}
      </div>
    </div>
  );
}
