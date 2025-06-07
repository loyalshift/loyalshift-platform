// src/components/smb/studio/assets/AssetLibraryComponent.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import Button from "../../Button";
import {
  FiUploadCloud,
  FiImage,
  FiFilm,
  FiHardDrive,
  FiCheckCircle,
  FiLoader,
  FiSearch,
  FiSliders,
  FiGrid,
  FiFile,
} from "react-icons/fi";
import { useLocalization } from "../../LocalizationContext";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme"; // Corrected path

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const cardVariants = {
  // Used by AssetCard (assumed)
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

// --- Reusable Form Field for VeoGeneratorComponent ---
const VeoFormField = React.memo(
  ({
    id,
    label,
    t,
    labelKey,
    defaultLabel,
    children,
    required,
    className = "",
  }) => {
    const labelBaseClasses = `block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-0.5`;
    return (
      <div className={className}>
        <label htmlFor={id} className={labelBaseClasses}>
          {t(labelKey, defaultLabel || label)}
          {required && <span className={`ml-1 ${theme.errorText}`}>*</span>}
        </label>
        {children}
      </div>
    );
  }
);
VeoFormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string, // Optional if using labelKey
  t: PropTypes.func.isRequired,
  labelKey: PropTypes.string.isRequired,
  defaultLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};
VeoFormField.displayName = "VeoFormField";

// --- Generation Type Button for VeoGeneratorComponent ---
const VeoGenerationTypeButton = React.memo(
  ({ t, typeKey, labelKey, currentType, onClick }) => (
    <Button
      variant={currentType === typeKey ? "primary" : "secondary"}
      size="sm"
      onClick={() => onClick(typeKey)}
      className={`!text-xs sm:!text-sm !font-medium ${
        currentType === typeKey
          ? `${theme.buttonPrimaryBg} ${theme.buttonPrimaryText}`
          : `${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg}`
      }`}
    >
      {t(labelKey)}
    </Button>
  )
);
VeoGenerationTypeButton.propTypes = {
  t: PropTypes.func.isRequired,
  typeKey: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  currentType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
VeoGenerationTypeButton.displayName = "VeoGenerationTypeButton";

// --- Status Message for VeoGeneratorComponent ---
const VeoStatusMessage = React.memo(({ t, message, type }) => {
  if (!message) return null;

  let bgClass = `${theme.infoBoxBg} border-l-4 ${theme.infoBoxBorder} ${theme.infoBoxText}`;
  if (type === "error") {
    bgClass = `${theme.errorBg} border-l-4 ${theme.errorBorder} ${theme.errorText}`;
  } else if (type === "success") {
    bgClass = `${theme.successBg} border-l-4 ${theme.successBorder} ${theme.successText}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`mt-4 sm:mt-5 p-3 ${bgClass} rounded text-xs sm:text-sm`}
    >
      {type === "success" && (
        <FiCheckCircle className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2" />
      )}
      {message}
    </motion.div>
  );
});
VeoStatusMessage.propTypes = {
  t: PropTypes.func.isRequired,
  message: PropTypes.string,
  type: PropTypes.oneOf(["info", "error", "success"]),
};
VeoStatusMessage.displayName = "VeoStatusMessage";

// --- Generated Video Preview for VeoGeneratorComponent ---
const VeoGeneratedVideoPreview = React.memo(
  ({ t, videoUrl, videoName, onAddToLibrary }) => {
    if (!videoUrl) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-5 sm:mt-6 p-3 sm:p-4 border ${theme.border} rounded-lg ${theme.surfaceMuted}`}
      >
        <h3
          className={`text-sm sm:text-md font-semibold ${theme.textPrimary} mb-2`}
        >
          {videoName || t("assetLibrary.generator.generatedVideo.title")}
        </h3>
        <video
          controls
          src={videoUrl}
          className={`w-full max-w-md rounded-md border ${theme.border} shadow-lg mb-3 bg-black`}
        >
          {t("assetLibrary.generator.generatedVideo.unsupported")}
        </video>
        <Button
          variant="primary"
          onClick={onAddToLibrary}
          className={`w-full sm:w-auto !py-2 sm:!py-2.5 ${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`}
          icon={<FiUploadCloud className="w-4 h-4 sm:w-5 sm:h-5" />}
        >
          {t("assetLibrary.generator.generatedVideo.addToLibrary")}
        </Button>
      </motion.div>
    );
  }
);
VeoGeneratedVideoPreview.propTypes = {
  t: PropTypes.func.isRequired,
  videoUrl: PropTypes.string,
  videoName: PropTypes.string,
  onAddToLibrary: PropTypes.func.isRequired,
};
VeoGeneratedVideoPreview.displayName = "VeoGeneratedVideoPreview";

