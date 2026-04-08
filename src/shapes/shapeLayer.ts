import { Container, Graphics, Spritesheet } from "pixi.js";
import { mainShapeLayerConfig } from "./shape.config";
import { colors } from "../common/constants";

import { ControlsPanel } from "./controlsPanel";
import { ShapeFactory } from "./shapeFactory";
import { ShapePool } from "./shapePool";
import { ShapeSystem } from "./shapeSystem";
import { InputOverlay } from "./inputOverlay";
import { rootStore } from "../store/rooteStore";
import { InfoPanel } from "./infoPanel";

export class MainShapeLayer extends Container {
  private frame!: Graphics;
  private maskShape!: Graphics;

  private content!: Container;
  private bg!: Graphics;

  private system!: ShapeSystem;
  private overlay!: InputOverlay;
  private controls!: ControlsPanel;
  private infoPanel!: InfoPanel;

  private pool!: ShapePool;

  private spawnTimer = 0;
  private debugTimer = 0;

  private isDestroyed = false;

  private innerW: number = 0;
  private innerH: number = 0;

  init(sheet: Spritesheet) {
    this.innerW = mainShapeLayerConfig.mask.width;
    this.innerH = mainShapeLayerConfig.mask.height;

    const maskX = (mainShapeLayerConfig.frame.width - this.innerW) / 2;
    const maskY = (mainShapeLayerConfig.frame.height - this.innerH) / 2;

    this.frame = new Graphics()
      .rect(
        0,
        0,
        mainShapeLayerConfig.frame.width,
        mainShapeLayerConfig.frame.height,
      )
      .stroke({ width: 2, color: colors.blue.darker });

    this.addChild(this.frame);

    this.content = new Container();
    this.content.position.set(maskX, maskY);
    this.addChild(this.content);

    this.bg = new Graphics()
      .rect(0, 0, this.innerW, this.innerH)
      .fill(colors.black);

    this.content.addChild(this.bg);

    this.maskShape = new Graphics()
      .rect(0, 0, this.innerW, this.innerH)
      .fill(colors.white);

    this.content.addChild(this.maskShape);
    this.content.mask = this.maskShape;

    this.pool = new ShapePool();

    const factory = new ShapeFactory(sheet.textures);

    this.system = new ShapeSystem(this.content, factory, this.pool);

    this.overlay = new InputOverlay(this);
    this.content.addChild(this.overlay);

    this.controls = new ControlsPanel();
    this.controls.init();

    this.controls.position.set(0, mainShapeLayerConfig.frame.height - 80);

    this.addChild(this.controls);

    this.infoPanel = new InfoPanel();
    this.infoPanel.init(this);
    this.infoPanel.position.set(110, 60);
    this.addChild(this.infoPanel);
  }

  public get shapeCount(): number {
    return this.system.count;
  }

  public get innerWidth(): number {
    return this.innerW;
  }

  public get innerHeight(): number {
    return this.innerH;
  }

  public spawn(x: number, y: number) {
    this.system.spawn(x, y);
  }

  public getContent(): Container {
    return this.content;
  }

  update(deltaMS: number) {
    if (this.isDestroyed) return;

    this.system.update(deltaMS);

    this.spawnTimer += deltaMS;

    const interval = 1000 / rootStore.physics.getSpawnPerSecond();

    if (this.spawnTimer >= interval) {
      this.spawnTimer = 0;

      this.system.spawn(Math.random() * this.innerW, -50);
    }

    this.debugTimer += deltaMS;

    if (this.debugTimer > 2000) {
      this.debugTimer = 0;

      console.log("shapes:", this.system.count);
    }
  }

  destroy() {
    this.isDestroyed = true;

    this.system?.destroy();

    this.removeAllListeners();
    this.removeChildren();

    this.content?.destroy({ children: true });

    this.pool?.clear();

    this.pool = null as any;
    this.system = null as any;
    this.overlay = null as any;
    this.controls = null as any;
  }
}
