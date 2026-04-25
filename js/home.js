document.addEventListener('DOMContentLoaded', () => {

  const intro    = document.getElementById('intro-screen');
  const laptop   = document.getElementById('laptop');
  const skipBtn  = document.getElementById('skip-intro');
  const homePage = document.getElementById('home-page');
  const logoLink = document.getElementById('nav-logo-btn');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // INTRO LOGIC 
  function showHome(instant) {
    if (!intro) return;
    if (instant || reducedMotion) {
      intro.style.display = 'none';
      if (homePage) homePage.style.visibility = 'visible';
      return;
    }
    intro.classList.add('fade-out');
    setTimeout(() => {
      intro.style.display = 'none';
      if (homePage) homePage.style.visibility = 'visible';
    }, 600);
  }

  function showIntro() {
    if (!intro || reducedMotion) return;
    if (laptop) {
      laptop.classList.remove('zooming');
      void laptop.offsetWidth;
    }
    intro.classList.remove('fade-out');
    intro.style.display = '';
    if (homePage) homePage.style.visibility = 'hidden';
    window.scrollTo({ top: 0 });
  }

  // On page load — show intro, home is hidden
  if (intro) {
    if (reducedMotion) {
      showHome(true);
    } else {
      intro.style.display = '';
      if (homePage) homePage.style.visibility = 'hidden';
    }
  }


  // Logo click → re-show intro
  if (logoLink) {
    logoLink.addEventListener('click', e => {
      e.preventDefault();
      showIntro();
    });
  }

  // Laptop click
  if (laptop) {
    laptop.addEventListener('click', () => {
      if (laptop.classList.contains('zooming')) return;
      laptop.classList.add('zooming');
      setTimeout(() => showHome(false), 1400);
    });
    laptop.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') laptop.click();
    });
  }

  // Skip button
  if (skipBtn) {
    skipBtn.addEventListener('click', () => showHome(false));
  }

  // CONSTELLATION (canvas)
  const cnv = document.getElementById('constellation-canvas');
  if (cnv) {
    const ctx = cnv.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let W = cnv.offsetWidth, H = cnv.offsetHeight;
    cnv.width  = W * dpr;
    cnv.height = H * dpr;
    ctx.scale(dpr, dpr);

    const TECHS = [
      { label: 'HTML',     color: '#e44d26', r: 28 },
      { label: 'CSS',      color: '#264de4', r: 26 },
      { label: 'JS',       color: '#f7df1e', r: 30 },
      { label: 'React',    color: '#61dafb', r: 28 },
      { label: 'Python',   color: '#3776ab', r: 28 },
      { label: 'Figma',    color: '#a259ff', r: 25 },
      { label: 'Node',     color: '#68a063', r: 25 },
      { label: 'Git',      color: '#f05032', r: 22 },
      { label: 'SQL',      color: '#00758f', r: 22 },
      { label: 'Linux',    color: '#f9c513', r: 20 },
      { label: 'Tailwind', color: '#06b6d4', r: 24 },
      { label: 'AI/ML',    color: '#ff6b9d', r: 26 },
    ];

    let cx = W / 2, cy = H / 2;
    let angleOff = 0;
    let dragging = false, lastX, velX = 0;

    const nodes = TECHS.map((t, i) => {
      const angle = (i / TECHS.length) * Math.PI * 2;
      const dist  = 70 + Math.random() * 90;
      return {
        ...t,
        bx: Math.cos(angle) * dist,
        by: Math.sin(angle) * dist,
        orbitR:     30 + Math.random() * 40,
        orbitSpd:   (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
        orbitPhase: Math.random() * Math.PI * 2,
      };
    });

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      const time = t * 0.001;
      angleOff += velX * 0.003;
      velX *= 0.92;

      // center glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
      cg.addColorStop(0, 'rgba(100,200,255,0.3)');
      cg.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(cx, cy, 90, 0, Math.PI*2);
      ctx.fillStyle = cg; ctx.fill();
      // center dot
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI*2);
      ctx.fillStyle = '#5bc8ff';
      ctx.shadowColor = '#5bc8ff'; ctx.shadowBlur = 20;
      ctx.fill(); ctx.shadowBlur = 0;

      // positions
      const positions = nodes.map(n => {
        const baseAngle = Math.atan2(n.by, n.bx) + angleOff;
        const baseDist  = Math.sqrt(n.bx*n.bx + n.by*n.by);
        const ox = Math.cos(time*n.orbitSpd + n.orbitPhase) * n.orbitR * 0.5;
        const oy = Math.sin(time*n.orbitSpd + n.orbitPhase) * n.orbitR * 0.5;
        return { ...n,
          x: cx + Math.cos(baseAngle)*baseDist + ox,
          y: cy + Math.sin(baseAngle)*baseDist + oy,
        };
      });

      // lines
      positions.forEach((a, i) => {
        positions.forEach((b, j) => {
          if (j <= i) return;
          const dx = a.x-b.x, dy = a.y-b.y, d = Math.sqrt(dx*dx+dy*dy);
          if (d > 160) return;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(100,180,255,${(1-d/160)*0.3})`;
          ctx.lineWidth = 1; ctx.stroke();
        });
      });

      // nodes
      positions.forEach(n => {
        // glow halo
        const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*2.5);
        g.addColorStop(0, n.color+'44'); g.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*2.5,0,Math.PI*2);
        ctx.fillStyle=g; ctx.fill();
        // circle
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
        ctx.fillStyle = n.color+'22'; ctx.strokeStyle = n.color+'cc';
        ctx.lineWidth = 1.5; ctx.fill(); ctx.stroke();
        // label
        ctx.fillStyle = n.color;
        ctx.font = `600 ${Math.max(9,n.r*0.45)}px 'DM Sans',sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    // drag to spin
    cnv.addEventListener('mousedown', e => { dragging=true; lastX=e.clientX; velX=0; });
    window.addEventListener('mousemove', e => { if(dragging){ velX+=(e.clientX-lastX)*0.5; lastX=e.clientX; }});
    window.addEventListener('mouseup', () => { dragging=false; });
    cnv.addEventListener('touchstart', e => { lastX=e.touches[0].clientX; velX=0; }, { passive:true });
    cnv.addEventListener('touchmove', e => { velX+=(e.touches[0].clientX-lastX)*0.5; lastX=e.touches[0].clientX; }, { passive:true });

    window.addEventListener('resize', () => {
      W=cnv.offsetWidth; H=cnv.offsetHeight;
      cnv.width=W*dpr; cnv.height=H*dpr;
      ctx.scale(dpr,dpr); cx=W/2; cy=H/2;
    });
  }

  // PROCESS CAROUSEL
  const track   = document.querySelector('.process-track');
  const prevBtn = document.querySelector('.process-btn.prev');
  const nextBtn = document.querySelector('.process-btn.next');
  if (track && prevBtn && nextBtn) {
    let idx = 0;
    const cards = track.querySelectorAll('.process-card');
    const total = cards.length;
    const getCardW = () => {
      const c = cards[0];
      if (!c) return 300;
      return c.offsetWidth + 20;
    };
    const update = () => {
      track.style.transform = `translateX(${-idx * getCardW()}px)`;
    };
    const visibleCount = () => Math.floor(track.parentElement.offsetWidth / getCardW());
    nextBtn.addEventListener('click', () => { if(idx < total - visibleCount()){ idx++; update(); }});
    prevBtn.addEventListener('click', () => { if(idx > 0){ idx--; update(); }});
  }

  // HERO VIDEO
  const vid = document.getElementById('hero-video');
  if (vid) vid.play().catch(() => {});

  // FLOATING PARTICLES on hero
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.cssText = `
        position:absolute;
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        width:${2+Math.random()*4}px;
        height:${2+Math.random()*4}px;
        border-radius:50%;
        background:var(--accent);
        opacity:${0.1+Math.random()*0.3};
        pointer-events:none;
        animation: heroParticle ${4+Math.random()*8}s ${-Math.random()*8}s ease-in-out infinite alternate;
      `;
      heroSection.appendChild(p);
    }
  }

});