// --- VeoGeneratorComponent (AI Video Generation) ---
const VeoGeneratorComponent = React.memo(({ t, onAssetGenerated }) => {
  const [generationType, setGenerationType] = useState("text-to-video");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [durationSeconds, setDurationSeconds] = useState(5);
  const [inputImageFile, setInputImageFile] = useState(null);
  const [inputImagePreview, setInputImagePreview] = useState("");
  const [personGeneration, setPersonGeneration] = useState("dont_allow");
  const [awareOfCost, setAwareOfCost] = useState(false);

  const [generationState, setGenerationState] = useState({
    isLoading: false,
    operationId: null,
    pollingIntervalId: null,
    generatedVideoUrl: "",
    generatedVideoName: "",
    statusMessage: "",
    statusType: "info", // 'info', 'error', 'success'
    addedToLibraryMessage: "",
  });

  const resetGenerationState = useCallback(() => {
    setGenerationState((prev) => ({
      ...prev,
      isLoading: false,
      operationId: null,
      generatedVideoUrl: "",
      generatedVideoName: "",
      statusMessage: "",
      statusType: "info",
    }));
    if (generationState.pollingIntervalId) {
      clearInterval(generationState.pollingIntervalId);
      setGenerationState((prev) => ({ ...prev, pollingIntervalId: null }));
    }
  }, [generationState.pollingIntervalId]);

  const updateStatus = useCallback((message, type = "info") => {
    setGenerationState((prev) => ({
      ...prev,
      statusMessage: message,
      statusType: type,
    }));
  }, []);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setInputImageFile(file);
      setInputImagePreview(URL.createObjectURL(file));
    } else {
      setInputImageFile(null);
      setInputImagePreview("");
    }
  }, []);

  const pollStatus = useCallback(
    async (currentOpId) => {
      let attempts = 0;
      const maxAttempts = 30; // Poll for up to 30 * 10s = 5 minutes
      const interval = 10000; // 10 seconds

      const poller = setInterval(async () => {
        if (attempts >= maxAttempts) {
          clearInterval(poller);
          setGenerationState((prev) => ({
            ...prev,
            isLoading: false,
            pollingIntervalId: null,
            statusMessage: t(
              "assetLibrary.generator.error.timeout",
              "Generation timed out. Please check later or try again."
            ),
            statusType: "error",
          }));
          return;
        }
        attempts++;
        updateStatus(
          t(
            "assetLibrary.generator.status.pollingBackend",
            `Checking status... Attempt ${attempts}/${maxAttempts}`
          )
        );

        try {
          const statusResponse = await fetch(
            `/api/veo/operation-status/${currentOpId}`
          );
          if (!statusResponse.ok) {
            console.warn(`Polling error: ${statusResponse.status}`);
            // Don't necessarily stop polling for all errors, backend might recover
            if (statusResponse.status === 404) {
              // Operation ID not found
              clearInterval(poller);
              setGenerationState((prev) => ({
                ...prev,
                isLoading: false,
                pollingIntervalId: null,
                statusMessage: t(
                  "assetLibrary.generator.error.operationNotFound",
                  "Operation not found. It might have expired or failed."
                ),
                statusType: "error",
              }));
            }
            return;
          }
          const statusResult = await statusResponse.json();

          if (statusResult.done) {
            clearInterval(poller);
            setGenerationState((prev) => ({
              ...prev,
              isLoading: false,
              pollingIntervalId: null,
            }));
            if (statusResult.error) {
              updateStatus(
                statusResult.error.message ||
                  t("assetLibrary.generator.error.generationFailedResource"),
                "error"
              );
            } else if (
              statusResult.generatedVideos &&
              statusResult.generatedVideos.length > 0
            ) {
              const videoData = statusResult.generatedVideos[0];
              let videoName = prompt
                ? `${prompt.substring(0, 20)}...`
                : generationType === "image-to-video" && inputImageFile
                ? `Video from ${inputImageFile.name.substring(0, 15)}...`
                : `AI Video`;
              videoName += ` (${t("assetLibrary.generator.aiGeneratedBadge")})`;

              setGenerationState((prev) => ({
                ...prev,
                generatedVideoUrl: videoData.uri,
                generatedVideoName: videoName,
                statusMessage: t(
                  "assetLibrary.generator.status.generationComplete",
                  "Video ready!"
                ),
                statusType: "success",
              }));
            } else {
              updateStatus(
                t(
                  "assetLibrary.generator.error.noVideoGenerated",
                  "Generation completed, but no video was returned."
                ),
                "error"
              );
            }
          }
          // else: still processing, continue polling
        } catch (err) {
          console.error("Polling error:", err);
          updateStatus(
            t(
              "assetLibrary.generator.error.pollingFailed",
              "Error checking status."
            ),
            "error"
          );
          // Consider stopping polling on critical client-side errors
        }
      }, interval);
      setGenerationState((prev) => ({ ...prev, pollingIntervalId: poller }));
    },
    [t, updateStatus, prompt, generationType, inputImageFile]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!awareOfCost) {
        updateStatus(
          t("assetLibrary.generator.error.acknowledgeTerms"),
          "error"
        );
        return;
      }
      if (!prompt.trim() && generationType === "text-to-video") {
        updateStatus(t("assetLibrary.generator.error.promptRequired"), "error");
        return;
      }
      if (!inputImageFile && generationType === "image-to-video") {
        updateStatus(
          t("assetLibrary.generator.error.imageRequiredForImageToVideo"),
          "error"
        );
        return;
      }

      setGenerationState((prev) => ({
        ...prev,
        isLoading: true,
        generatedVideoUrl: "",
        generatedVideoName: "",
        statusMessage: "",
        statusType: "info",
        addedToLibraryMessage: "",
        operationId: null,
      }));
      if (generationState.pollingIntervalId)
        clearInterval(generationState.pollingIntervalId);

      try {
        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("negativePrompt", negativePrompt);
        formData.append("generationType", generationType);
        formData.append("aspectRatio", aspectRatio);
        formData.append("durationSeconds", durationSeconds.toString());
        formData.append("personGeneration", personGeneration);
        if (generationType === "image-to-video" && inputImageFile) {
          formData.append("image", inputImageFile);
        }

        updateStatus(
          t(
            "assetLibrary.generator.status.sendingRequest",
            "Sending request to server..."
          )
        );
        const startResponse = await fetch("/api/veo/generate-video", {
          method: "POST",
          body: formData,
        });

        if (!startResponse.ok) {
          const errorData = await startResponse
            .json()
            .catch(() => ({ message: "Failed to parse error response" }));
          throw new Error(
            errorData.message || "Failed to start video generation"
          );
        }

        const startResult = await startResponse.json();
        setGenerationState((prev) => ({
          ...prev,
          operationId: startResult.operationId,
        }));
        updateStatus(
          t(
            "assetLibrary.generator.status.generationStartedBackend",
            "Video generation started. Polling for status..."
          )
        );
        pollStatus(startResult.operationId);
      } catch (err) {
        console.error("Error starting Veo generation:", err);
        updateStatus(
          err.message || t("assetLibrary.generator.error.startFailed"),
          "error"
        );
        setGenerationState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [
      awareOfCost,
      prompt,
      generationType,
      inputImageFile,
      negativePrompt,
      aspectRatio,
      durationSeconds,
      personGeneration,
      t,
      updateStatus,
      pollStatus,
      generationState.pollingIntervalId,
    ]
  );

  useEffect(() => {
    // Cleanup polling on unmount
    return () => {
      if (generationState.pollingIntervalId)
        clearInterval(generationState.pollingIntervalId);
    };
  }, [generationState.pollingIntervalId]);

  const handleAddToLibrary = useCallback(() => {
    if (generationState.generatedVideoUrl && onAssetGenerated) {
      onAssetGenerated({
        name: generationState.generatedVideoName,
        url: generationState.generatedVideoUrl,
        type: "video",
        size: t("assetLibrary.generator.sizeNA"),
        uploadedAt: new Date().toISOString().split("T")[0],
        isAIGenerated: true,
        // originalOperationId: generationState.operationId, // Optional
      });
      setGenerationState((prev) => ({
        ...prev,
        addedToLibraryMessage: t("assetLibrary.generator.success.videoAdded"),
        generatedVideoUrl: "", // Clear video after adding
        generatedVideoName: "",
        statusMessage: "", // Clear previous status
      }));
      // Optionally reset more form fields
      setPrompt("");
      setNegativePrompt("");
      setInputImageFile(null);
      setInputImagePreview("");
    }
  }, [
    generationState.generatedVideoUrl,
    generationState.generatedVideoName,
    /*generationState.operationId,*/ onAssetGenerated,
    t,
  ]);

  useEffect(() => {
    // Clear "added to library" message after a delay
    let timer;
    if (generationState.addedToLibraryMessage) {
      timer = setTimeout(
        () =>
          setGenerationState((prev) => ({
            ...prev,
            addedToLibraryMessage: "",
          })),
        3000
      );
    }
    return () => clearTimeout(timer);
  }, [generationState.addedToLibraryMessage]);

  const handleGenerationTypeChange = useCallback(
    (newType) => {
      setGenerationType(newType);
      setInputImageFile(null);
      setInputImagePreview("");
      // setPrompt(""); // Keep prompt if user is switching back and forth quickly? Or clear? User preference.
      updateStatus(""); // Clear status messages
    },
    [updateStatus]
  );

  const inputBaseClasses = `mt-1 block w-full px-3 py-2 text-sm ${theme.inputBg} ${theme.textPrimary} border ${theme.inputBorder} rounded-md shadow-sm ${theme.inputFocusStyle}`;

  return (
    <div
      className={`p-4 sm:p-6 ${theme.surfaceCard} rounded-xl border ${theme.border} shadow-lg`}
    >
      <h2
        className={`text-lg sm:text-xl font-semibold ${theme.textPrimary} mb-1 flex items-center`}
      >
        <FiFilm
          className={`w-5 h-6 sm:w-6 sm:h-6 mr-2 ${theme.textHighlight}`}
        />
        {t("assetLibrary.generator.title")}
        <span
          className={`text-[10px] sm:text-xs ml-2 px-2 py-0.5 ${theme.accentCyanBg}/20 ${theme.accentCyan} rounded-full font-medium`}
        >
          {t("assetLibrary.generator.veoPowered", "Veo Powered")}
        </span>
      </h2>
      <p className={`text-xs ${theme.textMuted} mb-4 sm:mb-5`}>
        {t(
          "assetLibrary.generator.veoSubtitle",
          "Generate high-quality videos from text or images."
        )}
      </p>

      {/* Cost Awareness Section */}
      <div
        className={`mb-4 sm:mb-5 p-3 sm:p-4 ${theme.warningBg} border-l-4 ${theme.warningBorder} ${theme.warningText} rounded-md text-xs sm:text-sm`}
      >
        <p className="font-bold">
          {t(
            "assetLibrary.generator.notice.veoSpecificTitle",
            "Veo API Notice:"
          )}
        </p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>
            {t(
              "assetLibrary.generator.notice.paidFeatureVeo",
              "Veo is a paid Google AI feature."
            )}
          </li>
          <li>
            {t(
              "assetLibrary.generator.notice.apiKeyRequired",
              "Requires backend setup with a valid Gemini API key."
            )}
          </li>
          <li>
            {t(
              "assetLibrary.generator.notice.generationTime",
              "Actual video generation may take 2-6 minutes."
            )}
          </li>
        </ul>
        <div className="mt-2 sm:mt-3">
          <label
            htmlFor="costAwareCheckbox"
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="costAwareCheckbox"
              checked={awareOfCost}
              onChange={(e) => {
                setAwareOfCost(e.target.checked);
                if (e.target.checked) updateStatus("");
              }}
              className={`mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded ${
                theme.inputBorder
              } text-cyan-600 ${theme.inputFocusRing.replace(
                "focus:ring-2",
                "focus:ring-1"
              )} ${theme.inputBg}`}
            />
            {t(
              "assetLibrary.generator.notice.acknowledgeTermsVeo",
              "I understand Veo usage incurs costs."
            )}
          </label>
        </div>
      </div>

      {/* Generation Type Selection */}
      <div className="mb-5 sm:mb-6">
        <span
          className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1.5`}
        >
          {t("assetLibrary.generator.generationType.label")}
        </span>
        <div className="flex space-x-1 sm:space-x-2">
          <VeoGenerationTypeButton
            t={t}
            typeKey="text-to-video"
            labelKey="assetLibrary.generator.generationType.textToVideo"
            currentType={generationType}
            onClick={handleGenerationTypeChange}
          />
          <VeoGenerationTypeButton
            t={t}
            typeKey="image-to-video"
            labelKey="assetLibrary.generator.generationType.imageToVideo"
            currentType={generationType}
            onClick={handleGenerationTypeChange}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <VeoFormField
          t={t}
          id="veo-prompt"
          labelKey="assetLibrary.generator.prompt.labelVeo"
          required={generationType === "text-to-video"}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="3"
            placeholder={t(
              generationType === "image-to-video"
                ? "assetLibrary.generator.prompt.placeholderImageToVideoVeo"
                : "assetLibrary.generator.prompt.placeholderTextToVideoVeo"
            )}
            className={inputBaseClasses}
          />
          <p className={`text-xs ${theme.textMuted} mt-1`}>
            {t(
              "assetLibrary.generator.prompt.exampleVeo",
              'E.g., "Panning wide shot of a calico kitten sleeping in the sunshine"'
            )}
          </p>
        </VeoFormField>

        {generationType === "image-to-video" && (
          <VeoFormField
            t={t}
            id="veo-image"
            labelKey="assetLibrary.generator.inputImage.labelVeo"
            required
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleImageUpload}
              className={`mt-1 block w-full text-xs sm:text-sm ${theme.textSecondary} file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg}`}
            />
            {inputImagePreview && (
              <div className="mt-2">
                <img
                  src={inputImagePreview}
                  alt={t("assetLibrary.generator.inputImage.altPreview")}
                  className={`max-h-28 sm:max-h-32 rounded-md border ${theme.border} shadow-sm`}
                />
              </div>
            )}
          </VeoFormField>
        )}

        <VeoFormField
          t={t}
          id="veo-negative-prompt"
          labelKey="assetLibrary.generator.negativePrompt.label"
        >
          <input
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder={t(
              "assetLibrary.generator.negativePrompt.placeholderVeo",
              "E.g., blurry, low quality, text overlays"
            )}
            className={inputBaseClasses}
          />
        </VeoFormField>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <VeoFormField
            t={t}
            id="veo-aspect-ratio"
            labelKey="assetLibrary.generator.aspectRatio.label"
          >
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className={inputBaseClasses}
            >
              <option value="16:9">
                {t(
                  "assetLibrary.generator.aspectRatio.landscapeVeo",
                  "16:9 (Landscape)"
                )}
              </option>
              <option value="9:16">
                {t(
                  "assetLibrary.generator.aspectRatio.portraitVeo",
                  "9:16 (Portrait)"
                )}
              </option>
            </select>
          </VeoFormField>
          <VeoFormField
            t={t}
            id="veo-duration"
            labelKey="assetLibrary.generator.duration.labelVeo"
            defaultLabel="Duration (5-8s)"
          >
            <input
              type="number"
              value={durationSeconds}
              onChange={(e) =>
                setDurationSeconds(
                  Math.max(5, Math.min(8, parseInt(e.target.value, 10) || 5))
                )
              }
              min="5"
              max="8"
              step="1"
              className={inputBaseClasses}
            />
          </VeoFormField>
          <VeoFormField
            t={t}
            id="veo-person-generation"
            labelKey="assetLibrary.generator.personGeneration.label"
          >
            <select
              value={personGeneration}
              onChange={(e) => setPersonGeneration(e.target.value)}
              className={inputBaseClasses}
            >
              <option value="dont_allow">
                {t(
                  "assetLibrary.generator.personGeneration.dontAllow",
                  "Don't Allow People"
                )}
              </option>
              <option value="allow_adult">
                {t(
                  "assetLibrary.generator.personGeneration.allowAdult",
                  "Allow Adults"
                )}
              </option>
            </select>
          </VeoFormField>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={`w-full !py-2.5 sm:!py-3 ${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg} ${theme.focusRingDefault}`}
          disabled={generationState.isLoading || !awareOfCost}
          icon={
            generationState.isLoading ? (
              <FiLoader className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <FiFilm className="w-4 h-4 sm:w-5 sm:h-5" />
            )
          }
        >
          {generationState.isLoading
            ? generationState.operationId
              ? t("assetLibrary.generator.button.generatingInProgress")
              : t("assetLibrary.generator.button.startingGeneration")
            : t("assetLibrary.generator.button.generateVideo")}
        </Button>
      </form>

      <AnimatePresence>
        <VeoStatusMessage
          t={t}
          message={generationState.statusMessage}
          type={generationState.statusType}
        />
        <VeoStatusMessage
          t={t}
          message={generationState.addedToLibraryMessage}
          type="success"
        />
      </AnimatePresence>

      {!generationState.isLoading && (
        <VeoGeneratedVideoPreview
          t={t}
          videoUrl={generationState.generatedVideoUrl}
          videoName={generationState.generatedVideoName}
          onAddToLibrary={handleAddToLibrary}
        />
      )}
    </div>
  );
});
VeoGeneratorComponent.propTypes = {
  t: PropTypes.func.isRequired,
  onAssetGenerated: PropTypes.func.isRequired,
};
VeoGeneratorComponent.displayName = "VeoGeneratorComponent";

// --- AssetCard Component (Assumed to be defined elsewhere and imported or defined here) ---
const AssetCard = React.memo(({ asset, t }) => {
  // Basic placeholder - replace with your actual AssetCard implementation
  const isImage = asset.type === "image";
  const isVideo = asset.type === "video";

  return (
    <motion.div
      variants={cardVariants} // Ensure cardVariants is defined or imported
      className={`group relative aspect-square ${theme.surfaceMuted} rounded-lg overflow-hidden shadow-sm border ${theme.borderLight} hover:shadow-md transition-all duration-200 ease-out`}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center ${theme.background}`}
      >
        {isImage && (
          <FiImage className={`w-1/3 h-1/3 ${theme.textMuted} opacity-80`} />
        )}
        {isVideo && (
          <FiFilm className={`w-1/3 h-1/3 ${theme.textMuted} opacity-80`} />
        )}
        {!isImage && !isVideo && (
          <FiFile className={`w-1/3 h-1/3 ${theme.textMuted} opacity-80`} />
        )}
      </div>
      {/* Placeholder for actual image/video preview if URL is available */}
      {/* <img src={asset.thumbnailUrl || asset.url} alt={asset.name} className="absolute inset-0 w-full h-full object-cover" /> */}

      <div
        className={`absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/70 to-transparent`}
      >
        <h3
          className="text-xs sm:text-sm font-semibold text-white truncate"
          title={asset.name}
        >
          {asset.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[10px] sm:text-xs text-gray-300">{asset.size}</p>
          {asset.isAIGenerated && (
            <span
              className={`text-[9px] px-1.5 py-0.5 bg-cyan-500/30 text-cyan-100 rounded-full font-medium`}
            >
              {t("assetLibrary.aiGeneratedBadgeShort", "AI")}
            </span>
          )}
        </div>
      </div>
      {/* Add hover effects or action buttons here */}
    </motion.div>
  );
});
AssetCard.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["image", "video", "audio", "document", "other"])
      .isRequired,
    size: PropTypes.string,
    uploadedAt: PropTypes.string,
    url: PropTypes.string, // For preview or download
    thumbnailUrl: PropTypes.string, // Optional for previews
    isAIGenerated: PropTypes.bool,
  }).isRequired,
  t: PropTypes.func.isRequired,
};
AssetCard.displayName = "AssetCard";

