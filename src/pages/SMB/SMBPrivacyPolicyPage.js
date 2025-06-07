// src/pages/smb/SMBPrivacyPolicyPage.js (example path)
import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "../../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme"; // Adjust path
import { FiShield, FiInfo } from "react-icons/fi";

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

export default function SMBPrivacyPolicyPage() {
  const { t } = useLocalization();
  const effectiveDate = "[Effective Date, e.g., May 30, 2025]"; // REPLACE

  return (
    <div className={`min-h-screen py-16 md:py-20 ${theme.background}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {" "}
        {/* Max width for readability */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <div
            className={`inline-flex p-4 ${theme.accentCyanBg}/10 rounded-full mb-6`}
          >
            <FiShield className={`w-10 h-10 ${theme.textHighlight}`} />
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${theme.textPrimary} mb-3`}
          >
            {t(
              "smbPrivacy.pageTitle",
              "Privacy Policy for LoyalShift SMB Services"
            )}
          </h1>
          <p className={`${theme.textMuted} text-sm`}>
            {t("smbPrivacy.effectiveDateLabel", "Effective Date:")}{" "}
            {effectiveDate}
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <Section
            titleKey="smbPrivacy.introduction.title"
            defaultTitle="1. Introduction"
          >
            <p>
              {t(
                "smbPrivacy.introduction.p1",
                "Welcome to LoyalShift for Small and Medium Businesses ('SMB Services', 'PYMES Studio', 'Platform'). This Privacy Policy explains how [Your Company Name] ('LoyalShift', 'we', 'us', or 'our') collects, uses, shares, and protects information in relation to our SMB Services provided to you ('Client', 'you', 'your')."
              )}
            </p>
            <p>
              {t(
                "smbPrivacy.introduction.p2",
                "By using our SMB Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms, please do not access or use the Services."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbPrivacy.infoWeCollect.title"
            defaultTitle="2. Information We Collect"
          >
            <p>
              {t(
                "smbPrivacy.infoWeCollect.p1",
                "We may collect and process the following types of information:"
              )}
            </p>
            <ul className="list-disc list-outside pl-5 space-y-1 mt-2">
              <li>
                <strong>
                  {t(
                    "smbPrivacy.infoWeCollect.item1.title",
                    "Client Account Information:"
                  )}
                </strong>{" "}
                {t(
                  "smbPrivacy.infoWeCollect.item1.desc",
                  "When you sign up for SMB Services, we collect information such as your name, business name, email address, phone number, billing information, and other details necessary to provide and manage your account."
                )}
              </li>
              <li>
                <strong>
                  {t("smbPrivacy.infoWeCollect.item2.title", "Client Content:")}
                </strong>{" "}
                {t(
                  "smbPrivacy.infoWeCollect.item2.desc",
                  "Information and content you upload, create, or manage within the PYMES Studio, including website text, images, blog posts, product/service details, and customer contact information you input ('Client Content'). You are responsible for ensuring you have the necessary rights and consents for any personal data within your Client Content."
                )}
              </li>
              <li>
                <strong>
                  {t("smbPrivacy.infoWeCollect.item3.title", "Usage Data:")}
                </strong>{" "}
                {t(
                  "smbPrivacy.infoWeCollect.item3.desc",
                  "Information about how you access and use the PYMES Studio, such as IP address, browser type, operating system, pages viewed, features used, and timestamps of activity. This helps us improve our services."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "smbPrivacy.infoWeCollect.item4.title",
                    "End-User Data (Processed on Your Behalf):"
                  )}
                </strong>{" "}
                {t(
                  "smbPrivacy.infoWeCollect.item4.desc",
                  "Your website, powered by our platform, may collect information from your website visitors ('End-Users'), such as through contact forms. We process this data solely on your behalf and as directed by you. You are the controller of this End-User data."
                )}
              </li>
            </ul>
          </Section>

          <Section
            titleKey="smbPrivacy.howWeUseInfo.title"
            defaultTitle="3. How We Use Your Information"
          >
            <p>
              {t(
                "smbPrivacy.howWeUseInfo.p1",
                "We use the information we collect for purposes including:"
              )}
            </p>
            <ul className="list-disc list-outside pl-5 space-y-1 mt-2">
              <li>
                {t(
                  "smbPrivacy.howWeUseInfo.item1",
                  "To provide, operate, and maintain our SMB Services."
                )}
              </li>
              <li>
                {t(
                  "smbPrivacy.howWeUseInfo.item2",
                  "To process your transactions and manage your account."
                )}
              </li>
              <li>
                {t(
                  "smbPrivacy.howWeUseInfo.item3",
                  "To communicate with you, including sending service updates, support messages, and marketing communications (where permitted and with your consent if required)."
                )}
              </li>
              <li>
                {t(
                  "smbPrivacy.howWeUseInfo.item4",
                  "To improve and personalize our Services, including analytics and research."
                )}
              </li>
              <li>
                {t(
                  "smbPrivacy.howWeUseInfo.item5",
                  "To ensure security and prevent fraud."
                )}
              </li>
              <li>
                {t(
                  "smbPrivacy.howWeUseInfo.item6",
                  "To comply with legal obligations."
                )}
              </li>
            </ul>
          </Section>

          <Section
            titleKey="smbPrivacy.dataSharing.title"
            defaultTitle="4. Data Sharing and Disclosure"
          >
            <p>
              {t(
                "smbPrivacy.dataSharing.p1",
                "We do not sell your personal information. We may share your information in the following limited circumstances:"
              )}
            </p>
            <ul className="list-disc list-outside pl-5 space-y-1 mt-2">
              <li>
                <strong>
                  {t(
                    "smbPrivacy.dataSharing.item1.title",
                    "Service Providers:"
                  )}
                </strong>{" "}
                {t(
                  "smbPrivacy.dataSharing.item1.desc",
                  "With third-party vendors and service providers who perform services on our behalf (e.g., payment processing, hosting, analytics). These providers are contractually obligated to protect your data."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "smbPrivacy.dataSharing.item2.title",
                    "Legal Requirements:"
                  )}
                </strong>{" "}
                {t(
                  "smbPrivacy.dataSharing.item2.desc",
                  "If required by law, such as to comply with a subpoena, or if we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "smbPrivacy.dataSharing.item3.title",
                    "Business Transfers:"
                  )}
                </strong>{" "}
                {t(
                  "smbPrivacy.dataSharing.item3.desc",
                  "In connection with a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction."
                )}
              </li>
            </ul>
            <p className="mt-2">
              {t(
                "smbPrivacy.dataSharing.p2",
                "We will not share Client Content or End-User Data you control, except as directed by you or as required by law."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbPrivacy.dataSecurity.title"
            defaultTitle="5. Data Security"
          >
            <p>
              {t(
                "smbPrivacy.dataSecurity.p1",
                "We implement reasonable administrative, technical, and physical security measures to protect your information from unauthorized access, use, alteration, and destruction. However, no internet-based site can be 100% secure, so we cannot guarantee absolute security."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbPrivacy.dataRetention.title"
            defaultTitle="6. Data Retention"
          >
            <p>
              {t(
                "smbPrivacy.dataRetention.p1",
                "We retain your Client Account Information for as long as your account is active or as needed to provide you services and comply with our legal obligations. Client Content and End-User Data are retained according to your instructions and service agreement terms."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbPrivacy.yourRights.title"
            defaultTitle="7. Your Rights and Choices"
          >
            <p>
              {t(
                "smbPrivacy.yourRights.p1",
                "Depending on your location and applicable law, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict its processing. To exercise these rights, please contact us. As a Client, you are responsible for honoring such rights for the End-User Data you control."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbPrivacy.childrensPrivacy.title"
            defaultTitle="8. Children's Privacy"
          >
            <p>
              {t(
                "smbPrivacy.childrensPrivacy.p1",
                "Our SMB Services are not directed to individuals under the age of 16 (or a higher age if stipulated by local law). We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbPrivacy.policyChanges.title"
            defaultTitle="9. Changes to This Privacy Policy"
          >
            <p>
              {t(
                "smbPrivacy.policyChanges.p1",
                "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Effective Date' at the top. You are advised to review this Privacy Policy periodically for any changes."
              )}
            </p>
          </Section>

          <Section
            titleKey="smbPrivacy.contactUs.title"
            defaultTitle="10. Contact Us"
          >
            <p>
              {t(
                "smbPrivacy.contactUs.p1",
                "If you have any questions about this Privacy Policy, please contact us at:"
              )}
            </p>
            <p className="mt-2">
              [Your Company Name]
              <br />
              [Your Company Address]
              <br />
              Email: [Contact Email for Privacy Questions, e.g.,
              privacy@loyalshift.com]
            </p>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}
