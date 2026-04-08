import { Container, Text, TextStyle, Sprite } from "pixi.js";
import { colors } from "../../common/constants";
import { getTexture } from "../../common/assetLoader";
import { allHomeTextureKeys } from "../../common/textures";

export class HomeTitle extends Container {
  private titleText: Text;
  private subTitle: Text;
  private bg!: Sprite;

  constructor(gameTitle: string = "My Game", subTitle: string = "Boom") {
    super();

    const titleStyle = new TextStyle({
      fill: colors.orange.darker,
      fontSize: 96,
      fontFamily: "TitleGameFont",
      fontWeight: "bold",
      dropShadow: { color: colors.black, blur: 4, distance: 6 },
      align: "center",
    });

    const subTitleStyle = new TextStyle({
      fill: colors.orange.dark,
      fontSize: 128,
      fontFamily: "TitleGameFont",
      fontWeight: "bold",
      dropShadow: { color: colors.black, blur: 4, distance: 6 },
      align: "center",
    });

    this.titleText = new Text({ text: gameTitle, style: titleStyle });
    this.subTitle = new Text({ text: subTitle, style: subTitleStyle });

    const gap = 10;

    this.titleText.anchor.set(0.5);
    this.subTitle.anchor.set(0.5);

    this.titleText.position.set(0, 0);

    // позиція subtitle
    this.subTitle.position.set(0, this.titleText.height + gap);

    // BACKGROUND для subtitle

    const tex = getTexture(allHomeTextureKeys.boom);

    if (tex) {
      this.bg = new Sprite(tex);
      this.bg.anchor.set(0.5);
      this.bg.scale.set(2);
      this.bg.alpha = 0.7;
      // позиція = як у subtitle
      this.bg.position.set(this.subTitle.x, this.subTitle.y - gap * 4);

      // додаємо ПЕРЕД текстом
      this.addChild(this.bg);
    }

    // текст поверх
    this.addChild(this.titleText);
    this.addChild(this.subTitle);
  }
}
