/**
 * PT Indo Kreasi - Game Development Studio
 * Interactive Scripts & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initNavbar();
  initStatsCounter();
  initGameFilter();
  initModals();
  initForms();
  initSoundFX();
});

/* ===================================================================
   1. Interactive Ambient Particle Canvas
   =================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255,' : 'rgba(139, 92, 246,',
      alpha: Math.random() * 0.6 + 0.2,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ===================================================================
   2. Navbar Scroll & Mobile Menu
   =================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }
}

/* ===================================================================
   3. Animated Stats Counter
   =================================================================== */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-num');
  let started = false;

  function countUp() {
    stats.forEach((stat) => {
      const target = +stat.getAttribute('data-target');
      const duration = 1800;
      const step = Math.ceil(target / (duration / 25));
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = current;
        }
      }, 25);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          countUp();
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

/* ===================================================================
   4. Game Portfolio Filter
   =================================================================== */
function initGameFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      gameCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ===================================================================
   5. Game Detail & Showreel Modals
   =================================================================== */
const gameData = {
  nusantara: {
    title: 'Nusantara: Chronicle of the Ancients',
    genre: 'Mythological Action RPG',
    rating: '4.9 / 5.0 (IGN Choice)',
    status: 'Tersedia Sekarang di Steam, PS5, Xbox Series X',
    image: 'assets/nusantara.jpg',
    description:
      'Nusantara: Chronicle of the Ancients adalah karya mahakarya PT Indo Kreasi yang memadukan mitologi agung kepulauan Nusantara dengan sistem combat aksi dinamis generasi baru. Pemain berperan sebagai Satria Arya, pendekar berdarah Majapahit yang menjelajahi candi terapung sakral dan hutan purba mistis untuk mengembalikan keseimbangan relik pusaka keris langit.',
    engine: 'Unreal Engine 5.4 (Nanite & Lumen)',
    features: [
      'Dunia Open-World 64 km² dengan cuaca dinamis & siklus siang-malam',
      'Sistem pertarungan bela diri Pencak Silat yang diperkaya sihir elemen',
      'Orkestrasi musik kolaborasi gamelan Bali-Jawa & simfoni orkestra Budapest',
      'Dukungan penuh Ray Tracing dan 4K HDR 60fps',
    ],
  },
  cyber_garuda: {
    title: 'Cyber Garuda 2099',
    genre: 'Cyberpunk Tactical Mech Shooter',
    rating: '4.8 / 5.0 (Steam Very Positive)',
    status: 'Tersedia di PC Steam, PS5 & Xbox Series',
    image: 'assets/cyber_garuda.jpg',
    description:
      'Berlatar tahun 2099 di megametropolis vertikal Neo-Jakarta yang diselimuti kabut neon dan hujan asam. Anda mengendalikan unit cybernetic elit bertajuk Project Garuda 01 dengan sayap foton berkecepatan hipersonik. Berantas konspirasi korporasi megakonglomerat gelap yang memperbudak rakyat jelata.',
    engine: 'Unreal Engine 5 (Chaos Physics)',
    features: [
      'Mekanik terbang vertikal penuh 360 derajat di antara gedung pencakar langit',
      'Kustomisasi lebih dari 120 modul senjata laser dan perisai energi',
      'Mode Co-Op Squad 4 pemain & Mode Arena Kompetitif',
      'Soundtrack synthwave orisinal dengan nuansa perkusi etnik modern',
    ],
  },
  warung_dash: {
    title: 'Warung Dash: Midnight Tycoon',
    genre: 'Chaotic Co-op Cooking & Night Market Tycoon',
    rating: '4.9 / 5.0 (Global Indie Hit)',
    status: 'Tersedia di Switch, Steam, iOS & Android',
    image: 'assets/warung_dash.jpg',
    description:
      'Game multiplayer pesta yang seru dan menggemaskan! Bekerja samalah dengan teman-teman Anda untuk menjalankan warung makan malam tenda paling ramai di kota. Bakar sate sebelum gosong, racik martabak telor, tuang kuah bakso mendidih, dan antar pesanan ke ojek online tepat waktu!',
    engine: 'Unity 6 (Cross-Play Enabled)',
    features: [
      'Multiplayer lokal & daring hingga 4 pemain dengan cross-platform play',
      'Lebih dari 40 resep kuliner khas Indonesia dengan animasi menggiurkan',
      'Puluhan rintangan unik: hujan lebat, kucing liar iseng, hingga serbuan pembeli lapar',
      'Koleksi kostum chef lucu seperti batik koki, celemek lurik, dan blangkon',
    ],
  },
  kabut_keramat: {
    title: 'Kabut Keramat: Sacred Mist',
    genre: 'Psychological Folk Horror Adventure',
    rating: '4.7 / 5.0 (Tokyo Indie Fest Spotlight)',
    status: 'Rilis Musim Gugur 2026 (Wishlist di Steam)',
    image: 'assets/kabut_keramat.jpg',
    description:
      'Sebuah eksplorasi horor psikologis mendalam yang terinspirasi oleh mitos urban dan folklore mistis pulau Jawa. Mengisahkan Maya, jurnalis foto yang menyelidiki hilangnya satu desa secara misterius di pedalaman hutan bambu lereng gunung berkabut. Berbekal lentera dan kamera tua dengan lampu kilat, bertahanlah dari teror entitas yang tak kasat mata.',
    engine: 'Unreal Engine 5 (Photogrammetry 3D Scans)',
    features: [
      'Audio 3D binaural yang menghadirkan bisikan dan gemerisik daun secara nyata',
      'Visual fotorealistis menggunakan pemindaian 3D artefak dan candi purba asli',
      'Teka-teki lingkungan yang berakar pada aksara dan ritual Jawa kuno',
      'Sistem kegelapan adaptif di mana suara detak jantung pemain mempengaruhi penglihatan',
    ],
  },
};

