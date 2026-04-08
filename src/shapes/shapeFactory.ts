import { Texture } from "pixi.js";
import type { ShapeType } from "../common/types";

export class ShapeFactory {
  private textures: Record<ShapeType, Texture>;

  constructor(textures: Record<string, Texture>) {
    this.textures = textures as Record<ShapeType, Texture>;
  }

  getRandomType(): ShapeType {
    const types: ShapeType[] = [
      "triangle",
      "square",
      "pentagon",
      "hexagon",
      "circle",
      "ellipse",
    ];

    return types[(Math.random() * types.length) | 0];
  }

  getTextureByType(type: ShapeType): Texture {
    return this.textures[type];
  }
}
