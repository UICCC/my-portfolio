'use client';
import { useEffect, useRef } from 'react';

export default function Navbar() {
    
}
export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = 380, H = 380;
    let t = 0, animId;
    let mouse = { x: W/2, y: H/2 };
    let dragCube = null, prevMouse = {x:0,y:0}, hovered = null;

    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    });

    function iso(x, y, z) {
      const s = 44;
      const ox = W/2 - 20, oy = H/2 + 20;
      return {
        x: ox + (x - z) * s,
        y: oy - y * s * 0.6 + (x + z) * s * 0.5
      };
    }

    const cubes = [
      { gx:-1.0, gz: 0.0, size:0.85, alpha:0.85, floatYAmp:0.18, floatYSpeed:0.7,  floatYOff:0,   floatXAmp:0.06, floatXSpeed:0.4,  floatXOff:0,   fx:0, fy:0, dragging:false },
      { gx: 0.8, gz:-0.5, size:0.72, alpha:0.65, floatYAmp:0.12, floatYSpeed:0.55, floatYOff:1.2, floatXAmp:0.05, floatXSpeed:0.5,  floatXOff:2.0, fx:0, fy:0, dragging:false },
      { gx: 0.2, gz: 1.2, size:0.65, alpha:0.5,  floatYAmp:0.14, floatYSpeed:0.9,  floatYOff:2.1, floatXAmp:0.07, floatXSpeed:0.35, floatXOff:1.0, fx:0, fy:0, dragging:false },
      { gx:-0.8, gz:-1.0, size:0.55, alpha:0.35, floatYAmp:0.1,  floatYSpeed:0.6,  floatYOff:3.0, floatXAmp:0.04, floatXSpeed:0.6,  floatXOff:0.5, fx:0, fy:0, dragging:false },
      { gx: 1.6, gz: 0.8, size:0.5,  alpha:0.28, floatYAmp:0.09, floatYSpeed:0.8,  floatYOff:1.8, floatXAmp:0.03, floatXSpeed:0.45, floatXOff:3.5, fx:0, fy:0, dragging:false },
    ];

    function drawCube(cx, cy, cz, size, alpha, isHov) {
      const s = size;
      const verts = [
        iso(cx-s,cy+s,cz-s), iso(cx+s,cy+s,cz-s),
        iso(cx+s,cy-s,cz-s), iso(cx-s,cy-s,cz-s),
        iso(cx-s,cy+s,cz+s), iso(cx+s,cy+s,cz+s),
        iso(cx+s,cy-s,cz+s), iso(cx-s,cy-s,cz+s),
      ];
      const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
      ctx.save();
      ctx.globalAlpha = alpha * (isHov ? 1.4 : 1);
      ctx.strokeStyle = isHov ? '#ff88aa' : '#ff3366';
      ctx.lineWidth = isHov ? 1.3 : 0.85;
      edges.forEach(([a,b]) => {
        ctx.beginPath();
        ctx.moveTo(verts[a].x, verts[a].y);
        ctx.lineTo(verts[b].x, verts[b].y);
        ctx.stroke();
      });
      [1,5].forEach(i => {
        ctx.fillStyle = isHov ? '#ffaacc' : '#ff6688';
        ctx.globalAlpha = alpha * (isHov ? 1.5 : 0.9);
        ctx.beginPath();
        ctx.arc(verts[i].x, verts[i].y, isHov ? 3 : 2, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.restore();
    }

    function hitTest(c, mx, my) {
      const p = iso(c.gx + c.fx, 0, c.gz);
      const dx = mx - p.x, dy = my - p.y;
      return Math.sqrt(dx*dx + dy*dy) < c.size * 52;
    }

    const onMouseDown = e => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX-r.left, my = e.clientY-r.top;
      for(let i=cubes.length-1;i>=0;i--) {
        if(hitTest(cubes[i], mx, my)) {
          dragCube = cubes[i];
          dragCube.dragging = true;
          canvas.style.cursor = 'grabbing';
          break;
        }
      }
      prevMouse = {x:mx, y:my};
    };

    const onMouseUp = () => {
      if(dragCube) { dragCube.dragging = false; dragCube = null; }
      canvas.style.cursor = 'grab';
    };

    const onMouseMove = e => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX-r.left, my = e.clientY-r.top;
      const dx = mx - prevMouse.x, dy = my - prevMouse.y;
      if(dragCube) { dragCube.gx += dx * 0.018; dragCube.gz -= dy * 0.018; }
      prevMouse = {x:mx, y:my};
      hovered = null;
      for(let i=cubes.length-1;i>=0;i--) {
        if(hitTest(cubes[i], mx, my)) { hovered = cubes[i]; break; }
      }
      canvas.style.cursor = dragCube ? 'grabbing' : hovered ? 'pointer' : 'grab';
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    function animate() {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      const mx = (mouse.x - W/2) / W;
      const my = (mouse.y - H/2) / H;
      cubes.forEach(c => {
        c.fy = Math.sin(t * c.floatYSpeed + c.floatYOff) * c.floatYAmp;
        if(!c.dragging) c.fx = Math.sin(t * c.floatXSpeed + c.floatXOff) * c.floatXAmp;
        const px = c.gx + c.fx + mx * 0.12;
        const pz = c.gz - my * 0.08;
        drawCube(px, c.fy, pz, c.size, c.alpha, c === hovered || c === dragCube);
      });
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      background: '#0d0d0d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',  // ← centers the whole pair
      padding: '0 60px',
      gap: '0',
      fontFamily: 'Arial, sans-serif'
    }}>
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
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '11px 28px', background: '#ff3366', border: 'none',
            color: '#fff', borderRadius: '8px', fontSize: '13px',
            cursor: 'pointer', fontWeight: 600
          }}>
            View Work
          </button>
          <button style={{
            padding: '11px 28px', background: 'transparent',
            border: '1px solid #2a2a2a', color: '#666',
            borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
          }}>
            Contact
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={380}
        height={380}
        style={{ flexShrink: 0, cursor: 'grab' }}
      />
    </section>
  );
}