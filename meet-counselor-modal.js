(function () {
  var root = document.getElementById("meet-counselor-overlay");
  if (!root) return;

  var panels = root.querySelectorAll("[data-meet-panel]");
  var closeNodes = root.querySelectorAll("[data-meet-close]");

  function open(which) {
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    panels.forEach(function (p) {
      p.hidden = p.getAttribute("data-meet-panel") !== which;
    });
    var closeBtn = root.querySelector(".meet-overlay__close");
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-meet-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      open(btn.getAttribute("data-meet-open"));
    });
  });

  closeNodes.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      close();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !root.hidden) {
      close();
    }
  });
})();
