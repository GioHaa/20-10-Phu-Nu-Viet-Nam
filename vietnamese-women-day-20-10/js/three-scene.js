class RomanticThreeScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.heartParticles = null;
    this.heartGroup = null;
    this.heartGeometry = null;
    this.originalHeartPositions = [];
    this.petals = [];
    this.stardust = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetRotationX = 0;
    this.targetRotationY = 0;
    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };
    this.explosionProgress = 0;
    this.isExploding = false;

    this.clock = null;
    this.mode = 'all';
    this.petalCount = 45;
    this.heartParticleCount = 2400;

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded. Falling back to 2D Canvas.');
      this.init2DFallback();
      return;
    }

    try {
      this.initThree();
      this.setupLights();
      this.createHeartParticleSystem();
      this.createFallingPetals();
      this.createStardust();
      this.addEventListeners();
      this.animate();
    } catch (err) {
      console.error('WebGL init error:', err);
      this.init2DFallback();
    }
  }

  initThree() {
    this.scene = new THREE.Scene();

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.z = 45;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setClearColor(0x000000, 0);

    this.container.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffe6eb, 0.9);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xff69b4, 1.2);
    dirLight1.position.set(20, 30, 25);
    this.scene.add(dirLight1);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 60);
    pointLight.position.set(0, 0, 15);
    this.scene.add(pointLight);
  }

  createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(255, 182, 193, 0.9)');
    gradient.addColorStop(0.55, 'rgba(255, 105, 180, 0.45)');
    gradient.addColorStop(1, 'rgba(255, 105, 180, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  createHeartParticleSystem() {
    this.heartGroup = new THREE.Group();
    const count = this.heartParticleCount;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalPos = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    const colorChoices = [
      new THREE.Color('#ff4d88'),
      new THREE.Color('#ff75a0'),
      new THREE.Color('#ffb6c1'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#ffe4e6')
    ];

    for (let i = 0; i < count; i++) {

      const t = (Math.random() * 2 - 1) * Math.PI;

      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

      const fillRadius = Math.pow(Math.random(), 0.6);
      const zOffset = (Math.random() - 0.5) * 8 * Math.sin(Math.abs(t));
      const jitter = (Math.random() - 0.5) * 1.5;

      const px = (x * fillRadius + jitter) * 0.75;
      const py = (y * fillRadius + jitter) * 0.75;
      const pz = zOffset * fillRadius;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      originalPos[i * 3] = px;
      originalPos[i * 3 + 1] = py;
      originalPos[i * 3 + 2] = pz;

      const length = Math.sqrt(px * px + py * py + pz * pz) || 1;
      velocities[i * 3] = (px / length) * (15 + Math.random() * 25);
      velocities[i * 3 + 1] = (py / length) * (15 + Math.random() * 25);
      velocities[i * 3 + 2] = (pz / length) * (15 + Math.random() * 25);

      const selectedColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.heartGeometry = geometry;
    this.originalHeartPositions = originalPos;
    this.heartVelocities = velocities;

    const material = new THREE.PointsMaterial({
      size: 0.95,
      map: this.createParticleTexture(),
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.95
    });

    this.heartParticles = new THREE.Points(geometry, material);
    this.heartGroup.add(this.heartParticles);
    this.heartGroup.position.set(0, 1.5, 0);

    this.scene.add(this.heartGroup);
  }

  createFallingPetals() {
    this.petals = [];
    const petalTexture = this.createPetalTexture();

    const petalGeom = new THREE.PlaneGeometry(1.4, 1.8, 4, 4);

    const pos = petalGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const curveZ = -0.35 * (1 - (u * u) / 0.5) * (1 - (v * v) / 0.8);
      pos.setZ(i, curveZ);
    }
    petalGeom.computeVertexNormals();

    const petalMat = new THREE.MeshStandardMaterial({
      map: petalTexture,
      side: THREE.DoubleSide,
      transparent: true,
      roughness: 0.5,
      metalness: 0.1,
      alphaTest: 0.05
    });

    for (let i = 0; i < this.petalCount; i++) {
      const mesh = new THREE.Mesh(petalGeom, petalMat);

      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50 + 10,
        (Math.random() - 0.5) * 40 - 5
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const scale = 0.6 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        speedY: 0.05 + Math.random() * 0.08,
        speedX: (Math.random() - 0.5) * 0.03,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        flutterOffset: Math.random() * Math.PI * 2,
        windStrength: 0.02 + Math.random() * 0.03
      };

      this.scene.add(mesh);
      this.petals.push(mesh);
    }
  }

  createPetalTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(64, 155);
    ctx.bezierCurveTo(15, 120, 5, 50, 40, 15);
    ctx.bezierCurveTo(55, 3, 73, 3, 88, 15);
    ctx.bezierCurveTo(123, 50, 113, 120, 64, 155);
    ctx.closePath();

    const grad = ctx.createRadialGradient(64, 90, 5, 64, 80, 75);
    grad.addColorStop(0, '#ff1a66');
    grad.addColorStop(0.4, '#ff6699');
    grad.addColorStop(0.75, '#ffb3cc');
    grad.addColorStop(1, '#ffe6ee');

    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(64, 150);
    ctx.quadraticCurveTo(62, 90, 64, 25);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }

  createStardust() {
    const starCount = 1200;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const isWhite = Math.random() > 0.4;
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = isWhite ? 0.95 : 0.65;
      colors[i * 3 + 2] = isWhite ? 0.98 : 0.85;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.55,
      map: this.createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.stardust = new THREE.Points(geom, mat);
    this.scene.add(this.stardust);
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.onResize());

    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (this.isDragging) {
        const deltaX = e.clientX - this.prevMousePos.x;
        const deltaY = e.clientY - this.prevMousePos.y;
        this.targetRotationY += deltaX * 0.01;
        this.targetRotationX += deltaY * 0.01;
        this.prevMousePos = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - this.prevMousePos.x;
        const deltaY = e.touches[0].clientY - this.prevMousePos.y;
        this.targetRotationY += deltaX * 0.012;
        this.targetRotationX += deltaY * 0.012;
        this.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, input, textarea, a, .envelope-card, .wax-seal-btn, .modal-card, .polaroid-frame, .game-card')) {
        return;
      }
      this.isDragging = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.container.addEventListener('click', (e) => {
      this.triggerHeartExplosion();
      if (window.romanticAudio) {
        window.romanticAudio.playChime(true);
      }
    });
  }

  triggerHeartExplosion() {
    this.isExploding = true;
    this.explosionProgress = 0;
  }

  setMode(newMode) {
    this.mode = newMode;
    const showHeart = (newMode === 'all' || newMode === 'heart' || newMode === 'galaxy' || newMode === 'fireworks');
    const showStardust = (newMode === 'all' || newMode === 'galaxy' || newMode === 'fireworks');
    const showPetals = (newMode === 'all' || newMode === 'fireworks');

    if (this.heartGroup) {
      this.heartGroup.visible = showHeart;
    }
    if (this.stardust) {
      this.stardust.visible = showStardust;
    }
    if (this.petals) {
      this.petals.forEach(p => (p.visible = showPetals));
    }

    if (newMode === 'fireworks' || newMode === 'heart') {
      this.triggerHeartExplosion();
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    if (this.heartGroup) {

      const t = elapsedTime * 4.0;
      const beat1 = Math.sin(t);
      const beat2 = Math.sin(t + 0.5);
      const pulse = (beat1 > 0 ? Math.pow(beat1, 4) * 0.08 : 0) +
                    (beat2 > 0 ? Math.pow(beat2, 6) * 0.04 : 0);

      const baseScale = 1.0;
      const currentScale = baseScale + pulse;
      this.heartGroup.scale.set(currentScale, currentScale, currentScale);

      this.heartGroup.rotation.y += (this.targetRotationY - this.heartGroup.rotation.y) * 0.06;
      this.heartGroup.rotation.x += (this.targetRotationX - this.heartGroup.rotation.x) * 0.06;

      this.heartGroup.rotation.y += Math.sin(elapsedTime * 0.6) * 0.003;
      this.heartGroup.position.y = 1.5 + Math.sin(elapsedTime * 1.5) * 0.4;

      if (this.heartGeometry && this.isExploding) {
        const posAttr = this.heartGeometry.attributes.position;
        const arr = posAttr.array;
        const count = this.heartParticleCount;

        this.explosionProgress += delta * 1.8;
        const factor = Math.sin(this.explosionProgress * Math.PI) * 0.55;

        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          arr[idx] = this.originalHeartPositions[idx] + this.heartVelocities[idx] * factor;
          arr[idx + 1] = this.originalHeartPositions[idx + 1] + this.heartVelocities[idx + 1] * factor;
          arr[idx + 2] = this.originalHeartPositions[idx + 2] + this.heartVelocities[idx + 2] * factor;
        }
        posAttr.needsUpdate = true;

        if (this.explosionProgress >= 1.0) {
          this.isExploding = false;
          arr.set(this.originalHeartPositions);
          posAttr.needsUpdate = true;
        }
      }
    }

    for (let i = 0; i < this.petals.length; i++) {
      const petal = this.petals[i];
      const data = petal.userData;

      petal.position.y -= data.speedY;
      petal.position.x += Math.sin(elapsedTime * 1.2 + data.flutterOffset) * data.windStrength + data.speedX;
      petal.position.z += Math.cos(elapsedTime * 0.9 + data.flutterOffset) * 0.015;

      petal.rotation.x += data.rotSpeedX;
      petal.rotation.y += data.rotSpeedY;
      petal.rotation.z += data.rotSpeedZ;

      if (petal.position.y < -25) {
        petal.position.y = 28 + Math.random() * 8;
        petal.position.x = (Math.random() - 0.5) * 60;
        petal.position.z = (Math.random() - 0.5) * 40 - 5;
      }
    }

    if (this.stardust) {
      this.stardust.rotation.y = elapsedTime * 0.02;
      this.stardust.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;
    }

    this.camera.position.x += (this.mouseX * 2.5 - this.camera.position.x) * 0.03;
    this.camera.position.y += (-this.mouseY * 2.0 - this.camera.position.y) * 0.03;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  init2DFallback() {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas-fallback';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    this.container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 5 + Math.random() * 8,
        speedY: 1 + Math.random() * 2,
        speedX: (Math.random() - 0.5) * 1.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03
      });
    }

    function render2D() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = 'rgba(255, 182, 193, 0.75)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(render2D);
    }
    render2D();
  }
}

window.RomanticThreeScene = RomanticThreeScene;
