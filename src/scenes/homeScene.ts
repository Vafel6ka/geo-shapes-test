import { loadBundle } from "../common/assetLoader";
import { allHomeTextureKeys } from "../common/textures";
import { BasicLayer } from "../ui/bgLayers/basicLayer";
import { PlayButton } from "../ui/buttons/playBtn";
import { HomeTitle } from "../ui/Text";
import { BaseScene } from "./baseScene";
import { Application, Ticker } from "pixi.js";

export class HomeScene extends BaseScene {
  private bgLayer!: BasicLayer;
  private playButton!: PlayButton;
  private homeTitle!: HomeTitle;

  public app: Application;

  constructor(app: Application) {
    super();
    this.app = app;
  }

  async init() {
    await loadBundle("home", (progress) => {
      console.log("HOME:", progress);
    });

    this.bundleName = "home";
    const { width, height } = this.app.screen;

    // bg
    this.bgLayer = new BasicLayer(allHomeTextureKeys.desktopBackground);
    this.bgLayer.init(width, height);
    this.container.addChild(this.bgLayer);

    // button
    this.playButton = new PlayButton();
    this.playButton.init();
    this.container.addChild(this.playButton);
    this.layout(this.playButton);

    // title
    this.homeTitle = new HomeTitle("Geo Shape Boom");
    this.container.addChild(this.homeTitle);
    this.layout(this.homeTitle);
  }

  private layout = (el: HomeTitle | PlayButton) => {
    const { width, height } = this.app.screen;

    if (el instanceof HomeTitle) {
      el.position.set(width / 2, height / 2);
    } else {
      el.position.set(width - 300, height * 0.8);
    }
  };

  update(_ticker: Ticker): void {}

  override async destroy() {
    super.destroy();

    console.log("home scene fully destroyed");
  }
}
