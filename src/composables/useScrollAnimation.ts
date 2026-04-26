import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureRegistered() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function useScrollAnimation() {
  ensureRegistered();
  const triggers: ScrollTrigger[] = [];

  function fadeUp(target: gsap.TweenTarget, options: gsap.TweenVars = {}) {
    const t = gsap.from(target, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: target as Element,
        start: "top 85%",
        toggleActions: "play none none reverse",
        ...((options.scrollTrigger as ScrollTrigger.Vars) ?? {}),
      },
      ...options,
    });
    return t;
  }

  function staggerReveal(
    targets: gsap.TweenTarget,
    options: gsap.TweenVars = {},
  ) {
    return gsap.from(targets, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: targets as Element,
        start: "top 85%",
        toggleActions: "play none none reverse",
        ...((options.scrollTrigger as ScrollTrigger.Vars) ?? {}),
      },
      ...options,
    });
  }

  function parallax(
    target: gsap.TweenTarget,
    options: { yPercent?: number; trigger?: Element } = {},
  ) {
    const { yPercent = 25, trigger } = options;
    return gsap.to(target, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: trigger ?? (target as Element),
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  onMounted(() => {
    setTimeout(() => ScrollTrigger.refresh(), 50);
  });

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill());
    ScrollTrigger.getAll().forEach((t) => {
      if (!t.vars.trigger) t.kill();
    });
  });

  return { gsap, ScrollTrigger, fadeUp, staggerReveal, parallax };
}
