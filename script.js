// script.js (clean full version)
(() => {
  "use strict";

  // ====================
  // HELPERS
  // ====================
  const q = (sel, ctx = document) => ctx.querySelector(sel);
  const qAll = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ====================
  // NAVBAR MOBILE TOGGLE
  // ====================
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden'); // show/hide
  });

  // ====================
  // EXPERIENCE SLIDER
  // ====================
  function initExperience(container = document) {
    const heroBg = q('#experienceBg', container);
    const title = q('#title', container);
    const desc = q('#desc', container);
    const thumbs = qAll('.exp-thumb', container);

    if (!heroBg || !thumbs.length) return;

    function changeSlide(el) {
      const bg = el.dataset.bg;
      const ttl = el.dataset.title || "";
      const dsc = el.dataset.desc || "";

      // update background
      heroBg.style.backgroundImage = `url(${bg})`;

      // update text
      if (title) title.textContent = ttl;
      if (desc) desc.textContent = dsc;

    }

    // event listener
    thumbs.forEach((t, i) => {
      t.addEventListener("click", () => changeSlide(t));
    });

    // set default
    changeSlide(thumbs[0]);
  }

  // ====================
  // LOAD SECTION (AJAX)
  // ====================
  function loadSection(id, url, initFn) {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Gagal load " + url);
        return res.text();
      })
      .then(html => {
        const container = document.getElementById(id);
        if (!container) return;
        container.innerHTML = html;

        if (typeof initFn === "function") initFn(container);
        initNavbar(container);
      })
      .catch(err => console.error("Error loadSection:", err));
  }

  // ====================
  // INIT APP
  // ====================
  const sections = [
    ["home", "./home.html"],
    ["destinations", "./destinations.html"],
    ["experience", "./experience.html", initExperience],
    ["travel-guide", "./travel-guide.html"],
    ["footer", "./footer.html"]
  ];

  document.addEventListener("DOMContentLoaded", () => {
    sections.forEach(([id, file, fn]) => loadSection(id, file, fn));
  });

  // expose
  window.app = { loadSection, initNavbar, initExperience };
})();
