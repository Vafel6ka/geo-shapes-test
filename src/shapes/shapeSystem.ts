import { Container, Point, Sprite } from "pixi.js";
import { ShapePool } from "./shapePool";
import { ShapeFactory } from "./shapeFactory";
import { rootStore } from "../store/rooteStore";
import { eventBus } from "../core/eventBus";

type ShapeObj = {
  sprite: Sprite;
  vx: number;
  vy: number;
  alive: boolean;
};

export class ShapeSystem {
  private container: Container;
  private factory: ShapeFactory;
  private pool: ShapePool;

  private shapes: ShapeObj[] = [];

  public gravity = rootStore.physics.getGravity();

  constructor(container: Container, factory: ShapeFactory, pool: ShapePool) {
    this.container = container;
    this.factory = factory;
    this.pool = pool;

    eventBus.on("PHYSICS_GRAVITY_CHANGED", ({ gravity }) => {
      this.gravity = gravity;
    });
  }

  spawnAt(globalX: number, globalY: number) {
    const local = this.container.toLocal(new Point(globalX, globalY));
    this.spawn(local.x, local.y);
  }

  spawn(x: number, y: number) {
    const sprite = this.factory.create();

    sprite.anchor.set(0.5);
    sprite.position.set(x, y);

    sprite.eventMode = "static";
    sprite.cursor = "pointer";

    const obj: ShapeObj = {
      sprite,
      vx: 0,
      vy: 0,
      alive: true,
    };

    sprite.on("pointertap", () => {
      obj.alive = false;

      this.pool.release(sprite);
      this.container.removeChild(sprite);
    });

    this.container.addChild(sprite);
    this.shapes.push(obj);
  }

  update(deltaMS: number) {
    const dt = deltaMS / 1000;

    for (const s of this.shapes) {
      s.vy += this.gravity * dt;
      s.sprite.y += s.vy * dt;
    }

    this.shapes = this.shapes.filter((s) => s.alive);
  }
}
