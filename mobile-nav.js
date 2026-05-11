(function () {
  var mq = window.matchMedia("(max-width: 880px)");
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("mobile-nav-toggle");
  var backdrop = document.querySelector(".mobile-nav-backdrop");
  var nav = document.getElementById("primary-navigation");

  if (!header || !toggle || !nav) return;

  function measureHeader() {
    var row = header.querySelector(".header-row");
    if (row) {
      document.documentElement.style.setProperty(
        "--site-header-offset",
        row.offsetHeight + "px"
      );
    }
  }

  function closeDropdowns() {
    header.querySelectorAll(".site-nav__dropdown.is-open").forEach(function (w) {
      w.classList.remove("is-open");
      var b = w.querySelector(".site-nav__dropdown-trigger");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }

  function openMenu() {
    header.classList.add("is-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "关闭导航菜单");
    document.body.classList.add("mobile-nav-open");
    measureHeader();
  }

  function closeMenu() {
    header.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "打开导航菜单");
    document.body.classList.remove("mobile-nav-open");
    closeDropdowns();
  }

  function onToggleClick(e) {
    if (!mq.matches) return;
    e.preventDefault();
    if (header.classList.contains("is-menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener("click", onToggleClick);

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      if (mq.matches) closeMenu();
    });
  }

  nav.addEventListener("click", function (e) {
    if (!mq.matches) return;
    var t = e.target;
    if (t && t.closest && t.closest("a[href]")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("is-menu-open")) {
      closeMenu();
    }
  });

  mq.addEventListener("change", function () {
    if (!mq.matches) closeMenu();
    measureHeader();
  });

  window.addEventListener("resize", function () {
    measureHeader();
  });

  measureHeader();
})();
