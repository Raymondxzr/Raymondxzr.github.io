window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.querySelectorAll("[data-snapshot-carousel]").forEach((carousel) => {
    const cards = Array.from(carousel.querySelectorAll("[data-snapshot-card]"));
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");
    let active = 0;

    const render = () => {
      cards.forEach((card, index) => {
        const offset = (index - active + cards.length) % cards.length;
        let state = "far";
        if (offset === 0) state = "active";
        if (offset === 1) state = "next";
        if (offset === cards.length - 1) state = "prev";
        card.dataset.cardState = state;
      });

      dotsWrap?.querySelectorAll("button").forEach((dot, index) => {
        dot.classList.toggle("active", index === active);
      });
    };

    if (dotsWrap) {
      cards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Show snapshot ${index + 1}`);
        dot.addEventListener("click", () => {
          active = index;
          render();
        });
        dotsWrap.appendChild(dot);
      });
    }

    prev?.addEventListener("click", () => {
      active = (active - 1 + cards.length) % cards.length;
      render();
    });

    next?.addEventListener("click", () => {
      active = (active + 1) % cards.length;
      render();
    });

    render();
  });
});
