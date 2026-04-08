import { Texture } from "pixi.js";

export class ShapeFactory {
  private textures: Texture[];

  constructor(textures: Record<string, Texture>) {
    this.textures = Object.values(textures);
  }

  getRandomTexture(): Texture {
    return this.textures[(Math.random() * this.textures.length) | 0];
  }
}
