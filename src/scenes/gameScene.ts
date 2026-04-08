import { getSpritesheet, loadBundle } from "../common/assetLoader";
import { allGameTextureKeys } from "../common/textures";
import { BasicLayer } from "../ui/bgLayers/basicLayer";
import { ExitButton } from "../ui/buttons";
import { BaseScene } from "./baseScene";
import { Application, Ticker } from "pixi.js";

import { MainShapeLayer } from "../shapes/shapeLayer";

export class GameScene extends BaseScene {
  public app: Application;

  private bgLayer!: BasicLayer;
  private exitButton!: ExitButton;
  private shapeBlock!: MainShapeLayer;

  constructor(app: Application) {
    super();
    this.app = app;

    // ticker bind
    this.app.ticker.add(this.update, this);
  }

  async init() {
    await loadBundle("game", (progress) => {
      console.log("GAME:", progress);
    });

    this.bundleName = "game";

    const { width, height } = this.app.screen;

    // =========================
    // BACKGROUND
    // =========================
    this.bgLayer = new BasicLayer(allGameTextureKeys.desktopBackground);
    this.bgLayer.init(width, height);

    // =========================
    // EXIT BUTTON
    // =========================
    this.exitButton = new ExitButton();
    this.exitButton.init();

    // =========================
    // SHAPE LAYER (MAIN BLOCK)
    // =========================
    const sheet = getSpritesheet("game.shapes");

    this.shapeBlock = new MainShapeLayer();
    this.shapeBlock.init(sheet);

    // =========================
    // ADD TO SCENE (ONCE)
    // =========================
    this.container.addChild(this.bgLayer, this.shapeBlock, this.exitButton);

    // =========================
    // LAYOUT
    // =========================
    this.layout(this.shapeBlock);
    this.layout(this.exitButton);
  }

  private layout = (el: ExitButton | MainShapeLayer) => {
    const { width, height } = this.app.screen;

    if (el instanceof ExitButton) {
      el.position.set(width - 100, 100);
    }

    if (el instanceof MainShapeLayer) {
      const bounds = el.getBounds();

      el.position.set(
        width / 2 - bounds.width / 2,
        height / 2 - bounds.height / 2,
      );
    }
  };

  update = (ticker: Ticker): void => {
    this.shapeBlock?.update(ticker.deltaMS);
  };

  override async destroy() {
    this.app.ticker.remove(this.update, this);
    await super.destroy();
    console.log("GameScene fully destroyed");
  }
}
