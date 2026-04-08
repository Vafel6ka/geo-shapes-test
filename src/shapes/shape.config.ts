import type { ShapeType } from "../common/types";

export const mainShapeLayerConfig = {
  frame: {
    width: 1000,
    height: 800,
  },
  mask: {
    width: 900,
    height: 600,
  },
};

export const SHAPE_AREA: Record<Exclude<ShapeType, "random">, number> = {
  triangle: 800,
  square: 1024,
  pentagon: 1200,
  hexagon: 1400,
  circle: 900,
  ellipse: 1100,
};
