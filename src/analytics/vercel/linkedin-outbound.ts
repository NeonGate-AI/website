"use client";

import { track } from "@vercel/analytics";

export function trackLinkedInOutbound() {
  try {
    track("linkedin_outbound", { placement: "hero" });
  } catch {
    // Analytics must never interrupt outbound navigation.
  }
}
