import { Container } from "pixi.js";
import type { MainShapeLayer } from "../shapes/shapeLayer";
import { RegularText } from "../ui/Text";

export class InfoPanel extends Container {
  private shapesText!: RegularText;
  private layer!: MainShapeLayer;

  private rafId = 0;

  init(layer: MainShapeLayer) {
    this.layer = layer;

    // =========================
    // SHAPES COUNTER (LIVE)
    // =========================
    this.shapesText = new RegularText("shapes: 0", 28);

    this.shapesText.position.set(0, 0);

    this.addChild(this.shapesText);

    // start loop
    this.start();
  }

  private start() {
    const update = () => {
      this.shapesText.setText(`shapes: ${this.layer.shapeCount}`);

      this.rafId = requestAnimationFrame(update);
    };

    update();
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    super.destroy();
  }
}
