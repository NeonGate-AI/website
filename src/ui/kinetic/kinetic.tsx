"use client";

import { useHydratedReducedMotion } from "@ng/hooks/use-hydrated-reduced-motion";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export interface KineticProps {
  className?: string;
  /** Time the completed phrase remains visible, in milliseconds. */
  interval?: number;
  phrases: readonly string[];
}

const BUILD_EASE = [0.2, 0.8, 0.2, 1] as const;
const EXIT_EASE = [0.4, 0, 0.2, 1] as const;

/**
 * Apple-keynote-style word-by-word build from SmoothUI.
 * Each new word enters from the right and pushes the line toward center.
 */
export function Kinetic(props: KineticProps) {
  const { phrases, className = "", interval = 2500 } = props;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [wordCount, setWordCount] = useState(1);
  const [exiting, setExiting] = useState(false);
  const shouldReduceMotion = useHydratedReducedMotion();

  const currentPhrase = phrases[phraseIndex] ?? "";
  const words = currentPhrase.split(" ").filter(Boolean);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Phrase index restarts timing when adjacent phrases have equal word counts.
  useEffect(() => {
    if (phrases.length === 0 || shouldReduceMotion) {
      return;
    }

    const buildTimers: ReturnType<typeof setTimeout>[] = [];
    let swapTimer: ReturnType<typeof setTimeout> | undefined;

    for (let index = 1; index < words.length; index += 1) {
      buildTimers.push(
        setTimeout(() => {
          setWordCount(index + 1);
        }, index * 430),
      );
    }

    const totalBuild = (words.length - 1) * 430 + 340;
    const holdTimer = setTimeout(() => {
      setExiting(true);
      swapTimer = setTimeout(() => {
        setPhraseIndex((previous) => (previous + 1) % phrases.length);
        setWordCount(1);
        setExiting(false);
      }, 480);
    }, totalBuild + interval);

    buildTimers.push(holdTimer);

    return () => {
      for (const timer of buildTimers) {
        clearTimeout(timer);
      }
      if (swapTimer) {
        clearTimeout(swapTimer);
      }
    };
  }, [interval, phraseIndex, phrases.length, shouldReduceMotion, words.length]);

  const visibleWords = shouldReduceMotion ? words : words.slice(0, wordCount);
  const restingAnimation = shouldReduceMotion
    ? { opacity: 1 }
    : { filter: "blur(0px)", opacity: 1, scale: 1, x: 0, y: 0 };
  const exitAnimation = {
    filter: "blur(2.5px)",
    opacity: 0,
    transition: { duration: 0.26, ease: EXIT_EASE },
    y: -6,
  };

  return (
    <span className={`flex flex-wrap gap-x-2.5 gap-y-2 ${className}`.trim()}>
      <span className="sr-only">{phrases.join(" ")}</span>
      <AnimatePresence mode="popLayout">
        {visibleWords.map((word, index) => (
          <motion.span
            animate={exiting ? exitAnimation : restingAnimation}
            aria-hidden="true"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    filter: "blur(3.5px)",
                    opacity: 0,
                    scale: 0.992,
                    x: 88,
                    y: 6,
                  }
            }
            // biome-ignore lint/suspicious/noArrayIndexKey: Word position is the animation identity within each keyed phrase.
            key={`${phraseIndex}-${index}`}
            className="inline-block"
            layout
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: index === 0 ? 0.34 : 0.43,
                    ease: BUILD_EASE,
                    layout: { duration: 0.43, ease: BUILD_EASE },
                  }
            }
          >
            {word}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
