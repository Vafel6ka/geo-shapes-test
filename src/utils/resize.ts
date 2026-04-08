import type { Application } from "pixi.js";

export function resizeLetterbox(app: Application, baseW = 1280, baseH = 720) {
  const windowW = window.innerWidth;
  const windowH = window.innerHeight;

  const scale = Math.min(windowW / baseW, windowH / baseH);

  const viewW = Math.round(baseW * scale);
  const viewH = Math.round(baseH * scale);

  const canvas = app.canvas;

  canvas.style.width = viewW + "px";
  canvas.style.height = viewH + "px";

  canvas.style.position = "absolute";
  canvas.style.left = (windowW - viewW) / 2 + "px";
  canvas.style.top = (windowH - viewH) / 2 + "px";

  // 👉 renderer лишається у фіксованому розмірі
  app.renderer.resize(baseW, baseH);

  return {
    width: baseW,
    height: baseH,
    scale,
  };
}
