/**
 * Fundo do hero: colunas de caracteres caindo, que se afastam do mouse e
 * voltam ao lugar com mola. Puramente decorativo (o canvas é aria-hidden).
 *
 * Cuidados de performance e acessibilidade:
 * - começa só depois do load, para não competir com a primeira pintura;
 * - para quando o hero sai da tela ou a aba fica oculta;
 * - com prefers-reduced-motion desenha um quadro parado e não anima.
 */

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789:=*+<>";
const COL_GAP = 20;
const RADIUS = 150;
const SPRING = 0.014;
const DAMP = 0.9;
const PUSH = 1.5;
const HEAD = "#E2FFE9"; // text-primary
const TRAIL = "#00FF41"; // accent
const GLOW = "rgba(0, 255, 65, 0.8)";

interface Column {
  x: number;
  y: number;
  len: number;
  size: number;
  lh: number;
  speed: number;
  op: number;
  chars: string[];
  dx: Float32Array;
  dy: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
}

const glyph = () => GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));

function resetColumn(c: Column, h: number, first: boolean) {
  const len = 8 + Math.floor(Math.random() * 18);
  c.len = len;
  c.size = Math.round(12 + Math.random() * 8);
  c.lh = Math.round(c.size * 1.2);
  c.speed = 0.5 + Math.random() * 1.4;
  c.op = 0.25 + ((c.size - 12) / 8) * 0.35;
  c.y = first ? Math.random() * (h + len * c.lh) : -Math.random() * h * 0.6;
  c.chars = Array.from({ length: len }, glyph);
  c.dx = new Float32Array(len);
  c.dy = new Float32Array(len);
  c.vx = new Float32Array(len);
  c.vy = new Float32Array(len);
}

function start(section: HTMLElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mouse = { x: 0, y: 0, sx: 0, sy: 0, active: false };
  let cols: Column[] = [];
  let w = 0;
  let h = 0;
  let raf = 0;
  let visible = true;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Array.from({ length: Math.ceil(w / COL_GAP) }, (_, i) => {
      const c = { x: i * COL_GAP + COL_GAP / 2 } as Column;
      resetColumn(c, h, true);
      return c;
    });
  };

  const draw = (animate: boolean) => {
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    mouse.sx += (mouse.x - mouse.sx) * 0.18;
    mouse.sy += (mouse.y - mouse.sy) * 0.18;
    const r2 = RADIUS * RADIUS;

    for (const c of cols) {
      if (animate) c.y += c.speed;
      if (c.y - c.len * c.lh > h + 40) resetColumn(c, h, false);
      ctx.font = `${c.size}px "IBM Plex Mono", ui-monospace, monospace`;
      for (let j = 0; j < c.len; j++) {
        const hy = c.y - j * c.lh;
        if (hy < -60 || hy > h + 60) continue;
        if (animate) {
          if (mouse.active) {
            const ex = c.x + c.dx[j] - mouse.sx;
            const ey = hy + c.dy[j] - mouse.sy;
            const d2 = ex * ex + ey * ey;
            if (d2 < r2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / RADIUS) ** 2 * PUSH;
              c.vx[j] += (ex / d) * f;
              c.vy[j] += (ey / d) * f;
            }
          }
          c.vx[j] = (c.vx[j] - c.dx[j] * SPRING) * DAMP;
          c.vy[j] = (c.vy[j] - c.dy[j] * SPRING) * DAMP;
          c.dx[j] += c.vx[j];
          c.dy[j] += c.vy[j];
          if (Math.random() < 0.008) c.chars[j] = glyph();
        }
        if (j === 0) {
          ctx.globalAlpha = Math.min(1, c.op + 0.4);
          ctx.fillStyle = HEAD;
          ctx.shadowColor = GLOW;
          ctx.shadowBlur = 10;
        } else {
          ctx.globalAlpha = c.op * (1 - j / c.len);
          ctx.fillStyle = TRAIL;
          ctx.shadowBlur = 0;
        }
        ctx.fillText(c.chars[j], c.x + c.dx[j], hy + c.dy[j]);
      }
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  };

  const loop = () => {
    raf = requestAnimationFrame(loop);
    draw(true);
  };

  const sync = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    if (still.matches) {
      draw(false);
    } else if (visible && !document.hidden) {
      raf = requestAnimationFrame(loop);
    }
  };

  section.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    if (!mouse.active) {
      mouse.sx = mouse.x;
      mouse.sy = mouse.y;
    }
    mouse.active = true;
  });
  section.addEventListener("pointerleave", () => {
    mouse.active = false;
  });

  new ResizeObserver(() => {
    resize();
    if (still.matches) draw(false);
  }).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(section);
  document.addEventListener("visibilitychange", sync);
  still.addEventListener("change", sync);

  resize();
  sync();
}

function init() {
  const section = document.querySelector<HTMLElement>(".hero");
  const canvas = document.querySelector<HTMLCanvasElement>(".hero-rain canvas");
  if (section && canvas) start(section, canvas);
}

// Depois do load e com o navegador ocioso, para não atrasar o LCP.
const later = () =>
  "requestIdleCallback" in window ? requestIdleCallback(init, { timeout: 1500 }) : setTimeout(init, 200);
if (document.readyState === "complete") later();
else window.addEventListener("load", later, { once: true });
