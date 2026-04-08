import { Container } from "pixi.js";
import { RegularButton } from "../ui/buttons/regularBtn";
import { rootStore } from "../store/rooteStore";

export class ControlsPanel extends Container {
  init() {
    const gap = 20;

    // =========================
    // GRAVITY +
    // =========================
    const incGravity = new RegularButton();
    incGravity.init("Gravity +", 140, 60, () => {
      rootStore.physics.increaseGravity();
    });

    // =========================
    // GRAVITY -
    // =========================
    const decGravity = new RegularButton();
    decGravity.init("Gravity -", 140, 60, () => {
      rootStore.physics.decreaseGravity();
    });

    // =========================
    // SPAWN +
    // =========================
    const incSpawn = new RegularButton();
    incSpawn.init("Shapes +", 140, 60, () => {
      rootStore.physics.increaseSpawnRate(1);
    });

    // =========================
    // SPAWN -
    // =========================
    const decSpawn = new RegularButton();
    decSpawn.init("Shapes -", 140, 60, () => {
      rootStore.physics.decreaseSpawnRate(1);
    });

    // =========================
    // LAYOUT
    // =========================
    incGravity.position.set(0, 0);
    decGravity.position.set(160, 0);

    incSpawn.position.set(320, 0);
    decSpawn.position.set(480, 0);

    this.addChild(incGravity, decGravity, incSpawn, decSpawn);
  }
}
