import { Container, Graphics, Text } from "pixi.js";

export function createButton(text: string, onClick: () => void): Container {
  const btn = new Container();

  const bg = new Graphics().roundRect(0, 0, 200, 80, 12).fill(0x00ffcc);

  // 🔥 CRITICAL FIX — без цього НЕ КЛІКАЄТЬСЯ
  bg.eventMode = "static";
  bg.cursor = "pointer";

  const label = new Text({
    text,
    style: {
      fill: "#000",
      fontSize: 28,
      fontWeight: "bold",
    },
  });

  label.anchor.set(0.5);
  label.position.set(100, 40);

  btn.addChild(bg, label);

  bg.on("pointertap", (e) => {
    e.stopPropagation();
    console.log("Button clicked!");
    onClick();
  });

  return btn;
}
