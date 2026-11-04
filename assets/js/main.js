(function () {
  var root = document.documentElement;

  // ---- Light / dark theme ----
  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // ---- Mobile navigation ----
  var navBtn = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav-links");
  if (navBtn && nav) {
    navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ---- Abstract / BibTeX toggles ----
  document.querySelectorAll("[data-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pub = btn.closest(".pub");
      var target = pub.querySelector("." + btn.getAttribute("data-toggle"));
      var willOpen = target.hasAttribute("hidden");
      // close siblings so only one panel is open per paper
      pub.querySelectorAll("[data-toggle]").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
        pub.querySelector("." + b.getAttribute("data-toggle")).setAttribute("hidden", "");
      });
      if (willOpen) {
        target.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ---- Email (assembled here to keep it away from scrapers) ----
  var addr = ["yamanokuchi.tomoya", "naist.ac.jp"].join("@");
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + addr);
    if (el.hasAttribute("data-email-text")) el.textContent = addr;
  });

  // ---- Footer year ----
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
