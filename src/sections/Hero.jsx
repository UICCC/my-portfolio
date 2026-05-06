'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DynaPuff } from 'next/font/google';

const dyna = DynaPuff({
  subsets: ['latin'],
  weight: ['700'],
});

const navLinkStyle = {
  position: 'relative',
  display: 'inline-block',
  padding: '6px 16px',
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  transition: 'all 0.3s ease',
};

function GlassNavLink({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <Link
        href={`#${item.toLowerCase()}`}
        style={navLinkStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className={dyna.className}
          style={{
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: hovered ? '#ff3366' : 'rgba(255,255,255,0.70)',
            transition: 'color 0.3s ease',
            textShadow: hovered ? '0 0 12px rgba(255,51,102,0.6)' : 'none',
          }}
        >
          {item}
        </span>
      </Link>
    </li>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        style={{
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          className={dyna.className}
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '18px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          YK<span style={{ color: '#ff3366' }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {['Work', 'About', 'Contact'].map((item) => (
            <GlassNavLink key={item} item={item} />
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="hamburger-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{
            display: 'block', width: '24px', height: '1px', background: '#fff',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '1px', background: '#fff',
            transition: 'all 0.3s ease',
            opacity: isOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '24px', height: '1px', background: '#fff',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            background: 'rgba(13,13,13,0.97)',
            backdropFilter: 'blur(20px)',
            padding: '20px 24px 32px',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['Work', 'About', 'Contact', 'Hire Me'].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  onClick={() => setIsOpen(false)}
                  className={dyna.className}
                  style={{
                    display: 'block',
                    padding: '14px 0',
                    fontSize: '13px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex !important; }
        .hamburger-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function HeroButton({ href, children, primary }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    display: 'inline-block',
    padding: '12px 28px',
    borderRadius: '999px',
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  const primaryStyle = {
    ...base,
    background: hovered ? '#e02255' : '#ff3366',
    color: '#fff',
    boxShadow: hovered
      ? '0 6px 24px rgba(255,51,102,0.5)'
      : '0 4px 16px rgba(255,51,102,0.3)',
  };

  const secondaryStyle = {
    ...base,
    background: 'transparent',
    color: hovered ? '#fff' : 'rgba(255,255,255,0.55)',
    border: '1px solid',
    borderColor: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
  };

  return (
    <Link
      href={href}
      style={primary ? primaryStyle : secondaryStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={dyna.className}>{children}</span>
    </Link>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 380, H = 380;
    let t = 0, animId;
    let mouse = { x: W / 2, y: H / 2 };
    let hovered = null;

    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    }, { passive: false });

    function iso(x, y, z) {
      const s = 44;
      return {
        x: W / 2 - 20 + (x - z) * s,
        y: H / 2 + 20 - y * s * 0.6 + (x + z) * s * 0.5,
      };
    }

    const cubes = [
      { gx: -1.0, gz:  0.0, size: 0.85, alpha: 0.85, floatYAmp: 0.18, floatYSpeed: 0.70, floatYOff: 0.0, floatXAmp: 0.06, floatXSpeed: 0.40, floatXOff: 0.0, fx: 0, fy: 0, dragging: false },
      { gx:  0.8, gz: -0.5, size: 0.72, alpha: 0.65, floatYAmp: 0.12, floatYSpeed: 0.55, floatYOff: 1.2, floatXAmp: 0.05, floatXSpeed: 0.50, floatXOff: 2.0, fx: 0, fy: 0, dragging: false },
      { gx:  0.2, gz:  1.2, size: 0.65, alpha: 0.50, floatYAmp: 0.14, floatYSpeed: 0.90, floatYOff: 2.1, floatXAmp: 0.07, floatXSpeed: 0.35, floatXOff: 1.0, fx: 0, fy: 0, dragging: false },
      { gx: -1.6, gz: -1.0, size: 0.55, alpha: 0.40, floatYAmp: 0.20, floatYSpeed: 0.60, floatYOff: 0.5, floatXAmp: 0.08, floatXSpeed: 0.45, floatXOff: 3.0, fx: 0, fy: 0, dragging: false },
      { gx:  1.4, gz:  0.8, size: 0.48, alpha: 0.35, floatYAmp: 0.16, floatYSpeed: 1.00, floatYOff: 1.8, floatXAmp: 0.06, floatXSpeed: 0.55, floatXOff: 0.7, fx: 0, fy: 0, dragging: false },
      { gx: -0.4, gz: -1.4, size: 0.42, alpha: 0.30, floatYAmp: 0.10, floatYSpeed: 0.80, floatYOff: 3.5, floatXAmp: 0.05, floatXSpeed: 0.30, floatXOff: 1.5, fx: 0, fy: 0, dragging: false },
      { gx:  1.0, gz:  1.6, size: 0.38, alpha: 0.28, floatYAmp: 0.22, floatYSpeed: 1.10, floatYOff: 4.2, floatXAmp: 0.09, floatXSpeed: 0.65, floatXOff: 2.5, fx: 0, fy: 0, dragging: false },
      { gx: -0.8, gz:  1.8, size: 0.32, alpha: 0.22, floatYAmp: 0.17, floatYSpeed: 0.75, floatYOff: 5.0, floatXAmp: 0.04, floatXSpeed: 0.50, floatXOff: 0.3, fx: 0, fy: 0, dragging: false },
      { gx:  1.8, gz: -1.2, size: 0.30, alpha: 0.20, floatYAmp: 0.13, floatYSpeed: 1.20, floatYOff: 1.0, floatXAmp: 0.06, floatXSpeed: 0.42, floatXOff: 4.0, fx: 0, fy: 0, dragging: false },
      { gx: -1.2, gz:  0.9, size: 0.28, alpha: 0.18, floatYAmp: 0.19, floatYSpeed: 0.95, floatYOff: 3.0, floatXAmp: 0.07, floatXSpeed: 0.60, floatXOff: 1.8, fx: 0, fy: 0, dragging: false },
    ];

    function drawCube(cx, cy, cz, size, alpha, isHov) {
      const s = size;
      const verts = [
        iso(cx - s, cy + s, cz - s), iso(cx + s, cy + s, cz - s),
        iso(cx + s, cy - s, cz - s), iso(cx - s, cy - s, cz - s),
        iso(cx - s, cy + s, cz + s), iso(cx + s, cy + s, cz + s),
        iso(cx + s, cy - s, cz + s), iso(cx - s, cy - s, cz + s),
      ];
      const edges = [
        [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7],
      ];
      ctx.save();
      ctx.globalAlpha = alpha * (isHov ? 1.4 : 1);
      ctx.strokeStyle = isHov ? '#ff88aa' : '#ff3366';
      ctx.lineWidth = isHov ? 1.3 : 0.85;
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(verts[a].x, verts[a].y);
        ctx.lineTo(verts[b].x, verts[b].y);
        ctx.stroke();
      });
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      const mx = (mouse.x - W / 2) / W;
      const my = (mouse.y - H / 2) / H;

      let closestDist = Infinity;
      hovered = null;
      cubes.forEach((c) => {
        const proj = iso(c.gx + c.fx + mx * 0.12, c.fy, c.gz - my * 0.08);
        const dist = Math.hypot(proj.x - mouse.x, proj.y - mouse.y);
        if (dist < closestDist) { closestDist = dist; hovered = c; }
      });
      if (closestDist > 60) hovered = null;

      cubes.forEach((c) => {
        c.fy = Math.sin(t * c.floatYSpeed + c.floatYOff) * c.floatYAmp;
        if (!c.dragging) {
          c.fx = Math.sin(t * c.floatXSpeed + c.floatXOff) * c.floatXAmp;
        }
        drawCube(
          c.gx + c.fx + mx * 0.12,
          c.fy,
          c.gz - my * 0.08,
          c.size, c.alpha,
          c === hovered
        );
      });
      animId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      <Navbar />

      <style>{`
        .hero-section {
          min-height: 100vh;
          background: #0d0d0d;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 60px 0;
          font-family: Arial, sans-serif;
          gap: 40px;
        }
        .hero-text { flex: 0 0 auto; max-width: 520px; }
        .hero-title { font-size: 4rem; }
        .hero-canvas { width: 380px; height: 380px; flex-shrink: 0; cursor: grab; }

        @media (max-width: 900px) {
          .hero-section {
            flex-direction: column;
            align-items: center;
            padding: 100px 32px 40px;
            text-align: center;
            gap: 0px;
          }
          .hero-text { max-width: 100%; }
          .hero-title { font-size: 3rem; }
          .hero-buttons { justify-content: center !important; }
          .hero-canvas { width: 280px !important; height: 280px !important; }
        }

        @media (max-width: 480px) {
          .hero-section { padding: 90px 20px 40px; }
          .hero-title { font-size: 2.4rem; }
          .hero-canvas { width: 240px !important; height: 240px !important; }
        }
      `}</style>

      <section className="hero-section">
        <div style={{ flex: '0 0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#444', marginBottom: '14px' }}>
            PORTFOLIO
          </p>
          <h1 style={{ fontSize: '4rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>
            Yash Kumar
          </h1>
          <h2 style={{ fontSize: '4rem', fontWeight: 700, color: '#ff3366', margin: '0 0 18px', lineHeight: 1.2 }}>
            Software Developer.
          </h2>
          <p style={{ color: '#444', fontSize: '17px', lineHeight: 1.8, maxWidth: '450px', margin: '0 0 28px' }}>
            A software developer passionate about learning and building projects that is beneficial to developers and the world at large
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <HeroButton href="#work" primary>View Work</HeroButton>
            <HeroButton href="#contact">Contact Me</HeroButton>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={380}
          height={380}
          className="hero-canvas"
        />
      </section>

      
    </>
  );
}