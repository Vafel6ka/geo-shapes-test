import type { ShapeType } from "../common/types";

// =========================
// SHAPES
// =========================
export type ShapeEntity = {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  area: number;
};

export type ShapesState = {
  shapes: ShapeEntity[];
  shapesNumber: number;
  occupiedArea: number;
};

export const initialShapesState: ShapesState = {
  shapes: [],
  shapesNumber: 0,
  occupiedArea: 0,
};

// =========================
// GAME
// =========================
export type GameState = {
  width: number;
  height: number;

  frame: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  isRunning: boolean;
  isPaused: boolean;
};

export const initialGameState: GameState = {
  width: 0,
  height: 0,
  frame: { x: 0, y: 0, width: 0, height: 0 },
  isRunning: true,
  isPaused: false,
};

// =========================
// PHYSICS
// =========================
export type PhysicsState = {
  gravity: number;
  spawnPerSecond: number;
};

export const initialPhysicsState: PhysicsState = {
  gravity: 200,
  spawnPerSecond: 0.5,
};
