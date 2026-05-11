(function () {
  var panel = document.getElementById("about-story-panel");
  var btn = document.querySelector("[data-about-toggle]");
  if (!panel || !btn) return;

  var label = btn.querySelector(".about-fabric-toggle-label");
  var collapsed = true;

  function sync() {
    panel.classList.toggle("about-fabric-panel--collapsed", collapsed);
    btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    btn.classList.toggle("about-fabric-toggle--expanded", !collapsed);
    if (label) {
      label.textContent = collapsed ? "+ MORE" : "− LESS";
    }
  }

  btn.addEventListener("click", function () {
    collapsed = !collapsed;
    sync();
  });

  sync();
})();
