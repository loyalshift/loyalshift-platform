// src/pages/smb/SMBDeployGuidePage.js (Updated with Interactive Domain Search)
import React, { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom"; // Added Link
import { motion } from "framer-motion";
import { FiCopy, FiCheck, FiSearch, FiFileText } from "react-icons/fi"; // Added FiSearch
import toast, { Toaster } from "react-hot-toast";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";
import { useLocalization } from "../../components/LocalizationContext";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// --- Reusable Components ---
const SectionHeader = ({ t, titleKey, introKey }) => (
  <motion.div variants={fadeInUp} className="mb-8">
    <h2 className={`text-3xl font-bold ${theme.textPrimary} mb-3`}>
      {t(titleKey)}
    </h2>
    <p className={`${theme.textSecondary} text-lg leading-relaxed`}>
      {t(introKey)}
    </p>
  </motion.div>
);

const StepCard = ({ t, number, titleKey, children, className }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex items-start gap-4 sm:gap-6 ${className}`}
  >
    <div
      className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ${theme.accentCyanBg}/20 flex items-center justify-center font-bold text-lg sm:text-xl ${theme.accentCyan}`}
    >
      {number}
    </div>
    <div className="flex-1 pt-1">
      <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>
        {t(titleKey)}
      </h3>
      <div className={`${theme.textSecondary} text-sm sm:text-base space-y-4`}>
        {children}
      </div>
    </div>
  </motion.div>
);

const CodeBlock = ({ codeString, language = "bash" }) => {
  const { t } = useLocalization();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString.trim());
    setCopied(true);
    toast.success(t("smbDeployGuideAdvanced.copiedButton", "Copied!"));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`my-3 rounded-lg overflow-hidden ${theme.cardShadow} bg-slate-800 relative group`}
    >
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 p-1.5 rounded-md text-slate-400 bg-slate-700/50 hover:bg-slate-600/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 ${theme.focusRingDefault}`}
        aria-label={t("smbDeployGuideAdvanced.copyCodeButton", "Copy code")}
      >
        {copied ? (
          <FiCheck className="w-4 h-4 text-green-400" />
        ) : (
          <FiCopy className="w-4 h-4" />
        )}
      </button>
      <pre
        className={`p-4 text-xs md:text-sm language-${language} text-slate-200 overflow-x-auto`}
      >
        <code>{codeString.trim()}</code>
      </pre>
    </div>
  );
};

const ImportantNote = ({ t }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-4 rounded-lg my-6 ${theme.warningBg} border ${theme.warningBorder}`}
  >
    <p className={`text-sm ${theme.warningText}`}>
      <strong className="font-semibold">Note:</strong>{" "}
      {t("smbDeployGuideAdvanced.importantNote")}
    </p>
  </motion.div>
);

