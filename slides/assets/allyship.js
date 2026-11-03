(() => {
  function initialize() {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const print = matchMedia("print");
    const sections = [...document.querySelectorAll("section.journey")];

    function update() {
      const audience = document.body.getAttribute("data-bespoke-view") === "" && !print.matches;
      for (const section of sections) {
        const slide = section.closest("svg[data-marpit-svg]") || section;
        const active = audience && !document.hidden && slide.classList.contains("bespoke-marp-active");
        section.classList.toggle("motion-active", active && !reducedMotion.matches);
      }
    }

    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-bespoke-view"] });
    for (const section of sections) {
      observer.observe(section.closest("svg[data-marpit-svg]") || section, { attributes: true, attributeFilter: ["class"] });
    }
    document.addEventListener("visibilitychange", update);
    print.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    update();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
