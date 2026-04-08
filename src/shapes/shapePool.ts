import { Sprite, Texture } from "pixi.js";

export class ShapePool {
  private pool: Sprite[] = [];

  get(texture: Texture): Sprite {
    const sprite = this.pool.pop() ?? new Sprite(texture);

    sprite.texture = texture;
    sprite.visible = true;

    sprite.eventMode = "static";
    sprite.cursor = "pointer";

    return sprite;
  }

  release(sprite: Sprite) {
    sprite.visible = false;
    sprite.removeAllListeners();
    sprite.parent?.removeChild(sprite);

    this.pool.push(sprite);
  }
}
