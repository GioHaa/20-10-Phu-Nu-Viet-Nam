if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname + window.location.search);
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  setTimeout(() => window.scrollTo(0, 0), 20);
});

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  const threeScene = new RomanticThreeScene('three-container');
  const fireworks = new RomanticFireworks('fireworks-canvas');
  const audio = window.romanticAudio;

  const cfg = window.CONFIG || {};
  const currentConfig = {
    recipientName: cfg.recipientName || 'Cô Gái Tuyệt Vời Của Anh',
    senderName: cfg.senderName || 'Người Luôn Yêu & Che Chở Cho Em',
    heroSubtitle: cfg.heroSubtitle || 'Giữa hàng tỷ vì sao trong dải ngân hà, nụ cười của em là ánh sáng rực rỡ và ấm áp nhất...',
    letterTitle: cfg.letterTitle || 'Gửi người thương,',
    letterQuote: cfg.letterQuote || '"Giữa hàng vạn điều rực rỡ ngoài kia, nụ cười của em vẫn là khoảnh khắc đẹp nhất."',
    letterCharms: cfg.letterCharms || ['✨ Xinh đẹp', '🌷 Dịu dàng', '💎 Độc nhất'],
    letterPages: (cfg.letterPages && cfg.letterPages.length > 0) ? cfg.letterPages : [
      "Nhân ngày Phụ nữ Việt Nam 20/10, anh làm chiếc thiệp nhỏ này dành riêng cho em. Chúc cô gái của anh luôn rạng rỡ, tự tin và ngập tràn niềm vui trong từng khoảnh khắc.",
      "Cảm ơn em vì đã xuất hiện, mang theo sự dịu dàng và ấm áp khiến thế giới vốn bình thường của anh trở nên rực rỡ sắc màu hơn bao giờ hết.",
      "Mong rằng không chỉ riêng ngày 20/10 hôm nay, mà cả 364 ngày còn lại trong năm, em đều được yêu thương, chiều chuộng và bình yên như một nàng công chúa.",
      "Hãy luôn giữ trọn nụ cười tỏa nắng trên môi, luôn bình an, mạnh mẽ và kiêu hãnh thực hiện mọi ước mơ của mình nhé! Chúc em ngày 20/10 thật trọn vẹn và hạnh phúc bên anh! Yêu và thương em thật nhiều! ❤️"
    ],
    cardPhoto: cfg.cardPhoto || '',
    photos: cfg.photos || {},
    captions: cfg.captions || {},
    customMusicUrl: cfg.customMusicUrl || ''
  };

  if (currentConfig.customMusicUrl && audio) {
    audio.loadCustomUrl(currentConfig.customMusicUrl);
  }

  function updateDOMWithConfig() {
    const recipientElements = document.querySelectorAll('.dynamic-recipient');
    recipientElements.forEach(el => (el.textContent = currentConfig.recipientName));

    const senderElements = document.querySelectorAll('.dynamic-sender');
    senderElements.forEach(el => (el.textContent = currentConfig.senderName));

    const cardRecipientEl = document.getElementById('card-recipient');
    if (cardRecipientEl) {
      cardRecipientEl.textContent = currentConfig.letterTitle || `Gửi ${currentConfig.recipientName},`;
    }

    const cardQuoteEl = document.getElementById('card-quote');
    if (cardQuoteEl && currentConfig.letterQuote) {
      cardQuoteEl.textContent = currentConfig.letterQuote;
    }

    const charmTagsContainer = document.getElementById('card-charm-tags');
    if (charmTagsContainer && currentConfig.letterCharms && currentConfig.letterCharms.length) {
      charmTagsContainer.innerHTML = currentConfig.letterCharms.map(c => `<span class="charm">${c}</span>`).join('');
    }

    const cardPolaroidSlot = document.getElementById('card-polaroid-slot');
    const cardPhotoSrc = currentConfig.cardPhoto || (currentConfig.photos && currentConfig.photos.photo1);
    if (cardPolaroidSlot && cardPhotoSrc && cardPhotoSrc.trim()) {
      cardPolaroidSlot.innerHTML = `<div class="card-polaroid-art"><img src="${cardPhotoSrc.trim()}" alt="Ảnh kỷ niệm"></div>`;
    }

    [1, 2, 3].forEach(idx => {
      const photoSrc = currentConfig.photos && currentConfig.photos['photo' + idx];
      const slot = document.getElementById(`polaroid-slot-${idx}`);
      if (photoSrc && photoSrc.trim() && slot) {
        slot.innerHTML = `<img src="${photoSrc.trim()}" class="custom-user-photo" alt="Ảnh kỷ niệm ${idx}">`;
      }

      const captionText = currentConfig.captions && currentConfig.captions['caption' + idx];
      const captionEl = document.getElementById(`polaroid-caption-${idx}`);
      if (captionText && captionEl) {
        captionEl.textContent = captionText;
      }
    });
  }

  updateDOMWithConfig();

  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicVisualizer = document.getElementById('music-visualizer');
  const volumeSlider = document.getElementById('volume-slider');

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      audio.toggle();
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      audio.setVolume(parseFloat(e.target.value));
    });
  }

  audio.onStateChange = (isPlaying) => {
    if (musicToggleBtn) {
      if (isPlaying) {
        musicToggleBtn.classList.add('playing');
        musicToggleBtn.setAttribute('title', 'Tạm dừng nhạc');
      } else {
        musicToggleBtn.classList.remove('playing');
        musicToggleBtn.setAttribute('title', 'Phát nhạc lãng mạn');
      }
    }
    if (musicVisualizer) {
      if (isPlaying) {
        musicVisualizer.classList.add('active');
      } else {
        musicVisualizer.classList.remove('active');
      }
    }
  };

  const typewriterTarget = document.getElementById('typewriter-text');
  if (typewriterTarget) {
    const textToType = currentConfig.heroSubtitle;
    let charIndex = 0;
    typewriterTarget.textContent = '';

    function typeChar() {
      if (charIndex < textToType.length) {
        typewriterTarget.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 45);
      }
    }
    setTimeout(typeChar, 800);
  }

  const envelopeTrigger = document.getElementById('envelope-trigger');
  const envelopeStage = document.getElementById('envelope-stage');
  const bookStage = document.getElementById('book-stage');
  const bookCard = document.getElementById('book-card');
  const foldBtn = document.getElementById('fold-btn');
  const nextPageBtn = document.getElementById('next-page-btn');
  const closeBookBtn = document.getElementById('close-book-btn');
  const letterTextEl = document.getElementById('letter-text');
  const pageNumEl = document.getElementById('page-num');

  const pages = currentConfig.letterPages;
  let currentPage = 0;
  let typingInterval = null;

  function renderPageText(idx) {
    if (!letterTextEl || !pageNumEl) return;
    clearInterval(typingInterval);
    letterTextEl.textContent = '';
    pageNumEl.textContent = `Trang ${idx + 1} / ${pages.length}`;
    const fullStr = pages[idx];
    let i = 0;
    typingInterval = setInterval(() => {
      if (i < fullStr.length) {
        letterTextEl.textContent += fullStr.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 24);
  }

  function openEnvelopeAndShowBook() {
    if (!envelopeTrigger) return;
    envelopeTrigger.classList.add('open');

    if (!audio.isPlaying) {
      audio.play();
    }
    audio.playChime(true);

    fireworks.celebrateCrystalBurst(window.innerWidth / 2, window.innerHeight * 0.42, 40);

    setTimeout(() => {
      if (envelopeStage) envelopeStage.classList.add('hidden');
      if (bookStage) {
        bookStage.classList.remove('hidden');
        fireworks.celebrateCrystalBurst(window.innerWidth / 2, window.innerHeight * 0.45, 30);
      }

      setTimeout(() => {
        if (bookCard) bookCard.classList.remove('closed');
        if (foldBtn) foldBtn.innerHTML = '📖 Gập thiệp';
        currentPage = 0;
        renderPageText(0);
      }, 350);
    }, 1150);
  }

  if (envelopeTrigger) {
    envelopeTrigger.addEventListener('click', openEnvelopeAndShowBook);
  }
  const waxSealBtn = document.getElementById('wax-seal-btn');
  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelopeAndShowBook();
    });
  }

  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      currentPage = (currentPage + 1) % pages.length;
      renderPageText(currentPage);
      audio.playChime(true);
      fireworks.celebrateCrystalBurst(window.innerWidth / 2, window.innerHeight * 0.45, 25);
    });
  }

  if (foldBtn && bookCard) {
    foldBtn.addEventListener('click', () => {
      bookCard.classList.toggle('closed');
      const isClosed = bookCard.classList.contains('closed');
      foldBtn.innerHTML = isClosed ? '📖 Mở thiệp' : '📖 Gập thiệp';
      audio.playChime(false);
    });
  }

  if (closeBookBtn) {
    closeBookBtn.addEventListener('click', () => {
      clearInterval(typingInterval);
      if (bookCard) bookCard.classList.add('closed');
      if (foldBtn) foldBtn.innerHTML = '📖 Mở thiệp';
      if (bookStage) bookStage.classList.add('hidden');
      if (envelopeStage) envelopeStage.classList.remove('hidden');
      if (envelopeTrigger) envelopeTrigger.classList.remove('open');
      audio.playChime(false);
    });
  }

  const heroPulseBtn = document.getElementById('hero-heart-pulse-btn');
  if (heroPulseBtn) {
    heroPulseBtn.addEventListener('click', () => {
      threeScene.triggerHeartExplosion();
      fireworks.celebrateCrystalBurst(window.innerWidth / 2, window.innerHeight * 0.35, 35);
      audio.playChime(true);
    });
  }

  document.addEventListener('click', (e) => {

    if (e.target.closest('button, input, textarea, a, .interactive-no-spark')) return;

    createFloatingSparkleAt(e.clientX, e.clientY);
  });

  function createFloatingSparkleAt(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'click-floating-sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.innerHTML = `
      <svg viewBox="0 0 36 36" width="30" height="30">
        <defs>
          <linearGradient id="diamondGrad_${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="45%" stop-color="#ffb6c1"/>
            <stop offset="100%" stop-color="#ff2a70"/>
          </linearGradient>
        </defs>
        <path d="M18 2 C18 12, 22 18, 34 18 C22 18, 18 24, 18 34 C18 24, 14 18, 2 18 C14 18, 18 12, 18 2 Z" fill="url(#diamondGrad_${Date.now()})"/>
        <circle cx="18" cy="18" r="3" fill="#ffffff"/>
      </svg>
    `;
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1100);
  }

  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  [1, 2, 3].forEach(idx => {
    const box = document.getElementById(`polaroid-box-${idx}`);
    if (box) {
      box.addEventListener('click', () => {
        fireworks.celebrateCrystalBurst(window.innerWidth / 2, window.innerHeight * 0.45, 22);
        audio.playChime(true);
      });
    }
  });

  const wishInput = document.getElementById('wish-input');
  const makeWishBtn = document.getElementById('make-wish-btn');
  const wishPresetBtns = document.querySelectorAll('.wish-preset-pill');

  wishPresetBtns.forEach(pill => {
    pill.addEventListener('click', () => {
      if (wishInput) {
        wishInput.value = pill.textContent.trim();
        wishInput.focus();
      }
    });
  });

  if (makeWishBtn) {
    makeWishBtn.addEventListener('click', () => {
      const wishText = wishInput && wishInput.value.trim() ? wishInput.value.trim() : 'Mãi luôn rạng rỡ, bình an và hạnh phúc! 💖';

      fireworks.releaseLantern(wishText);
      setTimeout(() => fireworks.releaseLantern('20/10 Trọn Vẹn Niềm Vui'), 400);
      setTimeout(() => fireworks.releaseLantern('Yêu Thương Vô Tận'), 800);

      fireworks.launchHeartRocket(window.innerWidth * 0.25, window.innerHeight * 0.35);
      fireworks.launchHeartRocket(window.innerWidth * 0.5, window.innerHeight * 0.25);
      fireworks.launchHeartRocket(window.innerWidth * 0.75, window.innerHeight * 0.35);

      audio.playChime(true);

      showToast(`✨ Điều ước: "${wishText}" đã bay lên trời sao!`);
      if (wishInput) wishInput.value = '';
    });
  }

  const btnChoiceA = document.getElementById('game-choice-a');
  const btnChoiceB = document.getElementById('game-choice-b');
  const gameCertificate = document.getElementById('game-certificate');

  function triggerGameWin(choice) {
    audio.playChime(true);
    fireworks.celebrateCrystalBurst(window.innerWidth / 2, window.innerHeight * 0.45, 42);
    fireworks.createHeartExplosion(window.innerWidth / 2, window.innerHeight * 0.35, 45, 2.0);

    if (gameCertificate) {
      gameCertificate.classList.remove('hidden');
      gameCertificate.classList.add('show');
    }
  }

  if (btnChoiceA) {
    btnChoiceA.addEventListener('click', () => triggerGameWin('A'));
  }

  if (btnChoiceB) {
    btnChoiceB.addEventListener('click', () => triggerGameWin('B'));
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'romantic-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  const petalShowerBtn = document.getElementById('petal-shower-btn');
  if (petalShowerBtn) {
    petalShowerBtn.addEventListener('click', () => {
      threeScene.triggerHeartExplosion();
      fireworks.celebrateCrystalBurst(window.innerWidth / 2, 90, 45);
      audio.playChime(true);
      showToast('✨ Vầng hào quang ánh sáng pha lê đang bung tỏa!');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
