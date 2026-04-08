import { Container, Sprite, Ticker } from "pixi.js";
import { allGameTextureKeys } from "../../common/textures";
import { eventBus } from "../../core/eventBus";
import { getTexture } from "../../common/assetLoader";

export class ExitButton extends Container {
  private bg?: Sprite;

  private time = 0;

  private baseScale = 0.7;
  private amplitude = 0.05;
  private speed = 0.05;

  private isHover = false;

  init() {
    const tex = getTexture(allGameTextureKeys.exit);
    if (!tex) return;

    this.bg = new Sprite(tex);
    this.bg.anchor.set(0.5);
    this.bg.scale.set(this.baseScale);

    this.addChild(this.bg);

    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerover", this.onHover, this);
    this.on("pointerout", this.onOut, this);
    this.on("pointertap", this.onClick, this);

    Ticker.shared.add(this.update, this);
  }

  private onHover() {
    this.isHover = true;
  }

  private onOut() {
    this.isHover = false;
  }

  private onClick() {
    eventBus.emit("NAVIGATE", {
      scene: "home",
      bundle: "home",
    });
  }

  private update(ticker: Ticker) {
    if (!this.bg) return;

    const delta = ticker.deltaTime;

    let targetScale = this.baseScale;

    if (!this.isHover) {
      this.time += delta;

      const pulse = 1 + Math.sin(this.time * this.speed) * this.amplitude;

      targetScale = this.baseScale * pulse;
    }

    const current = this.bg.scale.x;
    const lerpSpeed = 0.1;

    const next = current + (targetScale - current) * lerpSpeed;

    this.bg.scale.set(next);
  }

  override destroy(options?: { children?: boolean }) {
    Ticker.shared.remove(this.update, this);
    this.removeAllListeners();

    if (this.bg && !this.bg.destroyed) {
      this.bg.destroy();
      this.bg = undefined;
    }

    super.destroy(options);
  }
}
