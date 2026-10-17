(function () {

  const CURSOR_PRESETS = {

    wand: {
      default: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34'%3E%3Cdefs%3E%3Cfilter id='s' x='-25%25' y='-25%25' width='150%25' height='150%25'%3E%3CfeDropShadow dx='1' dy='2' stdDeviation='1.5' flood-color='%23831843' flood-opacity='0.4'/%3E%3C/filter%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ff6b9d'/%3E%3Cstop offset='100%25' stop-color='%23ff2a70'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg filter='url(%23s)'%3E%3Cpath d='M12 16 L28 32' stroke='%23ffffff' stroke-width='5' stroke-linecap='round'/%3E%3Cpath d='M12 16 L28 32' stroke='%23ff85a2' stroke-width='3' stroke-linecap='round'/%3E%3Cpath d='M5 14 C1 9, 3 2, 8 2 C10.8 2, 12 4.2, 12 4.2 C12 4.2, 13.2 2, 16 2 C21 2, 23 9, 19 14 L12 20 Z' fill='url(%23g)' stroke='%23ffffff' stroke-width='2' stroke-linejoin='round'/%3E%3Cpath d='M6 7 C5 9, 6 11, 7 12' stroke='%23ffffff' stroke-width='1.4' stroke-linecap='round' fill='none'/%3E%3Cpolygon points='23,4 24.5,7.5 28,9 24.5,10.5 23,14 21.5,10.5 18,9 21.5,7.5' fill='%23fbbf24' stroke='%23ffffff' stroke-width='0.8'/%3E%3C/g%3E%3C/svg%3E") 3 3, auto`,
      pointer: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cdefs%3E%3Cfilter id='sh' x='-25%25' y='-25%25' width='150%25' height='150%25'%3E%3CfeDropShadow dx='0' dy='2' stdDeviation='2' flood-color='%239f1239' flood-opacity='0.48'/%3E%3C/filter%3E%3ClinearGradient id='hg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ff4d88'/%3E%3Cstop offset='100%25' stop-color='%23e11d48'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg filter='url(%23sh)'%3E%3Cpath d='M10 14 C5 10, 4 4, 11 6 C13 7, 14 11, 14 12' fill='none' stroke='%23ffffff' stroke-width='2.6' stroke-linecap='round'/%3E%3Cpath d='M26 14 C31 10, 32 4, 25 6 C23 7, 22 11, 22 12' fill='none' stroke='%23ffffff' stroke-width='2.6' stroke-linecap='round'/%3E%3Cpath d='M10 14 C5 10, 4 4, 11 6 C13 7, 14 11, 14 12' fill='none' stroke='%23f472b6' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M26 14 C31 10, 32 4, 25 6 C23 7, 22 11, 22 12' fill='none' stroke='%23f472b6' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M18 10 C14 5, 8 7, 8 13 C8 19, 14 24, 18 28 C22 24, 28 19, 28 13 C28 7, 22 5, 18 10 Z' fill='url(%23hg)' stroke='%23ffffff' stroke-width='2.2' stroke-linejoin='round'/%3E%3Cpath d='M11 11 C9 13, 10 16, 12 18' stroke='%23ffffff' stroke-width='1.6' stroke-linecap='round' fill='none'/%3E%3Cpolygon points='18,1 19,3 21,3.5 19,4.5 18,6.5 17,4.5 15,3.5 17,3' fill='%23fbbf24' stroke='%23ffffff' stroke-width='0.6'/%3E%3C/g%3E%3C/svg%3E") 18 10, pointer`
    },

    bunny: {
      default: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34'%3E%3Cdefs%3E%3Cfilter id='bs' x='-25%25' y='-25%25' width='150%25' height='150%25'%3E%3CfeDropShadow dx='1' dy='2' stdDeviation='1.5' flood-color='%23831843' flood-opacity='0.35'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23bs)'%3E%3Cellipse cx='18' cy='20' rx='10' ry='8' fill='%23ffffff' stroke='%23f472b6' stroke-width='2'/%3E%3Cellipse cx='18' cy='21' rx='4.5' ry='3.5' fill='%23ff6b9d'/%3E%3Ccircle cx='12' cy='15' r='2' fill='%23ff85a2'/%3E%3Ccircle cx='16' cy='13' r='2' fill='%23ff85a2'/%3E%3Ccircle cx='20' cy='13' r='2' fill='%23ff85a2'/%3E%3Ccircle cx='24' cy='15' r='2' fill='%23ff85a2'/%3E%3Cpath d='M4 4 L14 7 L10 10 L13 15 L10 16 L7 11 L4 13 Z' fill='%23ff3377' stroke='%23ffffff' stroke-width='1.8' stroke-linejoin='round'/%3E%3C/g%3E%3C/svg%3E") 4 4, auto`,
      pointer: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cdefs%3E%3Cfilter id='bsh' x='-25%25' y='-25%25' width='150%25' height='150%25'%3E%3CfeDropShadow dx='0' dy='2' stdDeviation='2' flood-color='%239f1239' flood-opacity='0.45'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23bsh)'%3E%3Cellipse cx='18' cy='20' rx='12' ry='10' fill='%23fff0f5' stroke='%23ff2a70' stroke-width='2'/%3E%3Cpath d='M18 16 C16 13, 13 14, 13 17 C13 20, 18 24, 18 24 C18 24, 23 20, 23 17 C23 14, 20 13, 18 16 Z' fill='%23ff2a70'/%3E%3Ccircle cx='11' cy='14' r='2.5' fill='%23ff6b9d'/%3E%3Ccircle cx='15' cy='10' r='2.5' fill='%23ff6b9d'/%3E%3Ccircle cx='21' cy='10' r='2.5' fill='%23ff6b9d'/%3E%3Ccircle cx='25' cy='14' r='2.5' fill='%23ff6b9d'/%3E%3Cpolygon points='18,3 19,5 21,5.5 19,6.5 18,8.5 17,6.5 15,5.5 17,5' fill='%23fbbf24' stroke='%23ffffff' stroke-width='0.6'/%3E%3C/g%3E%3C/svg%3E") 18 10, pointer`
    },

    star: {
      default: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cdefs%3E%3Cfilter id='ss' x='-25%25' y='-25%25' width='150%25' height='150%25'%3E%3CfeDropShadow dx='1' dy='2' stdDeviation='1.5' flood-color='%23831843' flood-opacity='0.35'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23ss)'%3E%3Cpath d='M3 3 L12 25 L16 16 L25 12 Z' fill='%23ff5c8a' stroke='%23ffffff' stroke-width='2' stroke-linejoin='round'/%3E%3Cpath d='M5 6 L11 22 L14 15 L21 12 Z' fill='%23ff85a2'/%3E%3Cpolygon points='22,17 23.5,21 27,22.5 23.5,24 22,28 20.5,24 17,22.5 20.5,21' fill='%23fde047' stroke='%23ffffff' stroke-width='1'/%3E%3Ccircle cx='8' cy='10' r='1.5' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E") 3 3, auto`,
      pointer: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34'%3E%3Cdefs%3E%3Cfilter id='ssh' x='-25%25' y='-25%25' width='150%25' height='150%25'%3E%3CfeDropShadow dx='0' dy='2' stdDeviation='2' flood-color='%239f1239' flood-opacity='0.45'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23ssh)'%3E%3Cpolygon points='17,3 21,12 31,13 23,20 26,30 17,24 8,30 11,20 3,13 13,12' fill='%23ffd700' stroke='%23ffffff' stroke-width='2' stroke-linejoin='round'/%3E%3Ccircle cx='17' cy='17' r='4' fill='%23ff4d88'/%3E%3C/g%3E%3C/svg%3E") 17 17, pointer`
    }
  };

  function applyCursorStyle(styleKey) {
    const selected = CURSOR_PRESETS[styleKey] || CURSOR_PRESETS.wand;

    let styleTag = document.getElementById('cute-cursor-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'cute-cursor-styles';
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      html, body {
        cursor: ${selected.default} !important;
      }
      a, button, input[type="button"], input[type="submit"], [role="button"],
      .btn-romantic-primary, .btn-romantic-secondary, .btn-icon-nav,
      .luxury-envelope, .realistic-wax-seal, .wish-preset-pill,
      .btn-fold, .btn-card-primary, .btn-rewind-envelope,
      .polaroid-frame, .polaroid-content-slot, .game-card,
      #wax-seal-btn, #envelope-trigger, .tilt-card {
        cursor: ${selected.pointer} !important;
      }
    `;
  }

  function initFairyDustTrail() {
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let activeParticles = 0;
    const MAX_PARTICLES = 16;

    const shapes = ['💖', '✨', '🌸', '⭐', '💫', '🌷'];
    const colors = ['#ff4d88', '#f43f5e', '#fb7185', '#fbbf24', '#f472b6', '#ec4899'];

    const trailContainer = document.createElement('div');
    trailContainer.id = 'cursor-trail-layer';
    trailContainer.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:hidden;';
    document.body.appendChild(trailContainer);

    function spawnParticle(x, y) {
      if (activeParticles >= MAX_PARTICLES) return;
      activeParticles++;

      const p = document.createElement('div');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 11 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      const dist = 12 + Math.random() * 20;
      const destX = Math.cos(angle) * dist;
      const destY = Math.sin(angle) * dist + 15;
      const rot = (Math.random() - 0.5) * 60;

      p.textContent = shape;
      p.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        color: ${color};
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
        opacity: 0.95;
        transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease-out;
        pointer-events: none;
        user-select: none;
        filter: drop-shadow(0 2px 5px rgba(255, 77, 136, 0.45));
      `;

      trailContainer.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0.3) rotate(${rot}deg)`;
        p.style.opacity = '0';
      });

      setTimeout(() => {
        p.remove();
        activeParticles--;
      }, 700);
    }

    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 16 && now - lastTime > 35) {
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
        spawnParticle(e.clientX, e.clientY);
      }
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const cfg = window.CONFIG || {};
    const chosenStyle = cfg.cursorStyle || 'wand';
    applyCursorStyle(chosenStyle);

    if (cfg.enableCursorTrail !== false) {
      initFairyDustTrail();
    }
  });

  window.setCuteCursor = applyCursorStyle;
})();
