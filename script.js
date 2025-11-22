(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const size = 52;
  let x = window.innerWidth / 2 - size / 2;
  let y = window.innerHeight / 2 - size / 2;
  let targetX = x;
  let targetY = y;
  let dragging = false;

  const followSpeed = 12;
  let lastTime = performance.now();

  function draw() {
    ctx.fillStyle = "blue"; // arka plan
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red"; // kare
    ctx.fillRect(x, y, size, size);
  }

  function update(dt) {
    const k = Math.min(1, followSpeed * dt);
    x += (targetX - x) * k;
    y += (targetY - y) * k;
  }

  function loop(t) {
    const dt = (t - lastTime) / 1000;
    lastTime = t;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  function setTarget(px, py) {
    targetX = px - size / 2;
    targetY = py - size / 2;
  }

  // Dokunma
  canvas.addEventListener("touchstart", (e) => {
    dragging = true;
    setTarget(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    setTarget(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchend", () => { dragging = false; });
  canvas.addEventListener("touchcancel", () => { dragging = false; });

  // Mouse
  canvas.addEventListener("mousedown", (e) => {
    dragging = true;
    setTarget(e.clientX, e.clientY);
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    setTarget(e.clientX, e.clientY);
  });
  canvas.addEventListener("mouseup", () => { dragging = false; });

  requestAnimationFrame(loop);
})();