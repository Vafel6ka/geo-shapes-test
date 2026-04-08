import { Container, Sprite } from "pixi.js";
import { ShapePool } from "./shapePool";
import { ShapeFactory } from "./shapeFactory";
import { rootStore } from "../store/rooteStore";
import { eventBus } from "../core/eventBus";
import { mainShapeLayerConfig } from "./shape.config";
import { SHAPE_AREA } from "./shape.config";
import type { ShapeType } from "../common/types";

type ShapeObj = {
  id: string;
  type: ShapeType;
  sprite: Sprite;
  vx: number;
  vy: number;
};

export class ShapeSystem {
  private container: Container;
  private factory: ShapeFactory;
  private pool: ShapePool;

  private shapes: ShapeObj[] = [];

  private gravity = rootStore.physics.getGravity();
  private destroyed = false;

  constructor(container: Container, factory: ShapeFactory, pool: ShapePool) {
    this.container = container;
    this.factory = factory;
    this.pool = pool;

    eventBus.on("PHYSICS_GRAVITY_CHANGED", ({ gravity }) => {
      this.gravity = gravity;
    });
  }

  spawn(x: number, y: number) {
    if (this.destroyed) return;

    const type = this.factory.getRandomType();
    const texture = this.factory.getTextureByType(type);
    const sprite = this.pool.get(texture);

    const id = crypto.randomUUID();

    const obj: ShapeObj = {
      id,
      type,
      sprite,
      vx: 0,
      vy: 0,
    };

    sprite.position.set(x, y);
    sprite.eventMode = "static";

    sprite.on("pointertap", () => {
      this.removeShape(obj);
    });

    this.container.addChild(sprite);
    this.shapes.push(obj);

    // =========================
    // 🔥 STORE UPDATE HERE
    // =========================
    rootStore.shapes.addShape({
      id,
      type,
      x,
      y,
      area: SHAPE_AREA[type as keyof typeof SHAPE_AREA],
    });
  }

  private removeShape(obj: ShapeObj) {
    obj.sprite.removeAllListeners();
    this.pool.release(obj.sprite);

    this.shapes = this.shapes.filter((s) => s.id !== obj.id);

    rootStore.shapes.removeShape(obj.id);
  }

  update(deltaMS: number) {
    if (this.destroyed) return;

    const dt = deltaMS / 1000;

    for (const s of this.shapes) {
      s.vy += this.gravity * dt;
      s.sprite.y += s.vy * dt;

      if (s.sprite.y > mainShapeLayerConfig.mask.height + 50) {
        this.removeShape(s);
      }
    }
  }

  get count() {
    return this.shapes.length;
  }

  destroy() {
    this.destroyed = true;
    this.shapes.length = 0;
  }
}
