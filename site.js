document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const sentinel = document.querySelector(".header-sentinel");
  const mobileQuery = window.matchMedia("(max-width: 640px)");

  if (!header || !sentinel) {
    return;
  }

  let isStuck = false;

  const syncHeaderOffset = () => {
    if (mobileQuery.matches) {
      root.style.setProperty("--header-offset", "0px");
      return;
    }

    const topOffset = 10;
    const headerHeight = Math.ceil(header.getBoundingClientRect().height);
    root.style.setProperty("--header-offset", `${headerHeight + topOffset + 12}px`);
  };

  const applyStickyState = (nextState) => {
    if (nextState === isStuck) {
      syncHeaderOffset();
      return;
    }

    isStuck = nextState;
    header.classList.toggle("is-stuck", isStuck);
    syncHeaderOffset();
  };

  const updateStickyStateFallback = () => {
    if (mobileQuery.matches) {
      applyStickyState(false);
      return;
    }

    applyStickyState(window.scrollY > 72);
  };

  applyStickyState(false);

  if (typeof ResizeObserver !== "undefined") {
    const resizeObserver = new ResizeObserver(syncHeaderOffset);
    resizeObserver.observe(header);
  }

  let observer = null;
  const attachStickyObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (mobileQuery.matches) {
      applyStickyState(false);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      updateStickyStateFallback();
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        applyStickyState(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-72px 0px 0px 0px",
      }
    );

    observer.observe(sentinel);
    syncHeaderOffset();
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", attachStickyObserver);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(attachStickyObserver);
  }

  window.addEventListener("resize", attachStickyObserver, { passive: true });
  if (typeof IntersectionObserver === "undefined") {
    window.addEventListener("scroll", updateStickyStateFallback, { passive: true });
  }

  attachStickyObserver();
});
