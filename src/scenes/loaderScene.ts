import { Application, Sprite, Ticker } from "pixi.js";
import { BaseScene } from "./baseScene";
import { loadBundle, getTexture } from "../common/assetLoader";
import type { ScenesName } from "../common/types";
import { allLoadingTextureKeys } from "../common/textures";
import { colors } from "../common/constants";
import { RegularText } from "../ui/Text";

export class LoaderScene extends BaseScene {
  private text!: RegularText;

  private nextScene: ScenesName;
  private bundle: ScenesName;
  private app: Application;

  private elapsed = 0;
  private delay = 60;
  private isLoaded = false;

  constructor(nextScene: ScenesName, bundle: ScenesName, app: Application) {
    super();
    this.nextScene = nextScene;
    this.bundle = bundle;
    this.app = app;
  }

  async init() {
    const { width, height } = this.app.screen;

    // BACKGROUND
    const bgTex = getTexture(allLoadingTextureKeys.desktopBackground);
    const bg = new Sprite(bgTex);

    bg.width = width;
    bg.height = height;

    this.container.addChild(bg);

    // TEXT
    this.text = new RegularText("Loading... 0%", 64, colors.orange.regular);
    this.text.position.set(width / 2, height / 2);
    this.container.addChild(this.text);

    // LOAD
    await loadBundle(this.bundle, (progress) => {
      const percent = Math.round(progress * 100);
      this.text.setText(`Loading ${percent}%`);
    });

    this.isLoaded = true;

    // запускаємо "таймер"
    Ticker.shared.add(this.updateDelay, this);
  }

  update() {}

  private updateDelay(ticker: Ticker) {
    if (!this.isLoaded) return;

    this.elapsed += ticker.deltaTime;

    if (this.elapsed >= this.delay) {
      Ticker.shared.remove(this.updateDelay, this);
      this.emit("done", this.nextScene);
    }
  }

  override async destroy(): Promise<void> {
    Ticker.shared.remove(this.updateDelay, this);
    await super.destroy();
  }
}
