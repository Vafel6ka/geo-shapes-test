import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { colors } from "../../common/constants";

export class RegularButton extends Container {
  private bg!: Graphics;
  private border!: Graphics;
  private currentLabel!: Text;

  init(text: string, width = 180, height = 60, onClick?: () => void) {
    const radius = 12;
    const borderWidth = 4;

    // =========================
    // BORDER
    // =========================
    this.border = new Graphics();
    this.border.roundRect(0, 0, width, height, radius);
    this.border.stroke({
      width: borderWidth,
      color: colors.gray,
    });

    this.addChild(this.border);

    // =========================
    // BG
    // =========================
    this.bg = new Graphics();
    this.bg.roundRect(0, 0, width, height, radius);
    this.bg.fill(colors.orange.regular);

    this.bg.eventMode = "static";
    this.bg.cursor = "pointer";

    this.addChild(this.bg);

    // =========================
    // LABEL
    // =========================
    const style = new TextStyle({
      fill: colors.gray,
      fontSize: 28,
      fontFamily: "GameMenuFont",
      fontWeight: "bold",
      dropShadow: {
        color: colors.black,
        blur: 4,
        distance: 6,
      },
      align: "center",
    });

    this.currentLabel = new Text({
      text,
      style,
    });

    this.currentLabel.anchor.set(0.5);
    this.currentLabel.position.set(width / 2, height / 2);

    this.addChild(this.currentLabel);

    // =========================
    // CLICK
    // =========================
    this.bg.on("pointertap", (e) => {
      e.stopPropagation();
      onClick?.();
    });
  }
}
