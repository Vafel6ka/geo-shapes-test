import { Container, Graphics, Spritesheet } from "pixi.js";
import { mainShapeLayerConfig } from "./shape.config";
import { colors } from "../common/constants";

import { ControlsPanel } from "./controlsPanel";
import { ShapeFactory } from "./shapeFactory";
import { ShapePool } from "./shapePool";
import { ShapeSystem } from "./shapeSystem";
import { InputOverlay } from "./inputOverlay";
import { rootStore } from "../store/rooteStore";

export class MainShapeLayer extends Container {
  private frame!: Graphics;
  private maskShape!: Graphics;

  private content!: Container;
  private bg!: Graphics;

  private system!: ShapeSystem;
  private overlay!: InputOverlay;
  private controls!: ControlsPanel;

  private pool!: ShapePool;

  private spawnTimer = 0;

  public innerW!: number;
  public innerH!: number;

  init(sheet: Spritesheet) {
    this.innerW = mainShapeLayerConfig.mask.width;
    this.innerH = mainShapeLayerConfig.mask.height;

    const maskX = (mainShapeLayerConfig.frame.width - this.innerW) / 2;
    const maskY = (mainShapeLayerConfig.frame.height - this.innerH) / 2;

    // =========================
    // FRAME
    // =========================
    this.frame = new Graphics()
      .rect(
        0,
        0,
        mainShapeLayerConfig.frame.width,
        mainShapeLayerConfig.frame.height,
      )
      .stroke({ width: 2, color: colors.blue.darker });

    this.addChild(this.frame);

    // =========================
    // CONTENT
    // =========================
    this.content = new Container();
    this.content.position.set(maskX, maskY);
    this.addChild(this.content);

    // =========================
    // BG
    // =========================
    this.bg = new Graphics()
      .rect(0, 0, this.innerW, this.innerH)
      .fill(colors.black);

    this.content.addChild(this.bg);

    // =========================
    // MASK (FIXED)
    // =========================
    this.maskShape = new Graphics()
      .rect(0, 0, this.innerW, this.innerH)
      .fill(0xffffff);

    this.content.addChild(this.maskShape);
    this.content.mask = this.maskShape;

    // =========================
    // SYSTEM
    // =========================
    this.pool = new ShapePool();

    const factory = new ShapeFactory(sheet.textures);
    this.system = new ShapeSystem(this.content, factory, this.pool);

    // =========================
    // INPUT OVERLAY
    // =========================
    this.overlay = new InputOverlay(this);
    this.overlay.position.set(0, 0);
    this.content.addChild(this.overlay);

    // =========================
    // CONTROLS (FIXED - NOW INCLUDED)
    // =========================
    this.controls = new ControlsPanel();
    this.controls.init();

    this.controls.position.set(0, mainShapeLayerConfig.frame.height - 80);

    this.addChild(this.controls);
  }

  // =========================
  // GETTERS
  // =========================
  get innerWidth() {
    return this.innerW;
  }

  get innerHeight() {
    return this.innerH;
  }

  // =========================
  // SPAWN
  // =========================
  spawn(x: number, y: number) {
    this.system.spawn(x, y);
  }

  // =========================
  // UPDATE
  // =========================
  update(deltaMS: number) {
    this.system.update(deltaMS);

    this.spawnTimer += deltaMS;

    const interval = 1000 / rootStore.physics.getSpawnPerSecond();

    if (this.spawnTimer >= interval) {
      this.spawnTimer = 0;

      this.system.spawn(Math.random() * this.innerW, -50);
    }
  }

  getContent() {
    return this.content;
  }
}
