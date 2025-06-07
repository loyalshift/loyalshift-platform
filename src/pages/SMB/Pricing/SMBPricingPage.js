// src/pages/smb/pricing/SMBPricingPage.js
import React from 'react';
import { useLocalization } from '../../../components/LocalizationContext';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const PricingCard = ({ plan, highlight }) => {
  const { t } = useLocalization();
  
  return (
    <div className={`rounded-2xl shadow-xl overflow-hidden ${
      highlight 
        ? 'ring-2 ring-cyan-500 transform -translate-y-2' 
        : 'border border-gray-200'
    } transition-all duration-300`}>
      <div className={`p-8 ${
        highlight ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white' : 'bg-white'
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>
              {plan.name}
            </h3>
            <p className="mt-2 opacity-90">
              {t(plan.descriptionKey, plan.defaultDescription)}
            </p>
          </div>
          
          {highlight && (
            <span className="bg-white text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full">
              {t('smbPricing.mostPopular', 'RECOMMENDED')}
            </span>
          )}
        </div>
        
        <div className="mt-6 flex items-baseline">
          <span className={`text-4xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>
            {plan.price}
          </span>
          <span className={`ml-1 text-lg ${highlight ? 'text-cyan-100' : 'text-gray-500'}`}>
            {plan.frequency}
          </span>
        </div>
        
        <a
          href={plan.ctaLink}
          className={`mt-8 block w-full py-3 px-6 rounded-lg text-center font-semibold ${
            highlight 
              ? 'bg-white text-cyan-700 hover:bg-gray-100' 
              : 'bg-cyan-600 text-white hover:bg-cyan-700'
          } transition-colors`}
        >
          {t(plan.ctaTextKey, plan.ctaText)}
        </a>
      </div>
      
      <div className="bg-gray-50 p-8 border-t border-gray-200">
        <ul className="space-y-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <CheckIcon />
              <span className="ml-3 text-gray-700">{t(feature.key, feature.text)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function SMBPricingPage() {
  const { t } = useLocalization();

  const plans = [
    {
      name: t('smbPricing.initiative.name', 'SMB Initiative'),
      price: "$599",
      frequency: t('smbPricing.initiative.frequency', '/one-time'),
      descriptionKey: "smbPricing.initiative.description",
      defaultDescription: "Get your business online with a professional homepage + 1 month of full platform access",
      features: [
        { key: "smbPricing.features.homepage", text: "Custom homepage implementation" },
        { key: "smbPricing.features.legacyApps", text: "Connect up to 2 legacy applications/databases" },
        { key: "smbPricing.features.fullStudio", text: "Full Studio access for 1 month" },
        { key: "smbPricing.features.workflows", text: "Up to 50 workflow executions" },
        { key: "smbPricing.features.templates", text: "Access to pre-built workflow templates" },
        { key: "smbPricing.features.support", text: "Implementation support" },
        { key: "smbPricing.features.studioLite", text: "Studio Lite access after first month" },
      ],
      ctaText: t('smbPricing.initiative.cta', 'Get Started'),
      ctaTextKey: "smbPricing.initiative.cta",
      ctaLink: "/signup?plan=initiative",
      highlight: true
    },
    {
      name: t('smbPricing.smbPlan.name', 'SMB Plan'),
      price: "$59",
      frequency: t('smbPricing.smbPlan.frequency', '/month'),
      descriptionKey: "smbPricing.smbPlan.description",
      defaultDescription: "Full platform access with premium features and support",
      features: [
        { key: "smbPricing.features.fullStudio", text: "Full Studio access" },
        { key: "smbPricing.features.advanced", text: "Advanced content management" },
        { key: "smbPricing.features.analytics", text: "Enhanced analytics dashboard" },
        { key: "smbPricing.features.priority", text: "24/7 priority support" },
        { key: "smbPricing.features.unlimited", text: "Unlimited workflow executions" },
        { key: "smbPricing.features.invoices", text: "Invoice management system" },
        { key: "smbPricing.features.allTemplates", text: "All workflow templates" },
      ],
      ctaText: t('smbPricing.smbPlan.cta', 'Subscribe Now'),
      ctaTextKey: "smbPricing.smbPlan.cta",
      ctaLink: "/signup?plan=smb",
      highlight: false
    }
  ];

  const enterprisePlan = {
    name: t('smbPricing.enterprise.name', 'Enterprise'),
    price: t('smbPricing.enterprise.price', 'Custom'),
    frequency: "",
    descriptionKey: "smbPricing.enterprise.description",
    defaultDescription: "Tailored solutions for large organizations with custom requirements",
    features: [
      { key: "smbPricing.features.customApps", text: "Custom application connectors" },
      { key: "smbPricing.features.dedicated", text: "Dedicated implementation team" },
      { key: "smbPricing.features.enterprise", text: "Enterprise-grade security" },
      { key: "smbPricing.features.sla", text: "Custom service level agreements" },
      { key: "smbPricing.features.custom", text: "Custom development services" },
      { key: "smbPricing.features.training", text: "Onsite training" },
    ],
    ctaText: t('smbPricing.enterprise.cta', 'Contact Sales'),
    ctaTextKey: "smbPricing.enterprise.cta",
    ctaLink: "/contact"
  };

  const faqs = [
    {
      questionKey: "faq.question1",
      defaultQuestion: "What exactly do I get with the $599 SMB Initiative?",
      answerKey: "faq.answer1",
      defaultAnswer: "The $599 SMB Initiative includes: 1) A professionally designed homepage for your business, 2) Full access to our platform for 1 month to connect your systems and automate workflows, and 3) Continued access to Studio Lite after the first month to manage your content and view invoices."
    },
    {
      questionKey: "faq.question2",
      defaultQuestion: "What is Studio Lite?",
      answerKey: "faq.answer2",
      defaultAnswer: "Studio Lite is our free version that allows you to manage basic content on your homepage and view invoices. It's included after your first month of the SMB Initiative. If you need more advanced features, you can upgrade to the $59/month SMB Plan."
    },
    {
      questionKey: "faq.question3",
      defaultQuestion: "What's included in the $59/month SMB Plan?",
      answerKey: "faq.answer3",
      defaultAnswer: "The SMB Plan gives you full access to all Studio features including advanced content management, analytics, unlimited workflow executions, and 24/7 priority support. It also includes our invoice management system."
    },
    {
      questionKey: "faq.question4",
      defaultQuestion: "Can I upgrade from Studio Lite to the SMB Plan later?",
      answerKey: "faq.answer4",
      defaultAnswer: "Yes! At any time after your first month, you can upgrade to the SMB Plan to get full access to all features and support."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('smbPricing.hero.title', 'SMB Digital Transformation Initiative')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 mb-10">
            {t('smbPricing.hero.subtitle', 'Get your business online with a professional homepage and start automating your operations')}
          </p>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="bg-cyan-100 text-cyan-800 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('value.proposition1', 'Professional Homepage')}</h3>
              <p className="text-gray-600">{t('value.detail1', 'Get a custom, mobile-friendly homepage that represents your business')}</p>
            </div>
            
            <div className="p-6">
              <div className="bg-cyan-100 text-cyan-800 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('value.proposition2', '1 Month Full Access')}</h3>
              <p className="text-gray-600">{t('value.detail2', 'Automate processes and connect your systems with our full platform')}</p>
            </div>
            
            <div className="p-6">
              <div className="bg-cyan-100 text-cyan-800 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('value.proposition3', 'Ongoing Lite Access')}</h3>
              <p className="text-gray-600">{t('value.detail3', 'Manage your content and view invoices with Studio Lite after your first month')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('smbPricing.sectionTitle', 'Simple, Transparent Pricing')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('smbPricing.sectionSubtitle', 'Choose the option that works best for your business')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {plans.map((plan) => (
              <PricingCard 
                key={plan.name} 
                plan={plan} 
                highlight={plan.highlight} 
              />
            ))}
          </div>
          
          {/* Enterprise Option */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 max-w-4xl mx-auto">
            <div className="p-8 md:flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{enterprisePlan.name}</h3>
                <p className="mt-2 text-gray-600 max-w-xl">
                  {t(enterprisePlan.descriptionKey, enterprisePlan.description)}
                </p>
                
                <a
                  href={enterprisePlan.ctaLink}
                  className="mt-6 inline-block bg-gray-900 text-white py-3 px-8 rounded-lg font-semibold hover:bg-black transition-colors"
                >
                  {t(enterprisePlan.ctaTextKey, enterprisePlan.ctaText)}
                </a>
              </div>
              
              <div className="mt-6 md:mt-0 md:ml-6">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-6 max-w-xs">
                  <h4 className="font-bold text-lg mb-2">{t('smbPricing.enterprise.includes', 'Includes:')}</h4>
                  <ul className="space-y-2">
                    {enterprisePlan.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckIcon />
                        <span className="ml-2">{t(feature.key, feature.text)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('howItWorks.title', 'How Our SMB Initiative Works')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-cyan-100 text-cyan-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('step1.title', 'Sign Up')}</h3>
              <p className="text-gray-600">{t('step1.detail', 'Choose the $599 SMB Initiative to get started')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-cyan-100 text-cyan-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('step2.title', 'Homepage Setup')}</h3>
              <p className="text-gray-600">{t('step2.detail', 'We implement your professional business homepage')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-cyan-100 text-cyan-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('step3.title', 'Full Access Month')}</h3>
              <p className="text-gray-600">{t('step3.detail', 'Connect systems and automate processes with full platform access')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-cyan-100 text-cyan-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('step4.title', 'Ongoing Access')}</h3>
              <p className="text-gray-600">{t('step4.detail', 'Continue with Studio Lite or upgrade to the SMB Plan for full features')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('faq.title', 'Frequently Asked Questions')}
            </h2>
            <p className="text-gray-600">
              {t('faq.subtitle', 'Everything you need to know about our SMB Initiative')}
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(faq.questionKey, faq.defaultQuestion)}
                </h3>
                <p className="text-gray-600">
                  {t(faq.answerKey, faq.defaultAnswer)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('smbPricing.cta.title', 'Ready to Transform Your Business?')}
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            {t('smbPricing.cta.subtitle', 'Join our SMB Initiative and get your business online today')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup?plan=initiative"
              className="bg-white text-cyan-700 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 text-lg"
            >
              {t('smbPricing.cta.initiative', 'Get Started - $599')}
            </a>
            <a
              href="/demo"
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition duration-300 text-lg"
            >
              {t('smbPricing.cta.demo', 'Schedule a Demo')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
