import React, { useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FiMove } from "react-icons/fi";
import PropTypes from "prop-types";

const HorizontalScrollSection = ({ items }) => {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const prefersReducedMotion = useReducedMotion();

  // Dynamic background and motion effects
  const backgroundColor = useTransform(
    scrollXProgress,
    [0, 0.5, 1],
    ["#292524", "#44403c", "#1c1917"]
  );

  const parallaxX = useTransform(
    scrollXProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -100]
  );

  // Calculate total width including hint and proper gaps
  const cardWidth = 320; // md width
  const gapSize = 24;
  const totalWidth =
    cardWidth + // Scroll hint width
    items.length * cardWidth + // All cards
    (items.length + 1) * gapSize; // Gaps between all elements

  return (
    <motion.div
      style={{ backgroundColor }}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Progress indicator */}
      <motion.div
        className="h-1 bg-stone-600 mt-8 mx-4 sm:mx-6 rounded-full"
        style={{ scaleX: scrollXProgress, originX: 0 }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          className="text-3xl md:text-4xl font-bold text-stone-100 text-center mb-12"
        >
          Pilares de Nuestra Filosofía
        </motion.h2>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto pb-10 scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent"
      >
        <motion.div
          className="flex gap-6 md:gap-8 px-4 sm:px-6 lg:px-12"
          style={{
            width: `${totalWidth}px`,
            x: parallaxX,
          }}
        >
          {/* Scroll hint as first element */}
          <motion.div
            className="flex-shrink-0 w-[300px] md:w-[320px] flex flex-col items-center justify-center text-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiMove className="w-10 h-10 text-stone-400 mb-4" />
            <p className="text-stone-400 text-sm">
              Desliza o arrastra para explorar más
            </p>
          </motion.div>

          {/* Cards */}
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[300px] md:w-[320px] h-full rounded-xl shadow-xl p-6 md:p-8 bg-stone-800 border border-stone-600 flex flex-col relative group hover:border-emerald-500 transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { delay: index * 0.1 },
              }}
              viewport={{ once: true, margin: "0px 100px 0px 0px" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-3 rounded-lg bg-stone-700 border border-stone-600 self-start mb-4 shadow-inner">
                <item.icon className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-100 mb-3">
                {item.title}
              </h3>
              <p className="text-stone-400 text-sm flex-grow leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

HorizontalScrollSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HorizontalScrollSection;