function initModals() {
  const gameModal = document.getElementById('game-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  const showreelModal = document.getElementById('showreel-modal');
  const showreelClose = document.getElementById('showreel-close');
  const openShowreelBtn = document.getElementById('open-showreel-btn');

  // Open Game Details
  document.querySelectorAll('.view-detail-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const gameKey = btn.getAttribute('data-game');
      const game = gameData[gameKey];
      if (!game) return;

      modalBody.innerHTML = `
        <div class="modal-game-hero">
          <img src="${game.image}" alt="${game.title}">
          <div class="modal-game-overlay">
            <span class="game-genre" style="color: var(--primary); font-weight:700;">${game.genre}</span>
            <h2 style="font-size: 1.8rem; color:#fff; margin-top: 0.3rem;">${game.title}</h2>
          </div>
        </div>
        <div class="modal-game-body">
          <div class="modal-meta-row">
            <span class="modal-badge"><i class="fa-solid fa-star"></i> ${game.rating}</span>
            <span class="modal-badge"><i class="fa-solid fa-gamepad"></i> ${game.status}</span>
          </div>

          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">
            ${game.description}
          </p>

          <div class="spec-grid">
            <div class="spec-item">
              <h5>Teknologi & Engine</h5>
              <p>${game.engine}</p>
            </div>
            <div class="spec-item">
              <h5>Developer</h5>
              <p>PT Indo Kreasi Core Team</p>
            </div>
          </div>

          <h4 style="color:#fff; margin-bottom: 0.8rem; font-size:1.1rem;">Fitur Unggulan:</h4>
          <ul style="color: var(--text-muted); padding-left: 1.2rem; list-style: disc; line-height: 1.8; margin-bottom: 2rem;">
            ${game.features.map((f) => `<li>${f}</li>`).join('')}
          </ul>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="https://store.steampowered.com" target="_blank" class="btn btn-primary btn-sm">
              <i class="fa-brands fa-steam"></i> Wishlist di Steam
            </a>
            <button class="btn btn-outline btn-sm close-modal-btn">
              Tutup Jendela
            </button>
          </div>
        </div>
      `;

      gameModal.classList.add('active');
      playUiSound(600, 'sine', 0.1);

      modalBody.querySelector('.close-modal-btn').addEventListener('click', () => {
        gameModal.classList.remove('active');
      });
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      gameModal.classList.remove('active');
    });
  }

  // Open Showreel
  if (openShowreelBtn && showreelModal) {
    openShowreelBtn.addEventListener('click', () => {
      showreelModal.classList.add('active');
      playUiSound(440, 'triangle', 0.15);
    });
  }

  if (showreelClose) {
    showreelClose.addEventListener('click', () => {
      showreelModal.classList.remove('active');
    });
  }

  // Close when clicking background backdrop
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      gameModal.classList.remove('active');
      showreelModal.classList.remove('active');
    }
  });

  // Careers Apply Button Handler
  document.querySelectorAll('.apply-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      showToast(`Terima kasih! Formulir lamaran untuk posisi "${role}" dibuka di tab HR. Portofolio dapat dikirimkan ke careers@indokreasi.games`);
      playUiSound(550, 'sine', 0.12);
    });
  });
}

/* ===================================================================
   6. Form Handlers & Toast System
   =================================================================== */
function initForms() {
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const submitBtn = document.getElementById('submit-btn');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirimkan...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan Sekarang';
        contactForm.reset();
        showToast(`Halo ${name}, pesan Anda telah berhasil diterima oleh tim PT Indo Kreasi! Kami akan membalas melalui email.`);
        playUiSound(720, 'sine', 0.2);
      }, 900);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Terima kasih telah bergabung dengan Komunitas Gamer PT Indo Kreasi!');
      playUiSound(650, 'sine', 0.1);
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/* ===================================================================
   7. Audio Sound FX (Web Audio API Synthesizer)
   =================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initSoundFX() {
  const soundBtn = document.getElementById('sound-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      soundBtn.title = 'Efek Suara Aktif';
      showToast('Efek suara game studio diaktifkan.');
      playUiSound(520, 'sine', 0.1);
    } else {
      soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      soundBtn.title = 'Efek Suara Nonaktif';
      showToast('Efek suara dinonaktifkan.');
    }
  });
}

function playUiSound(freq = 440, type = 'sine', duration = 0.1) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    // Audio context may be restricted before user gesture
  }
}
