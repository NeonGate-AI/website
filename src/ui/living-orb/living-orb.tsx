"use client";

import { ORB_STATES, Orb, type OrbProps, type OrbState } from "@ng/orb/orb";
import { useEffect, useState } from "react";

interface LivingOrbProps {
  colors?: OrbProps["colors"];
  size?: OrbProps["size"];
  speed?: OrbProps["speed"];
}

const stateChangeInterval = 3_500;

export function LivingOrb(props: LivingOrbProps) {
  const { colors, size, speed } = props;

  const [state, setState] = useState<OrbState>("idle");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState(selectNextState);
    }, stateChangeInterval);

    return () => window.clearInterval(interval);
  }, []);

  return <Orb colors={colors} size={size} speed={speed} state={state} />;
}

function selectNextState(currentState: OrbState) {
  const availableStates = ORB_STATES.filter((state) => state !== currentState);
  const randomIndex = Math.floor(Math.random() * availableStates.length);

  return availableStates[randomIndex] ?? "idle";
}
