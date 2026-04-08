import { Sprite, Texture } from "pixi.js";

export class ShapeFactory {
  private textures: Record<string, Texture>;

  constructor(textures: Record<string, Texture>) {
    this.textures = textures;
  }

  create(): Sprite {
    const keys = Object.keys(this.textures);

    const key = keys[Math.floor(Math.random() * keys.length)];

    return new Sprite(this.textures[key]);
  }
}