// --- Placeholder Upload Button ---
const UploadAssetButton = React.memo(({ t, onClick }) => (
  <Button
    onClick={onClick}
    variant="primary"
    size="sm"
    icon={<FiUploadCloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
    className={`!text-xs sm:!text-sm !font-medium ${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`}
  >
    {t("assetLibrary.button.uploadAsset")}
  </Button>
));
UploadAssetButton.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
UploadAssetButton.displayName = "UploadAssetButton";

// --- Main AssetLibraryComponent ---
export default function AssetLibraryComponent() {
  const { t } = useLocalization();
  const [assets, setAssets] = useState([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("generator"); // Default to generator

  const assetTabs = useMemo(
    () => [
      {
        nameKey: "assetLibrary.title.myLibrary",
        id: "library",
        icon: <FiGrid />,
        defaultLabel: "My Library",
      },
      {
        nameKey: "assetLibrary.title.aiGenerator",
        id: "generator",
        icon: <FiFilm />,
        defaultLabel: "AI Video Generator (Veo)",
      },
      // { nameKey: "assetLibrary.title.googleDrive", id: "drive", icon: <FiHardDrive />, defaultLabel: "Google Drive (Soon)" },
    ],
    []
  ); // t is not needed here as keys are static

  const currentTabConfig = useMemo(
    () => assetTabs.find((tab) => tab.id === activeView) || assetTabs[0],
    [activeView, assetTabs]
  );

  useEffect(() => {
    if (activeView === "library") {
      setIsLoadingLibrary(true);
      // Simulate API call
      setTimeout(() => {
        setAssets([
          // Ensure your theme supports these colors for the AI badge in AssetCard
          {
            id: "1",
            name: "Company_Logo_Final_RGB.png",
            type: "image",
            size: "128KB",
            uploadedAt: "2023-05-01",
            url: "#",
            isAIGenerated: false,
          },
          {
            id: "2",
            name: "AI_Product_Demo_Short.mp4",
            type: "video",
            size: "5.2MB",
            uploadedAt: "2023-05-05",
            url: "#",
            isAIGenerated: true,
          },
        ]);
        setIsLoadingLibrary(false);
      }, 1000);
    }
  }, [activeView]);

  const handleUploadAsset = useCallback(() => {
    alert(t("assetLibrary.alert.uploadNotImplemented")); // Replace with actual upload logic
  }, [t]);

  const handleNewGeneratedAsset = useCallback((newAsset) => {
    setAssets((prevAssets) => [
      { ...newAsset, id: String(Date.now()) },
      ...prevAssets,
    ]); // Use timestamp for unique ID
    setActiveView("library"); // Switch to library view
  }, []);

  const filteredAssets = useMemo(
    () =>
      assets.filter((asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [assets, searchTerm]
  );

  const librarySubtitle = useMemo(() => t("assetLibrary.librarySubtitle"), [t]);
  const generatorSubtitle = useMemo(
    () => t("assetLibrary.generator.veoSubtitle"),
    [t]
  );

  return (
    <div
      className={`h-full flex flex-col ${theme.background} text-sm sm:text-base`}
    >
      {/* Header Area */}
      <div
        className={`p-4 sm:p-5 border-b ${theme.borderLight} sticky top-0 z-10 ${theme.surfaceCard}`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1
              className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}
            >
              {t(currentTabConfig.nameKey, currentTabConfig.defaultLabel)}
            </h1>
            <p className={`${theme.textMuted} text-xs mt-0.5`}>
              {activeView === "library" ? librarySubtitle : generatorSubtitle}
            </p>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 self-start sm:self-center">
            {assetTabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                variant={activeView === tab.id ? "primary" : "secondary"}
                size="sm"
                icon={React.cloneElement(tab.icon, {
                  className: "w-3.5 h-3.5 sm:w-4 sm:h-4",
                })}
                className={`!text-xs sm:!text-sm !font-medium ${
                  activeView === tab.id
                    ? `${theme.buttonPrimaryBg} ${theme.buttonPrimaryText}`
                    : `${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg}`
                }`}
              >
                {t(tab.nameKey, tab.defaultLabel)}
              </Button>
            ))}
            {activeView === "library" && (
              <UploadAssetButton t={t} onClick={handleUploadAsset} />
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeView === "library" && (
            <motion.div
              key="library-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <FiSearch
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted}`}
                  />
                  <input
                    type="search"
                    placeholder={t("assetLibrary.search.placeholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 text-xs sm:text-sm border ${theme.inputBorder} rounded-md ${theme.inputFocusStyle} ${theme.inputBg} ${theme.textPrimary}`}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<FiSliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  className={`!text-xs sm:!text-sm !font-medium ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg}`}
                >
                  {t("assetLibrary.filters", "Filters")} ({0}){" "}
                  {/* TODO: Implement filter count */}
                </Button>
              </div>
              <AnimatePresence mode="wait">
                {isLoadingLibrary ? (
                  <motion.div
                    key="loader"
                    className="flex flex-col items-center justify-center py-16 sm:py-20 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FiLoader
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${theme.textHighlight} animate-spin mb-3`}
                    />
                    <p className={`${theme.textSecondary} text-xs sm:text-sm`}>
                      {t("assetLibrary.loadingAssets")}
                    </p>
                  </motion.div>
                ) : filteredAssets.length > 0 ? (
                  <motion.div
                    key="asset-grid"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                  >
                    {filteredAssets.map((asset) => (
                      <AssetCard key={asset.id} asset={asset} t={t} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-assets"
                    className="flex flex-col items-center justify-center text-center py-16 sm:py-20"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <FiImage
                      className={`w-16 h-16 sm:w-20 sm:h-20 ${theme.textMuted} mb-3 sm:mb-4 opacity-50`}
                    />
                    <p
                      className={`mt-2 text-md sm:text-lg font-semibold ${theme.textPrimary}`}
                    >
                      {searchTerm
                        ? t("assetLibrary.emptyState.noResults")
                        : t("assetLibrary.emptyState.noAssets")}
                    </p>
                    <p
                      className={`text-xs sm:text-sm ${theme.textSecondary} max-w-xs mx-auto`}
                    >
                      {searchTerm
                        ? t("assetLibrary.emptyState.tryDifferentSearch")
                        : t("assetLibrary.emptyState.getStarted")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          {activeView === "generator" && (
            <motion.div
              key="generator-view"
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VeoGeneratorComponent
                t={t}
                onAssetGenerated={handleNewGeneratedAsset}
              />
            </motion.div>
          )}
          {activeView === "drive" && ( // Placeholder for Google Drive Tab
            <motion.div
              key="drive-view"
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FiHardDrive
                className={`w-20 h-20 ${theme.textMuted} mx-auto mb-4 opacity-50`}
              />
              <p className={`${theme.textPrimary} font-semibold`}>
                {t(
                  "assetLibrary.driveComingSoon.title",
                  "Google Drive Integration"
                )}
              </p>
              <p className={`${theme.textSecondary} text-sm`}>
                {t(
                  "assetLibrary.driveComingSoon.text",
                  "Connect your Google Drive to directly access and manage assets. Coming soon!"
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
AssetLibraryComponent.propTypes = {}; // No external props expected for the page-like component
