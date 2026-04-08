import { GameStore } from "./gameStore";
import { PhysicsStore } from "./physicsStore";
import { ShapesStore } from "./shapesStore";

export class RootStore {
  game = new GameStore();
  shapes = new ShapesStore();
  physics = new PhysicsStore();
}

export const rootStore = new RootStore();
