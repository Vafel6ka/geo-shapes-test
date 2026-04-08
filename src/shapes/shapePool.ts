import { Sprite, Texture } from "pixi.js";

export class ShapePool {
  private pool: Sprite[] = [];

  get(texture: Texture): Sprite {
    let sprite = this.pool.pop();

    if (!sprite) {
      sprite = new Sprite(texture);
    }

    sprite.texture = texture;
    sprite.visible = true;
    sprite.eventMode = "static";

    sprite.anchor?.set?.(0.5);

    sprite.position.set(0, 0);
    sprite.rotation = 0;
    sprite.scale.set(1);

    return sprite;
  }

  release(sprite: Sprite) {
    sprite.removeAllListeners();

    sprite.parent?.removeChild(sprite);

    sprite.visible = false;
    sprite.eventMode = "none";

    this.pool.push(sprite);
  }

  clear() {
    this.pool.length = 0;
  }
}
