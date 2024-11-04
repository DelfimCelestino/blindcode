"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles as SparklesIcon } from "lucide-react";

interface HitCounterProps {
  hits: number;
  isCombo: boolean;
}

export default function HitCounter({ hits, isCombo }: HitCounterProps) {
  return (
    <div className="relative flex items-center space-x-2">
      <SparklesIcon className="h-5 w-5 text-cyan-500" />
      <div className="flex items-baseline space-x-1">
        <motion.span
          key={hits}
          initial={{ scale: 1.5, y: -10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          className="font-mono text-xl font-bold text-cyan-500"
        >
          {hits}
        </motion.span>
        <span className="text-sm text-cyan-500/70">hits</span>
      </div>
      <AnimatePresence>
        {isCombo && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 transform"
          >
            <span className="animate-pulse text-sm font-bold text-cyan-400">
              COMBO!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {isCombo && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0],
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-cyan-500/20"
        />
      )}
    </div>
  );
}
