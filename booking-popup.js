(function () {
  var STORAGE_KEY = "chevali_booking_popup_dismissed";
  var DELAY_MS = 5000;

  var popup = document.getElementById("booking-popup");
  if (!popup) return;

  var backdrop = popup.querySelector(".booking-popup-backdrop");
  var closeBtn = popup.querySelector(".booking-popup-close");
  var primaryLink = popup.querySelector(".booking-popup-actions a.button");

  function openPopup() {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    popup.removeAttribute("hidden");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("booking-popup-active");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function dismissPopup() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    popup.setAttribute("hidden", "");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("booking-popup-active");
  }

  window.setTimeout(openPopup, DELAY_MS);

  if (closeBtn) closeBtn.addEventListener("click", dismissPopup);
  if (backdrop) backdrop.addEventListener("click", dismissPopup);

  if (primaryLink) primaryLink.addEventListener("click", dismissPopup);

  popup.addEventListener("keydown", function (e) {
    if (e.key === "Escape") dismissPopup();
  });
})();
