document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const syncHeaderOffset = () => {
    const topOffset = 10;
    const headerHeight = Math.ceil(header.getBoundingClientRect().height);
    root.style.setProperty("--header-offset", `${headerHeight + topOffset + 12}px`);
  };

  const updateStickyState = () => {
    header.classList.toggle("is-stuck", window.scrollY > 24);
    syncHeaderOffset();
  };

  updateStickyState();

  if (typeof ResizeObserver !== "undefined") {
    const resizeObserver = new ResizeObserver(syncHeaderOffset);
    resizeObserver.observe(header);
  }

  window.addEventListener("resize", syncHeaderOffset, { passive: true });
  window.addEventListener("scroll", updateStickyState, { passive: true });
});
