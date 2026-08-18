"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import { type CSSProperties, forwardRef } from "react";
import {
  ORB_MOTION_BY_STATE,
  ORB_STATES,
  type OrbState,
  REDUCED_ORB_MOTION_BY_STATE,
} from "./orb-motion.data";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

type OrbElementProps = Omit<
  HTMLMotionProps<"div">,
  | "animate"
  | "children"
  | "className"
  | "color"
  | "initial"
  | "style"
  | "transition"
  | "variants"
>;

export interface OrbColors {
  accent: string;
  background: string;
  highlight: string;
  primary: string;
  secondary: string;
}

export interface OrbProps extends OrbElementProps {
  className?: string;
  colors?: Partial<OrbColors>;
  size?: number | string;
  speed?: number;
  state?: OrbState;
  style?: CSSProperties;
}

interface OrbStyle extends CSSProperties {
  "--orb-accent": string;
  "--orb-angle": string;
  "--orb-background": string;
  "--orb-contrast": string;
  "--orb-highlight": string;
  "--orb-primary": string;
  "--orb-saturation": string;
  "--orb-secondary": string;
  "--orb-size": string;
}

export const NEONGATE_ORB_COLORS = {
  accent: "#FF4DDE",
  background: "#14142B",
  highlight: "#FFB07A",
  primary: "#6C5CFF",
  secondary: "#00E9FF",
} as const satisfies OrbColors;

export type { OrbState };
export { ORB_STATES };

