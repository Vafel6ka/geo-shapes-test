import { Container, Text, TextStyle } from "pixi.js";
import { colors } from "../../common/constants";

export class RegularText extends Container {
  private text: Text;

  constructor(
    value: string,
    fontSize: number = 64,
    color: number | string = colors.orange.darker,
  ) {
    super();

    const style = new TextStyle({
      fill: color,
      fontSize,
      fontFamily: "GameMenuFont",
      fontWeight: "bold",
      dropShadow: { color: colors.black, blur: 4, distance: 6 },
      align: "center",
    });

    this.text = new Text({
      text: value,
      style,
    });

    this.text.anchor.set(0.5);
    this.addChild(this.text);
  }

  public setText(value: string) {
    this.text.text = value;
  }
}
