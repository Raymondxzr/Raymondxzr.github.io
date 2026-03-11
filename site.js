document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const mobileQuery = window.matchMedia("(max-width: 640px)");
  const ENTER_CONDENSED = 120;
  const EXIT_CONDENSED = 60;
  let isCondensed = false;
  let ticking = false;

  if (!header) {
    return;
  }

  const syncHeaderOffset = () => {
    if (mobileQuery.matches) {
      root.style.setProperty("--header-offset", "0px");
      return;
    }

    const topOffset = 10;
    const headerHeight = Math.ceil(header.getBoundingClientRect().height);
    root.style.setProperty("--header-offset", `${headerHeight + topOffset + 12}px`);
  };

  const applyCondensedState = (nextState) => {
    if (nextState === isCondensed) {
      syncHeaderOffset();
      return;
    }

    isCondensed = nextState;
    header.classList.toggle("is-condensed", isCondensed);
    syncHeaderOffset();
  };

  const updateHeaderState = () => {
    if (mobileQuery.matches) {
      applyCondensedState(false);
      ticking = false;
      return;
    }

    const y = window.scrollY;
    let nextState = isCondensed;

    if (!isCondensed && y > ENTER_CONDENSED) {
      nextState = true;
    } else if (isCondensed && y < EXIT_CONDENSED) {
      nextState = false;
    }

    applyCondensedState(nextState);
    ticking = false;
  };

  if (typeof ResizeObserver !== "undefined") {
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(syncHeaderOffset);
    });
    resizeObserver.observe(header);
  }

  const requestHeaderUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateHeaderState);
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", requestHeaderUpdate);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(requestHeaderUpdate);
  }

  window.addEventListener("resize", requestHeaderUpdate, { passive: true });
  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  window.addEventListener("load", requestHeaderUpdate, { passive: true });
  requestHeaderUpdate();
});
