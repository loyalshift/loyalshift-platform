#  LoyalShift Platform Frontend 

[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Built-blue?logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Deployable-blue?logo=kubernetes)](https://kubernetes.io/)

Modernize legacy systems safely and efficiently with LoyalShift's AI-powered platform. This repository contains the frontend application built with Create React App.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Getting Started (Local Development)](#getting-started-local-development)
  - [Prerequisites](#local-prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Available Scripts](#available-scripts)
- [Deployment Instructions (Docker & Kubernetes)](#deployment-instructions-docker--kubernetes)
  - [Prerequisites](#deployment-prerequisites)
  - [Step 1: Build the Docker Image](#step-1-build-the-docker-image)
  - [Step 2: Push the Docker Image](#step-2-push-the-docker-image)
  - [Step 3: Configure Kubernetes Manifests](#step-3-configure-kubernetes-manifests)
  - [Step 4: Apply Kubernetes Manifests](#step-4-apply-kubernetes-manifests)
  - [Step 5: Verify Deployment](#step-5-verify-deployment)
- [Kubernetes Manifest Details](#kubernetes-manifest-details)
- [Configuration Files](#configuration-files)
- [License](#license)

## Overview

This project is the user-facing frontend for the LoyalShift platform. It provides the interface for users to interact with LoyalShift's AI modernization capabilities. Built as a Single Page Application (SPA) using React and styled with Tailwind CSS.

## Technology Stack

- **Frontend Framework:** React 18.3.1 (via Create React App 5.0.1)
- **Routing:** React Router DOM 6.30.0
- **Styling:** Tailwind CSS 3.4.17 (with JIT compiler)
  - Plugins: `@tailwindcss/forms`, `@tailwindcss/typography`
- **Animation:** Framer Motion 12.6.3
- **State Management:** (Implicitly React Context/Hooks)
- **Charting:** Recharts 2.15.2
- **Notifications:** React Hot Toast 2.5.2
- **Icons:** React Icons 4.12.0
- **Development/Build:** Node.js 18 (for build), `react-scripts`
- **Web Server:** Nginx (stable-alpine image)
- **Containerization:** Docker (Multi-stage build)
- **Deployment:** Kubernetes
  - Ingress Controller: Nginx Ingress
  - TLS/SSL Certificates: Let's Encrypt via Cert-Manager

## Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine for development purposes.

### Local Prerequisites

- Node.js (v18 or later recommended - as used in Docker build)
- npm (usually comes with Node.js) or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd loyalshift-platform
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
    _or using yarn:_
    ```bash
    yarn install
    ```

### Running Locally

To start the development server:

```bash
npm start
```

This runs the app in development mode. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view it in your browser. The page will automatically reload when you make changes.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: **(Use with caution\!)** Removes the single build dependency and copies configuration files (Webpack, Babel, etc.) into your project for full control. This is a one-way operation.

## Deployment Instructions (Docker & Kubernetes)

This section outlines the steps to build the Docker image and deploy the application to a Kubernetes cluster using the provided manifest files.

### Deployment Prerequisites

1.  **Local Environment:**
    - Node.js & npm/yarn (for potential local builds if needed)
    - Docker installed and running.
    - `kubectl` command-line tool installed.
2.  **Target Environment:**
    - A running Kubernetes cluster.
    - `kubectl` configured to interact with your target cluster.
    - **Nginx Ingress Controller** installed and configured in your cluster.
    - **Cert-Manager** installed in your cluster.
    - A Docker registry (like Docker Hub, GCR, ECR, etc.) where you can push the built image. You need push access to this registry.
    - **DNS Records:** Ensure DNS A records for `loyalshift.com` and `www.loyalshift.com` are configured to point to the external IP address or LoadBalancer provided by your Nginx Ingress Controller.

### Step 1: Build the Docker Image

Navigate to the project's root directory (where the `Dockerfile` is located) and run the build command. Tag the image appropriately for your registry.

```bash
# Example using the tag from deployment.yaml and assuming Docker Hub user 'loyalshift'
docker build -t loyalshift/loyalshift-platform:v1.4 .

# Or build with a new version tag (replace <new-version>)
# docker build -t your-dockerhub-username/loyalshift-platform:<new-version> .
```

### Step 2: Push the Docker Image

Push the built image to your container registry. You might need to log in first.

```bash
# Login to your Docker registry (if required)
# docker login [your-registry-server]

# Push the image (use the same tag as in the build step)
docker push loyalshift/loyalshift-platform:v1.4
# Or: docker push your-dockerhub-username/loyalshift-platform:<new-version>
```

### Step 3: Configure Kubernetes Manifests

Before applying the manifests, ensure the following:

1.  **Image Tag (Optional):** If you built the image with a different tag in Step 1 & 2, update the `spec.template.spec.containers[0].image` field in `deployment.yaml` to match your new image tag.
2.  **Let's Encrypt Email:** **Crucially**, edit the `letsencrypt-issuer.yaml` file and change the placeholder email address in `spec.acme.email` to your valid administrative email address for Let's Encrypt notifications.

### Step 4: Apply Kubernetes Manifests

Apply the Kubernetes configuration files to your cluster in the following order:

```bash
# 1. Apply the ClusterIssuer for Cert-Manager (Requires updated email)
kubectl apply -f letsencrypt-issuer.yaml

# 2. Apply the Deployment to create the application pods
kubectl apply -f deployment.yaml

# 3. Apply the Service to enable internal communication
kubectl apply -f service.yaml

# 4. Apply the Ingress to expose the application externally and request TLS
kubectl apply -f loyalshift-ingress.yaml
```

### Step 5: Verify Deployment

Check the status of your Kubernetes resources:

1.  **Check Pods:** Ensure the pods are running.
    ```bash
    kubectl get pods -l app=loyalshift-platform
    # Look for STATUS 'Running' (might take a minute to pull the image)
    ```
2.  **Check Service:** Verify the service is created.
    ```bash
    kubectl get svc loyalshift-platform-service
    # Look for TYPE 'ClusterIP' and the correct PORT(S)
    ```
3.  **Check Ingress:** Confirm the Ingress is configured and has an address.
    ```bash
    kubectl get ingress loyalshift-ingress
    # Look for an ADDRESS (external IP/hostname) and the HOSTS listed
    ```
4.  **Check Certificate:** Verify Cert-Manager is processing the certificate request.
    ```bash
    kubectl describe certificate loyalshift-tls
    # Or: kubectl get certificate loyalshift-tls
    # Look for Events indicating success and Ready=True status (might take a few minutes)
    ```

Once the Ingress has an address and the certificate is ready, you should be able to access the application securely via `https://loyalshift.com` or `https://www.loyalshift.com`.

## Kubernetes Manifest Details

- `deployment.yaml`: Manages application pods (replicas, image, ports).
- `service.yaml`: Provides stable internal IP/DNS for the pods within the cluster (`ClusterIP` type).
- `letsencrypt-issuer.yaml`: Configures Cert-Manager to issue certificates using Let's Encrypt via HTTP01 challenges handled by Nginx Ingress.
- `loyalshift-ingress.yaml`: Manages external access, handles TLS termination using the Let's Encrypt certificate, and routes traffic to the service.

## Configuration Files

- `tailwind.config.js`: Configures Tailwind CSS, including custom colors, fonts (`Montserrat`), and plugins (`@tailwindcss/forms`, `@tailwindcss/typography`).
- `Dockerfile`: Defines the multi-stage build process for creating the production Docker image using Node.js and Nginx.
- `nginx.conf`: Custom Nginx configuration used within the Docker container to serve the SPA correctly.
- Kubernetes Manifests (`*.yaml`): Define resources for deploying the application to a Kubernetes cluster.

## License

This project is licensed under the **MIT License**.

See the `LICENSE` or `LICENSE.md` file in the repository for the full license text.
