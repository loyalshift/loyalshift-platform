// src/pages/smb/SMBTermsOfServicePage.js (example path)
import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "../../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme"; // Adjust path
import { FiFileText } from "react-icons/fi";

const theme = loyalShiftV2Theme;

// Animation Variants
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Section = ({ children, titleKey, defaultTitle }) => {
  const { t } = useLocalization();
  return (
    <motion.section className="mb-10" variants={fadeInUp}>
      <h2
        className={`text-2xl font-semibold ${theme.textPrimary} mb-4 pb-2 border-b ${theme.border}`}
      >
        {t(titleKey, defaultTitle)}
      </h2>
      <div
        className={`space-y-3 ${theme.textSecondary} text-base leading-relaxed`}
      >
        {children}
      </div>
    </motion.section>
  );
};

export default function SMBTermsOfServicePage() {
  const { t } = useLocalization();
  const lastUpdatedDate = "[Last Updated Date, e.g., May 30, 2025]"; // REPLACE

  return (
    <div className={`min-h-screen py-16 md:py-20 ${theme.background}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <div
            className={`inline-flex p-4 ${theme.accentCyanBg}/10 rounded-full mb-6`}
          >
            <FiFileText className={`w-10 h-10 ${theme.textHighlight}`} />
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${theme.textPrimary} mb-3`}
          >
            {t("smbTerms.pageTitle", "Terms of Service for LoyalShift SMB")}
          </h1>
          <p className={`${theme.textMuted} text-sm`}>
            {t("smbTerms.lastUpdatedLabel", "Last Updated:")} {lastUpdatedDate}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <Section
            titleKey="smbTerms.acceptance.title"
            defaultTitle="1. Acceptance of Terms"
          >
            <p>
              {t(
                "smbTerms.acceptance.p1",
                "By accessing or using the LoyalShift Small and Medium Business services, including the PYMES Studio platform and any associated websites or tools (collectively, the 'SMB Services' or 'Services'), provided by [Your Company Name] ('LoyalShift', 'we', 'us', or 'our'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to all of these Terms, do not use our SMB Services."
              )}
            </p>
            <p>
              {t(
                "smbTerms.acceptance.p2",
                "These Terms constitute a legally binding agreement between you ('Client', 'you') and LoyalShift."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.serviceDescription.title"
            defaultTitle="2. Description of SMB Services"
          >
            <p>
              {t(
                "smbTerms.serviceDescription.p1",
                "LoyalShift's SMB Services provide tools for businesses to create and manage a professional online presence, including website homepage implementation, access to the PYMES Studio content management system, basic customer relationship management (CRM) features, and other related functionalities as described in our service offerings (e.g., 'SMB Initiative', 'SMB Plan')."
              )}
            </p>
            <p>
              {t(
                "smbTerms.serviceDescription.p2",
                "Specific features and access levels may vary depending on the plan or package selected (e.g., initial 'SMB Initiative' one-time setup with 1-month full access and subsequent Studio Lite access, versus ongoing 'SMB Plan' subscription)."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.clientAccounts.title"
            defaultTitle="3. Client Accounts"
          >
            <p>
              {t(
                "smbTerms.clientAccounts.p1",
                "To use certain SMB Services, you may need to register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for safeguarding your account password and for all activities that occur under your account."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.feesAndPayment.title"
            defaultTitle="4. Fees and Payment"
          >
            <p>
              {t(
                "smbTerms.feesAndPayment.p1",
                "Certain SMB Services, such as the 'SMB Initiative' setup ($600 one-time) or the 'SMB Plan' ($59/month), require payment of fees. You agree to pay all applicable fees as described on our pricing page or in your service agreement. All fees are non-refundable except as expressly stated otherwise or required by law."
              )}
            </p>
            <p>
              {t(
                "smbTerms.feesAndPayment.p2",
                "For subscription services, fees will be billed in advance on a recurring basis. We reserve the right to change our fees with prior notice."
              )}
            </p>
            <p>
              {t(
                "smbTerms.feesAndPayment.p3",
                "Taxes: All fees are exclusive of applicable taxes, which you are responsible for paying."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.clientResponsibilities.title"
            defaultTitle="5. Client Responsibilities and Content"
          >
            <p>
              {t(
                "smbTerms.clientResponsibilities.p1",
                "You are solely responsible for all content, data, and information you upload, post, publish, or display through the SMB Services ('Client Content'), including its legality, reliability, and appropriateness. You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to use and authorize us to use your Client Content as necessary to provide the Services."
              )}
            </p>
            <p>
              {t(
                "smbTerms.clientResponsibilities.p2",
                "You agree not to use the Services to transmit any material that is unlawful, harmful, defamatory, obscene, infringing, or otherwise objectionable."
              )}
            </p>
            <p>
              {t(
                "smbTerms.clientResponsibilities.p3",
                "You are responsible for compliance with all applicable laws related to your use of the Services and your website, including data privacy laws concerning data collected from your End-Users."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.intellectualProperty.title"
            defaultTitle="6. Intellectual Property"
          >
            <p>
              {t(
                "smbTerms.intellectualProperty.p1",
                "LoyalShift and its licensors retain all right, title, and interest in and to the SMB Services, PYMES Studio, AgentHub™ technology, and all related intellectual property rights. These Terms do not grant you any rights to use LoyalShift's trademarks or logos."
              )}
            </p>
            <p>
              {t(
                "smbTerms.intellectualProperty.p2",
                "You retain all ownership rights to your Client Content. You grant LoyalShift a limited license to use, reproduce, modify, and display your Client Content solely for the purpose of providing the SMB Services to you."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.termTermination.title"
            defaultTitle="7. Term and Termination"
          >
            <p>
              {t(
                "smbTerms.termTermination.p1",
                "These Terms remain in effect while you use the SMB Services. For subscription services, the term will be as specified in your plan. We may suspend or terminate your access to the Services at any time, with or without cause or notice, for any reason, including for violation of these Terms."
              )}
            </p>
            <p>
              {t(
                "smbTerms.termTermination.p2",
                "Upon termination, your right to use the Services will cease immediately. Certain provisions, including intellectual property, disclaimers, and limitations of liability, will survive termination."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.disclaimers.title"
            defaultTitle="8. Disclaimers and Limitation of Liability"
          >
            <p>
              <strong>
                {t(
                  "smbTerms.disclaimers.p1",
                  "THE SMB SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT."
                )}
              </strong>
            </p>
            <p>
              <strong>
                {t(
                  "smbTerms.disclaimers.p2",
                  "IN NO EVENT SHALL LOYALSHIFT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES."
                )}
              </strong>
            </p>
            <p>
              {t(
                "smbTerms.disclaimers.p3",
                "OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES IS LIMITED TO THE GREATER OF THE AMOUNTS PAID BY YOU TO US FOR THE SERVICES IN THE THREE (3) MONTHS PRIOR TO THE CLAIM, OR ONE HUNDRED US DOLLARS ($100)."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.governingLaw.title"
            defaultTitle="9. Governing Law"
          >
            <p>
              {t(
                "smbTerms.governingLaw.p1",
                "These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction, e.g., the Republic of Costa Rica], without regard to its conflict of law provisions."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.changesToTerms.title"
            defaultTitle="10. Changes to Terms"
          >
            <p>
              {t(
                "smbTerms.changesToTerms.p1",
                "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbTerms.contactInformation.title"
            defaultTitle="11. Contact Information"
          >
            <p>
              {t(
                "smbTerms.contactInformation.p1",
                "If you have any questions about these Terms, please contact us at:"
              )}
            </p>
            <p className="mt-2">
              [Your Company Name]
              <br />
              [Your Company Address]
              <br />
              Email: [Contact Email for Terms Questions, e.g.,
              legal@loyalshift.com or support@loyalshift.com]
            </p>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}
