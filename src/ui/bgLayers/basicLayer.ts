import { Container, Sprite } from "pixi.js";
import type { AllTextureKeysType } from "../../common/types";
import { getTexture } from "../../common/assetLoader";

export class BasicLayer extends Container {
  private bg?: Sprite;
  public bgTexture!: AllTextureKeysType;

  constructor(bgTexture: AllTextureKeysType) {
    super();
    this.bgTexture = bgTexture;
  }

  init(width: number, height: number) {
    const tex = getTexture(this.bgTexture);
    if (!tex) return;
    this.bg = new Sprite(tex);
    this.bg.width = width;
    this.bg.height = height;
    this.addChild(this.bg);
  }

  override destroy(options?: { children?: boolean }) {
    if (this.bg) {
      this.bg.destroy();
      this.bg = undefined;
    }

    super.destroy(options);
  }
}
