document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const mobileQuery = window.matchMedia("(max-width: 640px)");

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

  if (typeof ResizeObserver !== "undefined") {
    const resizeObserver = new ResizeObserver(syncHeaderOffset);
    resizeObserver.observe(header);
  }

  const requestOffsetSync = () => {
    window.requestAnimationFrame(syncHeaderOffset);
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", requestOffsetSync);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(requestOffsetSync);
  }

  window.addEventListener("resize", requestOffsetSync, { passive: true });
  window.addEventListener("load", requestOffsetSync, { passive: true });
  requestOffsetSync();
});
