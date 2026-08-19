"use client";

import { ORBZ_STATES, type OrbzState } from "@neongate-ai/orbz";
import { Orbz, type OrbzProps } from "@neongate-ai/orbz/react";
import { useEffect, useState } from "react";

interface LivingOrbProps {
  colors?: OrbzProps["colors"];
  size?: OrbzProps["size"];
  speed?: OrbzProps["speed"];
}

const stateChangeInterval = 3_500;

export function LivingOrb(props: LivingOrbProps) {
  const { colors, size, speed } = props;

  const [state, setState] = useState<OrbzState>("idle");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState(selectNextState);
    }, stateChangeInterval);

    return () => window.clearInterval(interval);
  }, []);

  return <Orbz colors={colors} size={size} speed={speed} state={state} />;
}

function selectNextState(currentState: OrbzState) {
  const availableStates = ORBZ_STATES.filter((state) => state !== currentState);
  const randomIndex = Math.floor(Math.random() * availableStates.length);

  return availableStates[randomIndex] ?? "idle";
}
