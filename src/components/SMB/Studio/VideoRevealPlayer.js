import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiRotateCw, FiZap } from 'react-icons/fi';

const VideoRevealPlayer = ({ videoSrc, prompt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Reset and replay video
  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Initialize video and set loop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      
      const updateProgress = () => {
        if (videoRef.current) {
          const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setProgress(currentProgress);
        }
      };
      
      videoRef.current.addEventListener('timeupdate', updateProgress);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', updateProgress);
        }
      };
    }
  }, []);

  // Start reveal animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
      {/* Prompt display */}
      <div className="p-4 bg-gray-800 text-gray-100 flex justify-between items-start">
        <p className="text-sm font-mono flex-1">"{prompt}"</p>
        <motion.div 
          className="flex items-center text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded"
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowDisclaimer(!showDisclaimer)}
        >
          <FiZap className="mr-1" />
          <span>AI Magic</span>
        </motion.div>
      </div>
      
      {/* Fun disclaimer */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            className="px-4 py-2 bg-gradient-to-r from-purple-900/70 to-cyan-900/70 text-xs text-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="flex items-center">
              <span className="inline-block mr-2">✨</span>
              <span>
                All videos generated with <span className="font-bold text-cyan-300">Veo</span> because 
                it's <span className="italic">ridiculously fun</span> to create AI magic!
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Video container with reveal animation */}
      <motion.div 
        className="relative aspect-video w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          muted
          playsInline
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <motion.div 
            className="h-full bg-cyan-400"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        {/* Controls overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
            </button>
            <button
              onClick={handleReplay}
              className="p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
              aria-label="Replay"
            >
              <FiRotateCw size={24} />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Loading state (before reveal) */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-900"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <motion.span 
              className="absolute text-cyan-400 text-xs mt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Summoning AI magic...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoRevealPlayer;