// --- New Namecheap Widget Component ---
const NamecheapSearchWidget = ({ t }) => {
  const [domainToSearch, setDomainToSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (domainToSearch.trim()) {
      const searchUrl = `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(
        domainToSearch.trim()
      )}`;
      window.open(searchUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`mt-2 p-4 border ${theme.borderLight} rounded-lg ${theme.surfaceMuted}`}
    >
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          value={domainToSearch}
          onChange={(e) => setDomainToSearch(e.target.value)}
          placeholder={t(
            "smbDeployGuideAdvanced.namecheapPlaceholder",
            "e.g., my-awesome-business.com"
          )}
          className={`flex-grow px-3 py-2 ${theme.inputBg} ${theme.inputBorder} rounded-md shadow-sm ${theme.inputFocusStyle} ${theme.textPrimary} sm:text-sm transition-colors`}
          aria-label={t(
            "smbDeployGuideAdvanced.namecheapAriaLabel",
            "Domain name search input"
          )}
        />
        <button
          type="submit"
          className={`inline-flex items-center justify-center px-4 py-2 font-semibold text-sm rounded-md shadow-sm ${theme.accentCyanBg} ${theme.buttonTextDark} ${theme.accentCyanBgHover} transition-colors ${theme.focusRingDefault} disabled:opacity-50`}
          disabled={!domainToSearch.trim()}
        >
          <FiSearch className="w-4 h-4 mr-2" />
          {t(
            "smbDeployGuideAdvanced.namecheapSearchButton",
            "Check Availability"
          )}
        </button>
      </form>
      <p className={`text-xs ${theme.textMuted} mt-2 text-center sm:text-left`}>
        {t(
          "smbDeployGuideAdvanced.namecheapPoweredBy",
          "Domain search powered by Namecheap."
        )}
      </p>
    </div>
  );
};

export default function SMBDeployGuidePage() {
  const { t } = useLocalization();
  const [searchParams] = useSearchParams();

  // Get values from URL or use placeholders
  const domain = useMemo(
    () => searchParams.get("domain") || "<project-domain>",
    [searchParams]
  );
  const projectName = useMemo(
    () => searchParams.get("projectName") || "<project-name>",
    [searchParams]
  );
  const kubeconfigPath = useMemo(
    () => searchParams.get("kubeconfig") || "./path-to-your-kubeconfig",
    [searchParams]
  );
  const email = useMemo(
    () => searchParams.get("email") || "<project-acme-registration-email>",
    [searchParams]
  );

  const dockerImage = useMemo(
    () =>
      searchParams.get("dockerImage") ||
      `<your-docker-hub-username>/${projectName}:latest`,
    [searchParams]
  );

  const deploymentYamlSnippet = `
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${projectName}-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ${projectName}-app
  template:
    metadata:
      labels:
        app: ${projectName}-app
    spec:
      containers:
        - name: ${projectName}-container
          image: ${dockerImage}
          ports:
            - containerPort: 80 # Nginx's port`;

  // --- Dynamic Code Snippets ---
  const dockerfileSnippet = `
# Stage 1: Build the React application
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build artifacts from the previous stage to the default Nginx folder
COPY --from=build /app/build /usr/share/nginx/html

# (Optional but recommended for SPAs like React)
# Copy a custom Nginx configuration to handle client-side routing.
# Create a file named 'nginx.conf' in your project root.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx default port)
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]`;

  // --- Dynamic Code Snippets ---
  const nginxConfSnippet = `
server {
  listen 80;
  server_name _; # Listen on any hostname

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    # Redirect all non-file/dir requests to index.html for SPA routing
    try_files $uri $uri/ /index.html;
  }
}`;

  const letsEncryptIssuerSnippet = `
# letsencrypt-issuer.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: ${email}
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
      - http01:
          ingress:
            class: nginx`;

  const serviceYamlSnippet = `
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: ${projectName}-platform-service
spec:
  selector:
    app: ${projectName}-platform
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80`;

  const ingressYamlSnippet = `
# ${projectName}-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${projectName}-ingress
  namespace: default
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod 
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true" 
spec:
  ingressClassName: nginx 
  tls: 
  - hosts:
    - ${domain}
    - www.${domain}   
    secretName: ${projectName}-tls 
  rules:
  - host: ${domain} 
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ${projectName}-platform-service
            port:
              number: 80
  - host: www.${domain}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ${projectName}-platform-service
            port:
              number: 80`;

  const installIngressControllerCmd = `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml`;
  const installCertManagerCmd = `kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.5/cert-manager.yaml`;
  const applyIssuerCmd = `kubectl apply -f letsencrypt-issuer.yaml`;
  const applyAppCmd = `kubectl apply -f your-file.yaml --kubeconfig=${kubeconfigPath}`;

  return (
    <div className={`min-h-screen py-16 md:py-20 ${theme.background}`}>
      <Toaster position="bottom-right" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h1
              className={`text-4xl sm:text-5xl font-extrabold ${theme.textPrimary} mb-4`}
            >
              {t("smbDeployGuideAdvanced.mainTitle")}
            </h1>
            <p
              className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}
            >
              {t("smbDeployGuideAdvanced.mainSubtitle")}
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-16">
            {/* Part 1: Domain & DNS */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideAdvanced.part1Title"
              introKey="smbDeployGuideAdvanced.part1Intro"
            />
            <div className="space-y-8">
              <StepCard
                number="1"
                t={t}
                titleKey="smbDeployGuideAdvanced.part1Step1Title"
              >
                <p>{t("smbDeployGuideAdvanced.part1Step1Desc1")}</p>
                <NamecheapSearchWidget t={t} />{" "}
                {/* <-- REPLACED SIMPLE LINK WITH WIDGET */}
                <p className="mt-4">
                  {t("smbDeployGuideAdvanced.part1Step1Desc2")}
                </p>
              </StepCard>
              <StepCard
                number="2"
                t={t}
                titleKey="smbDeployGuideAdvanced.part1Step2Title"
              >
                <p>{t("smbDeployGuideAdvanced.part1Step2Desc1")}</p>
                <p className="font-semibold">
                  {t("smbDeployGuideAdvanced.part1Step2Desc2")}
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>{t("smbDeployGuideAdvanced.part1Step2Host1")}</li>
                  <li>{t("smbDeployGuideAdvanced.part1Step2Host2")}</li>
                </ul>
                <p>{t("smbDeployGuideAdvanced.part1Step2Note")}</p>
              </StepCard>
            </div>
            <hr className={`${theme.border} my-8`} />

            {/* Part 2: Dockerization */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideAdvanced.part2Title"
              introKey="smbDeployGuideAdvanced.part2Intro"
            />
            <div className="space-y-8">
              <StepCard
                number="3"
                t={t}
                titleKey="smbDeployGuideAdvanced.part2Step1Title"
              >
                <p>{t("smbDeployGuideAdvanced.part2Step1Desc")}</p>
                <CodeBlock
                  icon={<FiFileText />}
                  title="Dockerfile"
                  tKeyTitle="smbDeployGuideAdvanced.dockerfileTitle"
                  codeString={dockerfileSnippet}
                  language="dockerfile"
                />
              </StepCard>
              <StepCard
                number="4"
                t={t}
                titleKey="smbDeployGuideAdvanced.part2Step2Title"
              >
                <p>{t("smbDeployGuideAdvanced.part2Step2Desc")}</p>
                <CodeBlock
                  icon={<FiFileText />}
                  title="nginx.conf"
                  tKeyTitle="smbDeployGuideAdvanced.nginxConfTitle"
                  codeString={nginxConfSnippet}
                  language="nginx"
                />
              </StepCard>
            </div>
            <hr className={`${theme.border} my-8`} />

            {/* Part 3: Kubernetes Setup */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideAdvanced.part3Title"
              introKey="smbDeployGuideAdvanced.part3Intro"
            />
            <div className="space-y-8">
              <StepCard
                number="5"
                t={t}
                titleKey="smbDeployGuideAdvanced.part3Step1Title"
              >
                <p>{t("smbDeployGuideAdvanced.part3Step1Desc")}</p>
                <CodeBlock codeString={installIngressControllerCmd} />
              </StepCard>
              <StepCard
                number="6"
                t={t}
                titleKey="smbDeployGuideAdvanced.part3Step2Title"
              >
                <p>{t("smbDeployGuideAdvanced.part3Step2Desc")}</p>
                <CodeBlock codeString={installCertManagerCmd} />
              </StepCard>
              <StepCard
                number="7"
                t={t}
                titleKey="smbDeployGuideAdvanced.part3Step3Title"
              >
                <p>{t("smbDeployGuideAdvanced.part3Step3Desc")}</p>
                <CodeBlock
                  codeString={letsEncryptIssuerSnippet}
                  language="yaml"
                />
                <CodeBlock codeString={applyIssuerCmd} />
              </StepCard>
            </div>
            <hr className={`${theme.border} my-8`} />

            {/* Part 4: Application Deployment Files */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideAdvanced.part4Title"
              introKey="smbDeployGuideAdvanced.part4Intro"
            />
            <div className="space-y-8">
              <StepCard
                number="8"
                t={t}
                titleKey="smbDeployGuideAdvanced.part4File1Title"
              >
                <p>{t("smbDeployGuideAdvanced.part4File1Desc")}</p>
                <CodeBlock
                  icon={<FiFileText />}
                  title="service.yaml"
                  tKeyTitle="smbDeployGuideAdvanced.serviceYamlTitle"
                  codeString={serviceYamlSnippet}
                  language="yaml"
                />
              </StepCard>
              <StepCard
                number="9"
                t={t}
                titleKey="smbDeployGuideAdvanced.part4File2Title"
              >
                <p>{t("smbDeployGuideAdvanced.part4File2Desc")}</p>
                <CodeBlock
                  icon={<FiFileText />}
                  title="deployment.yaml"
                  tKeyTitle="smbDeployGuideAdvanced.deploymentYamlTitle"
                  codeString={deploymentYamlSnippet}
                  language="yaml"
                />
              </StepCard>
              <StepCard
                number="10"
                t={t}
                titleKey="smbDeployGuideAdvanced.part4File3Title"
              >
                <p>{t("smbDeployGuideAdvanced.part4File3Desc")}</p>
                <CodeBlock
                  icon={<FiFileText />}
                  title={`${projectName}-ingress.yaml`}
                  tKeyTitle="smbDeployGuideAdvanced.ingressYamlTitle"
                  codeString={ingressYamlSnippet}
                  language="yaml"
                />
              </StepCard>
            </div>
            <hr className={`${theme.border} my-8`} />

            {/* Part 4: Application Deployment Files */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideAdvanced.part4Title"
              introKey="smbDeployGuideAdvanced.part4Intro"
            />
            <div className="space-y-8">
              <StepCard
                number="8"
                t={t}
                titleKey="smbDeployGuideAdvanced.part4File1Title"
              >
                <p>{t("smbDeployGuideAdvanced.part4File1Desc")}</p>
                <CodeBlock codeString={serviceYamlSnippet} language="yaml" />
              </StepCard>
              <StepCard
                number="9"
                t={t}
                titleKey="smbDeployGuideAdvanced.part4File2Title"
              >
                <p>{t("smbDeployGuideAdvanced.part4File2Desc")}</p>
                <CodeBlock codeString={ingressYamlSnippet} language="yaml" />
              </StepCard>
            </div>
            <hr className={`${theme.border} my-8`} />

            {/* Part 5: Deployment */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideAdvanced.part5Title"
              introKey="smbDeployGuideAdvanced.part5Intro"
            />
            <div className="space-y-8">
              <StepCard
                number="10"
                t={t}
                titleKey="smbDeployGuideAdvanced.part5Step1Title"
              >
                <p>{t("smbDeployGuideAdvanced.part5Step1Desc")}</p>
                <ImportantNote t={t} />
                <CodeBlock codeString={applyAppCmd} />
              </StepCard>
            </div>
            <hr className={`${theme.border} my-8`} />

            {/* Conclusion */}
            <motion.div
              variants={fadeInUp}
              className={`text-center p-8 rounded-xl ${theme.surfaceMuted} border ${theme.border}`}
            >
              <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-3`}>
                {t("smbDeployGuideAdvanced.conclusionTitle")}
              </h2>
              <p className={theme.textSecondary}>
                {t("smbDeployGuideAdvanced.conclusionText")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
