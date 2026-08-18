"use client";

import { trackLinkedInOutbound } from "@ng/analytics/vercel/linkedin-outbound";

export interface TrackedLinkedInLinkProps {
  href: string;
  label: string;
}

export function TrackedLinkedInLink(props: TrackedLinkedInLinkProps) {
  const { href, label } = props;

  return (
    <a
      className="group relative mt-[clamp(.45rem,1.5vh,.9rem)] inline-flex animate-enter-link items-center gap-[.45rem] rounded-sm py-2 text-[.82rem] leading-[1.4] font-medium tracking-[.11em] text-[color-mix(in_srgb,var(--color-foreground)_66%,transparent)] uppercase no-underline transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[.35rem] focus-visible:outline-cyan motion-reduce:animate-none motion-reduce:transition-none"
      href={href}
      onClick={trackLinkedInOutbound}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="text-base transition-transform duration-200 group-hover:translate-x-[.13rem] group-hover:-translate-y-[.13rem] group-focus-visible:translate-x-[.13rem] group-focus-visible:-translate-y-[.13rem] motion-reduce:transition-none"
      >
        ↗
      </span>
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-[.22rem] left-0 h-px origin-center scale-x-[.35] bg-[linear-gradient(90deg,var(--color-cyan),var(--color-violet),var(--color-magenta))] opacity-70 transition-[transform,opacity] duration-200 group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:scale-x-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      />
    </a>
  );
}
