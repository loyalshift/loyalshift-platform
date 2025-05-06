#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
IMAGE_NAME=${IMAGE_NAME:-"loyalshift-platform"}
DOCKER_USER_OR_ORG=${DOCKER_USER_OR_ORG:-"dasome29"} # Example: "dasome29"
DEPLOYMENT_NAME="loyalshift-platform-deployment" # Matches deployment.yaml
CONTAINER_NAME="loyalshift-platform-container" # Matches deployment.yaml
# Optional: Specify Kubeconfig path or leave empty to use default kubectl context
KUBECONFIG_PATH="./kubeconfig" # Example: "./kubeconfig"

# --- Script Logic ---

# Check for version argument
if [ -z "$1" ]; then
  echo "Usage: ./upgrade_deploy.sh <new-version>"
  echo "Example: ./upgrade_deploy.sh 1.5.0"
  exit 1
fi
NEW_VERSION=$1

# Check for Docker user/org
if [ -z "$DOCKER_USER_OR_ORG" ]; then
  echo "Error: DOCKER_USER_OR_ORG environment variable is not set."
  echo "Please set it: export DOCKER_USER_OR_ORG=\"your_docker_username\""
  exit 1
fi

# Construct the full image tag
FULL_IMAGE_TAG="${DOCKER_USER_OR_ORG}/${IMAGE_NAME}:${NEW_VERSION}"

# Construct kubeconfig option if path is provided
KUBECONFIG_OPT=""
if [ ! -z "$KUBECONFIG_PATH" ]; then
  if [ -f "$KUBECONFIG_PATH" ]; then
    KUBECONFIG_OPT="--kubeconfig=${KUBECONFIG_PATH}"
    echo "Using kubeconfig: ${KUBECONFIG_PATH}"
  else
    echo "Error: Kubeconfig file not found at: ${KUBECONFIG_PATH}"
    exit 1
  fi
else
    echo "Using default kubectl context."
fi

echo "-----------------------------------------"
echo "Starting Version Upgrade, Docker Build/Push, and K8s Deployment Update"
echo "-----------------------------------------"
echo "New Version: ${NEW_VERSION}"
echo "Full Image Tag: ${FULL_IMAGE_TAG}"
echo "Deployment: ${DEPLOYMENT_NAME}"
echo "Container: ${CONTAINER_NAME}"
echo "-----------------------------------------"

# 1. Update package version
echo "--> Updating package version to ${NEW_VERSION}..."
npm version ${NEW_VERSION} --no-git-tag-version # Or remove --no-git-tag-version to create git tags
echo "--> Version updated successfully."

# 2. Build Docker image
echo "--> Building Docker image: ${FULL_IMAGE_TAG}..."
docker build -t ${FULL_IMAGE_TAG} .
echo "--> Docker image built successfully."

# 3. Push Docker image
echo "--> Pushing Docker image (ensure you are logged in)..."
docker push ${FULL_IMAGE_TAG}
echo "--> Docker image pushed successfully."

# 4. Update Kubernetes Deployment image
echo "--> Updating Kubernetes deployment image..."
kubectl set image deployment/${DEPLOYMENT_NAME} ${CONTAINER_NAME}=${FULL_IMAGE_TAG} ${KUBECONFIG_OPT}
echo "--> Deployment image update command sent."

# 5. Check rollout status
echo "--> Waiting for deployment rollout to complete..."
kubectl rollout status deployment/${DEPLOYMENT_NAME} ${KUBECONFIG_OPT}
echo "--> Deployment rollout finished."

echo "-----------------------------------------"
echo "Process Complete!"
echo "Deployed Image: ${FULL_IMAGE_TAG} to deployment ${DEPLOYMENT_NAME}"
echo "-----------------------------------------"

exit 0
