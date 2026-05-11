(function () {
  var mq = window.matchMedia("(max-width: 880px)");

  function initMega(mega) {
    var tabs = mega.querySelectorAll(".site-nav__mega-l2-btn");
    var panes = mega.querySelectorAll("[data-mega-pane]");
    var visuals = mega.querySelectorAll("[data-mega-visual]");

    function setActive(key) {
      mega.setAttribute("data-active", key);
      tabs.forEach(function (t) {
        var k = t.getAttribute("data-mega-tab");
        var on = k === key;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panes.forEach(function (p) {
        var k = p.getAttribute("data-mega-pane");
        var on = k === key;
        p.classList.toggle("is-active", on);
        if (on) {
          p.removeAttribute("hidden");
        } else {
          p.setAttribute("hidden", "");
        }
      });
      visuals.forEach(function (v) {
        var k = v.getAttribute("data-mega-visual");
        v.classList.toggle("is-active", k === key);
      });
    }

    var initial = mega.getAttribute("data-active") || "visitor";
    setActive(initial);

    tabs.forEach(function (btn) {
      var tabKey = btn.getAttribute("data-mega-tab");
      if (!tabKey) return;

      btn.addEventListener("mouseenter", function () {
        if (!mq.matches) {
          setActive(tabKey);
        }
      });

      btn.addEventListener("click", function () {
        setActive(tabKey);
      });

      btn.addEventListener("focus", function () {
        setActive(tabKey);
      });
    });
  }

  document.querySelectorAll(".site-nav__mega").forEach(initMega);

  document.querySelectorAll(".site-nav__dropdown").forEach(function (wrap) {
    var btn = wrap.querySelector(".site-nav__dropdown-trigger");
    var panel = wrap.querySelector(".site-nav__dropdown-panel");
    if (!btn || !panel) return;

    function close() {
      wrap.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }

    function open() {
      wrap.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }

    btn.addEventListener("click", function (e) {
      if (!mq.matches) return;
      e.preventDefault();
      if (wrap.classList.contains("is-open")) {
        close();
      } else {
        open();
      }
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        close();
      });
    });

    document.addEventListener("click", function (e) {
      if (!mq.matches) return;
      if (!wrap.contains(e.target)) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    mq.addEventListener("change", function () {
      if (!mq.matches) close();
    });
  });
})();
