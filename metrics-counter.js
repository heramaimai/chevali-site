(function () {
  var el = document.getElementById("metrics-counter");
  var section = document.getElementById("metrics");
  if (!el || !section) return;

  var target = parseInt(el.getAttribute("data-target"), 10);
  if (Number.isNaN(target)) target = 1500;

  var reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function format(n) {
    return n.toLocaleString("zh-CN");
  }

  function runCount() {
    if (reduced) {
      el.textContent = format(target);
      return;
    }

    var start = performance.now();
    var duration = 2200;

    function easeOutQuad(t) {
      return 1 - (1 - t) * (1 - t);
    }

    function tick(now) {
      var p = Math.min(1, (now - start) / duration);
      var eased = easeOutQuad(p);
      var val = Math.round(eased * target);
      el.textContent = format(val);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = format(target);
    }

    requestAnimationFrame(tick);
  }

  var done = false;
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || done) return;
        done = true;
        runCount();
        obs.disconnect();
      });
    },
    {
      /* 任意像素进入视口即触发（一划到这屏就开始增长） */
      threshold: 0,
      rootMargin: "0px",
    }
  );

  obs.observe(section);
})();
