import { Container, Rectangle, Point } from "pixi.js";
import type { MainShapeLayer } from "./shapeLayer";

export class InputOverlay extends Container {
  private layer: MainShapeLayer;

  constructor(layer: MainShapeLayer) {
    super();

    this.layer = layer;

    this.eventMode = "static";
    this.interactiveChildren = false;

    this.hitArea = new Rectangle(0, 0, layer.innerWidth, layer.innerHeight);

    this.on("pointerdown", (e) => {
      const global = e.global as Point;

      const local = this.layer.getContent().toLocal(global);

      this.layer.spawn(local.x, local.y);
    });
  }
}
