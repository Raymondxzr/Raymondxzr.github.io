document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const mobileQuery = window.matchMedia("(max-width: 640px)");

  if (!header) {
    return;
  }

  let isStuck = false;
  let ticking = false;
  const ENTER_THRESHOLD = 72;
  const EXIT_THRESHOLD = 28;

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
    isStuck = nextState;
    header.classList.toggle("is-stuck", isStuck);
    syncHeaderOffset();
  };

  const updateStickyState = () => {
    if (mobileQuery.matches) {
      applyStickyState(false);
      ticking = false;
      return;
    }

    const y = window.scrollY;
    let nextState = isStuck;

    if (!isStuck && y > ENTER_THRESHOLD) {
      nextState = true;
    } else if (isStuck && y < EXIT_THRESHOLD) {
      nextState = false;
    }

    if (nextState !== isStuck) {
      applyStickyState(nextState);
    } else {
      syncHeaderOffset();
    }

    ticking = false;
  };

  const requestStickyUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateStickyState);
  };

  applyStickyState(false);

  if (typeof ResizeObserver !== "undefined") {
    const resizeObserver = new ResizeObserver(syncHeaderOffset);
    resizeObserver.observe(header);
  }

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", requestStickyUpdate);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(requestStickyUpdate);
  }

  window.addEventListener("resize", requestStickyUpdate, { passive: true });
  window.addEventListener("scroll", requestStickyUpdate, { passive: true });
  requestStickyUpdate();
});
