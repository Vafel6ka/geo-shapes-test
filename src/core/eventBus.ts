import EventEmitter from "eventemitter3";
import type { ScenesName, ShapeType } from "../common/types";

export type GameEvents = {
  // =========================
  // CORE
  // =========================
  resize: { width: number; height: number };

  NAVIGATE: {
    scene: ScenesName;
    bundle?: ScenesName;
  };

  // =========================
  // GAME
  // =========================
  GAME_RESIZE: { width: number; height: number };

  GAME_FRAME_UPDATED: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  GAME_STARTED: {};
  GAME_STOPPED: {};
  GAME_PAUSED: {};
  GAME_RESUMED: {};

  // =========================
  // PHYSICS
  // =========================
  PHYSICS_GRAVITY_CHANGED: { gravity: number };
  PHYSICS_SPAWN_CHANGED: { spawnPerSecond: number };

  // =========================
  // SHAPES (granular)
  // =========================
  SHAPE_ADDED: {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
    area: number;
  };

  SHAPE_REMOVED: {
    id: string;
  };

  SHAPES_CLEARED: {};

  // =========================
  // SHAPES (aggregated)
  // =========================
  SHAPES_UPDATED: {
    shapesNumber: number;
    occupiedArea: number;
    shapes: {
      id: string;
      type: ShapeType;
      x: number;
      y: number;
      area: number;
    }[];
  };
};

export const eventBus = new EventEmitter();
