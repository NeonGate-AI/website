import type { ReactNode } from "react";

export interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer(props: PageContainerProps) {
  const { children } = props;

  return (
    <main className="relative isolate flex min-h-svh min-w-80 items-center justify-center overflow-hidden bg-canvas px-6 py-12 text-center text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_37%,color-mix(in_srgb,var(--color-violet)_17%,transparent)_0%,transparent_34%),radial-gradient(circle_at_14%_12%,color-mix(in_srgb,var(--color-cyan)_8%,transparent)_0%,transparent_29%),radial-gradient(circle_at_86%_86%,color-mix(in_srgb,var(--color-magenta)_8%,transparent)_0%,transparent_31%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_35%,var(--color-surface-vignette)_118%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(color-mix(in_srgb,white_11%,transparent)_0.45px,transparent_0.6px)] opacity-[.12] [background-size:4px_4px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[22%] -left-[18%] z-0 aspect-square w-[min(36rem,58vw)] rounded-full bg-cyan opacity-[.08] blur-[8rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18%] -bottom-[26%] z-0 aspect-square w-[min(36rem,58vw)] rounded-full bg-magenta opacity-[.08] blur-[8rem]"
      />
      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-5xl flex-col items-center justify-center [@media(max-height:46rem)]:min-h-[calc(100svh-3rem)]">
        {children}
      </section>
    </main>
  );
}
