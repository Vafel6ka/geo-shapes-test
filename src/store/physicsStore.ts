import { Store } from "./store";
import { initialPhysicsState } from "./state.config";
import { eventBus } from "../core/eventBus";

export class PhysicsStore extends Store<typeof initialPhysicsState> {
  constructor() {
    super(initialPhysicsState);
  }

  getGravity() {
    return this.getState().gravity;
  }

  getSpawnPerSecond() {
    return this.getState().spawnPerSecond;
  }

  // =========================
  // GRAVITY
  // =========================
  increaseGravity(step = 10) {
    const gravity = this.getState().gravity + step;

    this.setState({ gravity });

    eventBus.emit("PHYSICS_GRAVITY_CHANGED", { gravity });
  }

  decreaseGravity(step = 10) {
    const gravity = Math.max(0, this.getState().gravity - step);

    this.setState({ gravity });

    eventBus.emit("PHYSICS_GRAVITY_CHANGED", { gravity });
  }

  // =========================
  // SPAWN RATE
  // =========================
  increaseSpawnRate(step = 1) {
    const spawnPerSecond = this.getState().spawnPerSecond + step;

    this.setState({ spawnPerSecond });

    eventBus.emit("PHYSICS_SPAWN_CHANGED", { spawnPerSecond });
  }

  decreaseSpawnRate(step = 1) {
    const spawnPerSecond = Math.max(0, this.getState().spawnPerSecond - step);
    this.setState({ spawnPerSecond });
    eventBus.emit("PHYSICS_SPAWN_CHANGED", { spawnPerSecond });
  }
}