export const Orb = forwardRef<HTMLDivElement, OrbProps>(
  function Orb(props, ref) {
    const {
      className = "",
      colors,
      size = "16rem",
      speed = 1,
      state = "idle",
      style: customStyle,
      ...elementProps
    } = props;

    const shouldReduceMotion = useHydratedReducedMotion();
    const normalizedSize = typeof size === "number" ? `${size}px` : size;
    const normalizedSpeed = Number.isFinite(speed) && speed > 0 ? speed : 1;
    const palette = {
      accent: colors?.accent ?? NEONGATE_ORB_COLORS.accent,
      background: colors?.background ?? NEONGATE_ORB_COLORS.background,
      highlight: colors?.highlight ?? NEONGATE_ORB_COLORS.highlight,
      primary: colors?.primary ?? NEONGATE_ORB_COLORS.primary,
      secondary: colors?.secondary ?? NEONGATE_ORB_COLORS.secondary,
    };
    const motionProfile = shouldReduceMotion
      ? REDUCED_ORB_MOTION_BY_STATE[state]
      : ORB_MOTION_BY_STATE[state];
    const style = {
      ...customStyle,
      "--orb-accent": palette.accent,
      "--orb-angle": "0deg",
      "--orb-background": palette.background,
      "--orb-contrast": String(motionProfile.contrast),
      "--orb-highlight": palette.highlight,
      "--orb-primary": palette.primary,
      "--orb-saturation": String(motionProfile.saturation),
      "--orb-secondary": palette.secondary,
      "--orb-size": normalizedSize,
      height: normalizedSize,
      width: normalizedSize,
    } as OrbStyle;

    return (
      <motion.div
        {...elementProps}
        animate={motionProfile.root.animate}
        className={`relative grid place-items-center ${className}`.trim()}
        data-orb-state={state}
        data-reduced-motion={shouldReduceMotion ? "true" : "false"}
        initial={false}
        ref={ref}
        style={style}
        transition={scaleTransition(
          motionProfile.root.transition,
          normalizedSpeed,
        )}
      >
        <motion.span
          animate={motionProfile.aura.animate}
          className="pointer-events-none absolute -inset-[16%] rounded-full bg-[radial-gradient(circle_at_50%_52%,color-mix(in_srgb,var(--orb-accent)_40%,var(--orb-primary))_0%,transparent_66%)] [filter:blur(calc(var(--orb-size)*0.22))]"
          initial={false}
          transition={scaleTransition(
            motionProfile.aura.transition,
            normalizedSpeed,
          )}
        />
        <motion.span
          animate={motionProfile.ring.animate}
          className="pointer-events-none absolute -inset-[7%] rounded-full border border-[color-mix(in_srgb,var(--orb-secondary)_58%,var(--orb-primary))] [box-shadow:0_0_calc(var(--orb-size)*0.11)_color-mix(in_srgb,var(--orb-accent)_24%,transparent)]"
          initial={false}
          transition={scaleTransition(
            motionProfile.ring.transition,
            normalizedSpeed,
          )}
        />
        <span className="relative isolate grid size-full overflow-hidden rounded-full bg-[var(--orb-background)] [box-shadow:inset_0_0_0_1px_rgb(255_255_255_/_0.1),0_0_calc(var(--orb-size)*0.17)_color-mix(in_srgb,var(--orb-primary)_18%,transparent),0_0_calc(var(--orb-size)*0.34)_color-mix(in_srgb,var(--orb-accent)_8%,transparent)] [transform:translateZ(0)]">
          <motion.span
            animate={motionProfile.field.animate}
            className="absolute inset-0 rounded-full bg-[conic-gradient(from_calc(var(--orb-angle)*2)_at_25%_70%,var(--orb-primary),transparent_20%_80%,var(--orb-primary)),conic-gradient(from_calc(var(--orb-angle)*2)_at_45%_75%,var(--orb-secondary),transparent_30%_60%,var(--orb-secondary)),conic-gradient(from_calc(var(--orb-angle)*-3)_at_80%_20%,var(--orb-highlight),transparent_40%_60%,var(--orb-highlight)),conic-gradient(from_calc(var(--orb-angle)*1.5)_at_60%_35%,var(--orb-accent),transparent_25%_75%,var(--orb-accent)),conic-gradient(from_calc(var(--orb-angle)*2)_at_15%_5%,var(--orb-secondary),transparent_10%_90%,var(--orb-secondary)),conic-gradient(from_calc(var(--orb-angle)*1)_at_20%_80%,var(--orb-highlight),transparent_10%_90%,var(--orb-highlight)),conic-gradient(from_calc(var(--orb-angle)*-2)_at_85%_10%,var(--orb-primary),transparent_20%_80%,var(--orb-primary))] [filter:blur(calc(var(--orb-size)*0.014))_contrast(var(--orb-contrast))_saturate(var(--orb-saturation))] [will-change:filter]"
            initial={false}
            transition={scaleTransition(
              motionProfile.field.transition,
              normalizedSpeed,
            )}
          />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,var(--orb-background)_calc(var(--orb-size)*0.004),transparent_calc(var(--orb-size)*0.005))] [background-size:calc(var(--orb-size)*0.01)_calc(var(--orb-size)*0.01)] [backdrop-filter:blur(calc(var(--orb-size)*0.025))_contrast(1.55)] [-webkit-mask-image:radial-gradient(black_20%,transparent_76%)] [mask-image:radial-gradient(black_20%,transparent_76%)] [mix-blend-mode:overlay]" />
          <motion.span
            animate={motionProfile.core.animate}
            className="pointer-events-none absolute inset-[18%] z-1 rounded-full bg-[radial-gradient(circle_at_48%_46%,color-mix(in_srgb,var(--orb-secondary)_54%,white)_0%,color-mix(in_srgb,var(--orb-primary)_44%,var(--orb-accent))_38%,transparent_72%)] [filter:blur(calc(var(--orb-size)*0.075))] [mix-blend-mode:screen]"
            initial={false}
            transition={scaleTransition(
              motionProfile.core.transition,
              normalizedSpeed,
            )}
          />
          <motion.span
            animate={motionProfile.highlight.animate}
            className="pointer-events-none absolute inset-0 z-1 rounded-full bg-[radial-gradient(circle_at_32%_22%,rgb(255_255_255_/_0.19),transparent_29%),radial-gradient(circle_at_72%_76%,rgb(255_255_255_/_0.04),transparent_48%)] [mix-blend-mode:soft-light]"
            initial={false}
            transition={scaleTransition(
              motionProfile.highlight.transition,
              normalizedSpeed,
            )}
          />
        </span>
      </motion.div>
    );
  },
);

function scaleTransition(
  transition: HTMLMotionProps<"span">["transition"],
  speed: number,
) {
  if (!transition || typeof transition.duration !== "number") {
    return transition;
  }

  return {
    ...transition,
    duration: transition.duration / speed,
  };
}
