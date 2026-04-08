import { Application, Ticker } from "pixi.js";
import { eventBus } from "./eventBus";
import { SceneManager } from "../managers/sceneManagers";
import { HomeScene } from "../scenes/homeScene";
import { GameScene } from "../scenes/gameScene";
import { colors, sceneSize } from "../common/constants";
import { resizeLetterbox } from "../utils/resize";
import type { ScenesName } from "../common/types";

export class Game {
  public app!: Application;
  private sceneManager!: SceneManager;
  private resizeHandler?: () => void;

  async start() {
    this.app = new Application();

    await this.app.init({
      width: sceneSize.width,
      height: sceneSize.height,
      background: colors.gray,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });

    document.body.appendChild(this.app.canvas);

    this.setupResize();

    this.sceneManager = new SceneManager(this.app);

    this.sceneManager.register("home", () => new HomeScene(this.app));
    this.sceneManager.register("game", () => new GameScene(this.app));

    eventBus.on("NAVIGATE", this.onNavigate, this);

    await this.sceneManager.start("home");

    this.app.ticker.add((ticker: Ticker) => {
      this.sceneManager.update(ticker);
    });
  }

  private onNavigate = ({
    scene,
    bundle,
  }: {
    scene: ScenesName;
    bundle?: ScenesName;
  }) => {
    this.sceneManager.goTo(scene, bundle);
  };

  private setupResize() {
    let raf = 0;

    this.resizeHandler = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const { width, height } = resizeLetterbox(
          this.app,
          sceneSize.width,
          sceneSize.height,
        );

        eventBus.emit("resize", { width, height });
      });
    };

    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  }

  destroy() {
    throw new Error("Method not implemented.");
  }
}
