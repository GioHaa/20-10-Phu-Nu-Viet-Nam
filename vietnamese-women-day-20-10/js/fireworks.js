class RomanticFireworks {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '999';
      document.body.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.particles = [];
    this.rings = [];
    this.rockets = [];
    this.lanterns = [];
    this.width = (this.canvas.width = window.innerWidth);
    this.height = (this.canvas.height = window.innerHeight);
    this.isRunning = false;

    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    });
  }

  startLoop() {
    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(() => this.animate());
    }
  }

  drawDiamondStar(ctx, x, y, size, rotation, color, is8Point = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;

    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const midAngle = angle + Math.PI / 4;
      const ox = Math.cos(angle) * size;
      const oy = Math.sin(angle) * size;
      const ix = Math.cos(midAngle) * (size * 0.22);
      const iy = Math.sin(midAngle) * (size * 0.22);
      if (i === 0) ctx.moveTo(ox, oy);
      else ctx.lineTo(ox, oy);
      ctx.quadraticCurveTo(0, 0, ix, iy);
    }
    ctx.closePath();
    ctx.fill();

    if (is8Point) {
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const midAngle = angle + Math.PI / 4;
        const ox = Math.cos(angle) * (size * 0.58);
        const oy = Math.sin(angle) * (size * 0.58);
        const ix = Math.cos(midAngle) * (size * 0.14);
        const iy = Math.sin(midAngle) * (size * 0.14);
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        ctx.quadraticCurveTo(0, 0, ix, iy);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(1, size * 0.2), 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawCrystalShard(ctx, x, y, size, rotation, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.5, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.5, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.5, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  celebrateCrystalBurst(x = this.width / 2, y = this.height / 2, amount = 42) {

    this.rings.push({
      x: x,
      y: y,
      radius: 8,
      maxRadius: 180,
      alpha: 0.95,
      speed: 6.5,
      color: '#ff75a0'
    });
    this.rings.push({
      x: x,
      y: y,
      radius: 4,
      maxRadius: 130,
      alpha: 0.85,
      speed: 4.8,
      color: '#ffd700'
    });

    const colors = [
      '#ffffff',
      '#ffe4e6',
      '#ff4d88',
      '#ffd700',
      '#f472b6',
      '#fef08a'
    ];

    for (let i = 0; i < amount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3.8 + Math.random() * 7.5;
      const type = Math.random() > 0.4 ? 'star' : 'shard';

      this.particles.push({
        type: type,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.8,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.012,
        size: 9 + Math.random() * 9,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.12,
        color: colors[Math.floor(Math.random() * colors.length)],
        is8Point: Math.random() > 0.55,
        gravity: 0.11
      });
    }

    this.startLoop();
  }

  celebrateConfetti(x, y, amount) {
    this.celebrateCrystalBurst(x, y, amount);
  }

  createHeartExplosion(x, y, count = 55, scale = 2.0) {
    const colors = ['#ff2a70', '#ff69b4', '#ffb6c1', '#ffffff', '#ffd700'];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      const speed = scale * (0.8 + Math.random() * 0.35);
      const vx = (hx / 16) * speed;
      const vy = (hy / 16) * speed;

      this.particles.push({
        type: 'spark',
        x: x,
        y: y,
        vx: vx + (Math.random() - 0.5) * 0.3,
        vy: vy + (Math.random() - 0.5) * 0.3,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.015,
        size: 2.2 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    if (window.romanticAudio) {
      window.romanticAudio.playChime(false);
    }
    this.startLoop();
  }

  launchHeartRocket(startX = null, targetY = null) {
    const sx = startX !== null ? startX : Math.random() * (this.width - 200) + 100;
    const ty = targetY !== null ? targetY : Math.random() * (this.height * 0.35) + 120;
    const speed = 7 + Math.random() * 3;

    this.rockets.push({
      x: sx,
      y: this.height + 20,
      targetY: ty,
      vx: (Math.random() - 0.5) * 1.2,
      vy: -speed
    });
    this.startLoop();
  }

  releaseLantern(text = "Chúc 20/10 An Nhiên") {
    const x = Math.random() * (this.width - 150) + 75;
    this.lanterns.push({
      x: x,
      y: this.height + 60,
      vy: -(1.2 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 0.5,
      scale: 0.8 + Math.random() * 0.35,
      wobble: Math.random() * Math.PI * 2,
      text: text
    });
    this.startLoop();
  }

  animate() {
    if (this.particles.length === 0 && this.rings.length === 0 && this.rockets.length === 0 && this.lanterns.length === 0) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.isRunning = false;
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.rings.length - 1; i >= 0; i--) {
      const ring = this.rings[i];
      ring.radius += ring.speed;
      ring.alpha -= 0.022;

      if (ring.alpha <= 0 || ring.radius >= ring.maxRadius) {
        this.rings.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, ring.alpha);
      this.ctx.strokeStyle = ring.color;
      this.ctx.lineWidth = 2.5 * (1 - ring.radius / ring.maxRadius) + 0.5;
      this.ctx.beginPath();
      this.ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }

    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.x += r.vx;
      r.y += r.vy;

      this.ctx.fillStyle = 'rgba(255, 182, 193, 0.9)';
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
      this.ctx.fill();

      if (r.y <= r.targetY) {
        this.createHeartExplosion(r.x, r.y, 50, 2.2);
        this.rockets.splice(i, 1);
      }
    }

    this.ctx.save();
    this.ctx.globalCompositeOperation = 'lighter';

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.gravity) {
        p.vy += p.gravity;
        p.vx *= 0.985;
      } else {
        p.vy += 0.035;
        p.vx *= 0.985;
        p.vy *= 0.985;
      }

      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.type === 'star') {
        p.rotation += p.rotSpeed;
        this.drawDiamondStar(this.ctx, p.x, p.y, p.size, p.rotation, p.color, p.is8Point);
      } else if (p.type === 'shard') {
        p.rotation += p.rotSpeed;
        this.drawCrystalShard(this.ctx, p.x, p.y, p.size, p.rotation, p.color);
      } else {

        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
    this.ctx.restore();

    for (let i = this.lanterns.length - 1; i >= 0; i--) {
      const l = this.lanterns[i];
      l.y += l.vy;
      l.wobble += 0.02;
      l.x += Math.sin(l.wobble) * 0.4 + l.vx;

      if (l.y < -120) {
        this.lanterns.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(l.x, l.y);
      this.ctx.scale(l.scale, l.scale);

      const grad = this.ctx.createRadialGradient(0, 0, 4, 0, 0, 30);
      grad.addColorStop(0, 'rgba(255, 240, 210, 0.95)');
      grad.addColorStop(0.6, 'rgba(255, 120, 160, 0.8)');
      grad.addColorStop(1, 'rgba(255, 80, 120, 0.05)');

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.moveTo(-16, -22);
      this.ctx.quadraticCurveTo(0, -28, 16, -22);
      this.ctx.quadraticCurveTo(22, 0, 14, 22);
      this.ctx.quadraticCurveTo(0, 26, -14, 22);
      this.ctx.quadraticCurveTo(-22, 0, -16, -22);
      this.ctx.fill();

      this.ctx.fillStyle = '#fff9db';
      this.ctx.beginPath();
      this.ctx.arc(0, 12, 4.5, 0, Math.PI * 2);
      this.ctx.fill();

      if (l.text) {
        this.ctx.font = '11px "Quicksand", sans-serif';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(l.text, 0, -2);
      }
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.RomanticFireworks = RomanticFireworks;
