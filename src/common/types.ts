import type { Sprite } from "pixi.js";
import type { allHomeTextureKeys, allGameTextureKeys } from "./textures";

export type AllHomeTextureKeys =
  (typeof allHomeTextureKeys)[keyof typeof allHomeTextureKeys];

export type AllGameTextureKeys =
  (typeof allGameTextureKeys)[keyof typeof allGameTextureKeys];

export type AllTextureKeysType = AllHomeTextureKeys | AllGameTextureKeys;

export type ScenesName = "game" | "home" | "loader";
export type ShapeType =
  | "triangle"
  | "square"
  | "pentagon"
  | "hexagon"
  | "circle"
  | "ellipse"
  | "random";

export type Shape = {
  sprite: Sprite;
  vx: number;
  vy: number;
  gravity?: number;
  type?: ShapeType;
  alive?: boolean;
  onClick?: () => void;
};
