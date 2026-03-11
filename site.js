document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const updateStickyState = () => {
    header.classList.toggle("is-stuck", window.scrollY > 24);
  };

  updateStickyState();
  window.addEventListener("scroll", updateStickyState, { passive: true });
});
