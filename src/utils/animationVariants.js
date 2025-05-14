// src/utils/animationVariants.js (Example file path)
// Helper function to generate staggerContainer variants for Framer Motion.

/**
 * Generates a Framer Motion variant object for a staggering container animation.
 *
 * @param {object} options - Options for customizing the stagger effect.
 * @param {number} [options.staggerChildren=0.1] - The delay (in seconds) between each child's animation.
 * @param {number} [options.delayChildren=0] - The delay (in seconds) before the first child starts animating.
 * @param {number} [options.initialOpacity=0] - The initial opacity of the container.
 * @param {number} [options.visibleOpacity=1] - The opacity of the container when visible.
 * @returns {object} A Framer Motion variants object.
 */
export const createStaggerContainer = ({
  staggerChildren = 0.1,
  delayChildren = 0,
  initialOpacity = 0,
  visibleOpacity = 1,
} = {}) => {
  return {
    hidden: {
      opacity: initialOpacity,
    },
    visible: {
      opacity: visibleOpacity,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      },
    },
  };
};

export const createScaleUp = (
  hiddenOpacity = 0,
  hiddenScale = 0.05,
  visibleOpacity = 1,
  visibleScale = 1,
  visibleTansitiionDuration = 0.5,
  visibleTansitiionEase = [0.33, 1, 0.68, 1]
) => ({
  hidden: { opacity: hiddenOpacity, scale: hiddenScale },
  visible: {
    opacity: visibleOpacity,
    scale: visibleScale,
    transition: {
      duration: visibleTansitiionDuration,
      ease: visibleTansitiionEase,
    },
  },
});
