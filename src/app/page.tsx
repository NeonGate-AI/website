import { Kinetic } from "@ng/ui/kinetic/kinetic";
import { LivingOrb } from "@ng/ui/living-orb/living-orb";
import { PageContainer } from "@ng/ui/page-container/page-container";
import { TrackedLinkedInLink } from "@ng/ui/tracked-linkedin-link/tracked-linkedin-link";

const PHRASES = [
  "Voice AI Engineering",
  "Deep architecture. Practical intelligence.",
  "Reliable agentic systems for real products.",
  "From first principles to production.",
];

export default function Home() {
  return (
    <PageContainer>
      <div
        aria-hidden="true"
        className="relative mb-[clamp(1.45rem,3.5vh,2.15rem)] grid animate-enter-orb place-items-center motion-reduce:animate-none [@media(max-height:46rem)]:mb-2 [@media(max-height:46rem)]:scale-[.88]"
      >
        <div className="pointer-events-none absolute -bottom-[9%] -z-10 h-[24%] w-[72%] rounded-full bg-[color-mix(in_srgb,var(--color-magenta)_22%,var(--color-violet))] opacity-40 blur-[2.5rem] [transform:perspective(16rem)_rotateX(64deg)]" />
        <LivingOrb size="clamp(12.5rem, 26vw, 17rem)" speed={1.1} />
      </div>

      <h1 className="m-0 animate-enter-title font-display text-[clamp(1.9rem,4vw,2.85rem)] leading-none font-normal tracking-[-.055em] motion-reduce:animate-none">
        NeonGate{" "}
        <span className="bg-brand-title bg-clip-text text-transparent">AI</span>
      </h1>

      <div className="mt-[clamp(1rem,2.6vh,1.55rem)] grid min-h-[clamp(6.5rem,16vh,9rem)] w-full animate-enter-kinetic place-items-center motion-reduce:animate-none [@media(max-height:46rem)]:mt-[.65rem] [@media(max-height:46rem)]:min-h-[5.5rem]">
        <Kinetic
          className="max-w-[58rem] items-center justify-center font-display text-[clamp(1.45rem,4.4vw,3.35rem)] leading-[1.08] font-medium tracking-[-.045em] text-balance"
          interval={1500}
          phrases={PHRASES}
        />
      </div>
      <TrackedLinkedInLink
        href="https://www.linkedin.com/company/neon-gate-ai"
        label="Neongate AI on LinkedIn"
      />
    </PageContainer>
  );
}
