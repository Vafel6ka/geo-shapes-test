import { Container } from "pixi.js";
import { RegularButton } from "../ui/buttons/regularBtn";
import { rootStore } from "../store/rooteStore";
import { RegularText } from "../ui/Text";

export class ControlsPanel extends Container {
  private gravityValue!: RegularText;
  private spawnValue!: RegularText;

  init() {
    const gapX = 20;

    // =========================
    // GRAVITY +
    // =========================
    const incGravity = new RegularButton();
    incGravity.init("Gravity +", 140, 60, () => {
      rootStore.physics.increaseGravity();
      this.sync();
    });

    // =========================
    // GRAVITY -
    // =========================
    const decGravity = new RegularButton();
    decGravity.init("Gravity -", 140, 60, () => {
      rootStore.physics.decreaseGravity();
      this.sync();
    });

    // =========================
    // SPAWN +
    // =========================
    const incSpawn = new RegularButton();
    incSpawn.init("Shapes +", 140, 60, () => {
      rootStore.physics.increaseSpawnRate(1);
      this.sync();
    });

    // =========================
    // SPAWN -
    // =========================
    const decSpawn = new RegularButton();
    decSpawn.init("Shapes -", 140, 60, () => {
      rootStore.physics.decreaseSpawnRate(1);
      this.sync();
    });

    // =========================
    // VALUE TEXTS (LIVE STATE)
    // =========================
    this.gravityValue = new RegularText(
      `Gravity: ${rootStore.physics.getGravity().toFixed(2)}`,
      28,
    );

    this.spawnValue = new RegularText(
      `Spawn: ${rootStore.physics.getSpawnPerSecond().toFixed(1)}/s`,
      28,
    );

    // =========================
    // LAYOUT
    // =========================

    // GRAVITY BLOCK
    incGravity.position.set(50, 0);
    decGravity.position.set(210, 0);

    // SPAWN BLOCK
    incSpawn.position.set(370, 0);
    decSpawn.position.set(530, 0);

    //Value Block
    this.gravityValue.position.set(840, 25);
    this.spawnValue.position.set(820, 50);

    this.addChild(
      incGravity,
      decGravity,
      incSpawn,
      decSpawn,
      this.gravityValue,
      this.spawnValue,
    );

    // initial sync
    this.sync();
  }

  private sync() {
    this.gravityValue.setText(
      `Gravity: ${rootStore.physics.getGravity().toFixed(2)}`,
    );

    this.spawnValue.setText(
      `Spawn: ${rootStore.physics.getSpawnPerSecond().toFixed(1)}/s`,
    );
  }
}
