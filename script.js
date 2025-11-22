(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // 1000 adet minicik kare
  const particles = [];
  const count = 1000;
  const size = 4; // kare boyutu

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: 0,
      vy: 0
    });
  }

  const friction = 0.98; // sürtünme
  const accel = 0.5;     // sensör hassasiyet

  function draw() {
    ctx.fillStyle = "blue"; // arka plan
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red"; // kareler kırmızı
    for (const p of particles) {
      ctx.fillRect(p.x, p.y, size, size);
    }
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      p.vx *= friction;
      p.vy *= friction;

      // sınırlar
      if (p.x < 0) { p.x = 0; p.vx = -p.vx * 0.5; }
      if (p.y < 0) { p.y = 0; p.vy = -p.vy * 0.5; }
      if (p.x > window.innerWidth - size) { p.x = window.innerWidth - size; p.vx = -p.vx * 0.5; }
      if (p.y > window.innerHeight - size) { p.y = window.innerHeight - size; p.vy = -p.vy * 0.5; }
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // Telefon sensörleri
  window.addEventListener("deviceorientation", (e) => {
    const ax = e.gamma * accel * 0.01;
    const ay = e.beta * accel * 0.01;
    for (const p of particles) {
      p.vx += ax;
      p.vy += ay;
    }
  });

  // Mouse test (PC için)
  canvas.addEventListener("mousemove", (e) => {
    if (e.buttons) {
      for (const p of particles) {
        p.vx += e.movementX * 0.02;
        p.vy += e.movementY * 0.02;
      }
    }
  });

  loop();
})();