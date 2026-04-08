import { Container, Point, Sprite } from "pixi.js";
import { ShapePool } from "./shapePool";
import { ShapeFactory } from "./shapeFactory";
import { rootStore } from "../store/rooteStore";
import { eventBus } from "../core/eventBus";

type ShapeObj = {
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

  private onGravityChange = ({ gravity }: { gravity: number }) => {
    this.gravity = gravity;
  };

  constructor(container: Container, factory: ShapeFactory, pool: ShapePool) {
    this.container = container;
    this.factory = factory;
    this.pool = pool;

    eventBus.on("PHYSICS_GRAVITY_CHANGED", this.onGravityChange);
  }

  spawn(x: number, y: number) {
    if (this.destroyed) return;

    const texture = this.factory.getRandomTexture();
    const sprite = this.pool.get(texture);

    sprite.position.set(x, y);
    sprite.eventMode = "static";

    const obj: ShapeObj = {
      sprite,
      vx: 0,
      vy: 0,
    };

    sprite.on("pointertap", () => {
      this.removeShape(obj);
    });

    this.container.addChild(sprite);
    this.shapes.push(obj);
  }

  private removeShape(obj: ShapeObj) {
    const sprite = obj.sprite;

    sprite.removeAllListeners();
    this.pool.release(sprite);

    const index = this.shapes.indexOf(obj);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  update(deltaMS: number) {
    if (this.destroyed) return;

    const dt = deltaMS / 1000;

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const s = this.shapes[i];

      s.vy += this.gravity * dt;
      s.sprite.y += s.vy * dt;

      // ❗ AUTO REMOVE OFF SCREEN (ВАЖЛИВО)
      if (s.sprite.y > 2000) {
        this.removeShape(s);
      }
    }
  }

  get count(): number {
    return this.shapes.length;
  }

  destroy() {
    this.destroyed = true;

    eventBus.off("PHYSICS_GRAVITY_CHANGED", this.onGravityChange);

    for (const s of this.shapes) {
      this.pool.release(s.sprite);
    }

    this.shapes.length = 0;
  }
}
