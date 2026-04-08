import { Application, Ticker } from "pixi.js";
import type { BaseScene } from "../scenes/baseScene";
import { LoaderScene } from "../scenes/loaderScene";
import type { ScenesName } from "../common/types";
import { loadBundle } from "../common/assetLoader";

type SceneFactory = () => BaseScene;

export class SceneManager {
  private app: Application;
  private scenes = new Map<string, SceneFactory>();
  private current?: BaseScene;
  private isSwitching = false;

  // 🔥 кеш для loading
  private isLoadingLoaded = false;

  constructor(app: Application) {
    this.app = app;
  }

  register(id: ScenesName, factory: SceneFactory) {
    this.scenes.set(id, factory);
  }

  async start(id: ScenesName) {
    await this.switchDirect(id);
  }

  async goTo(target: ScenesName, bundle?: ScenesName) {
    if (this.isSwitching) return;
    this.isSwitching = true;

    if (bundle) {
      await this.switchToLoader(target, bundle);
    } else {
      await this.switchDirect(target);
    }

    this.isSwitching = false;
  }

  // 🔥 Loader flow
  private async switchToLoader(target: ScenesName, bundle: ScenesName) {
    // ✅ грузимо loading 1 раз
    if (!this.isLoadingLoaded) {
      await loadBundle("loader");
      this.isLoadingLoaded = true;
    }

    const loader = new LoaderScene(target, bundle, this.app);

    if (this.current) {
      this.app.stage.removeChild(this.current.container);
      this.current.destroy();
    }

    this.current = loader;
    this.app.stage.addChild(loader.container);

    loader.on("done", async (sceneId: ScenesName) => {
      await this.switchDirect(sceneId);

      // await Assets.unloadBundle("loader");
    });

    await loader.init();
  }

  // 🔥 звичайний перехід
  private async switchDirect(id: ScenesName) {
    const factory = this.scenes.get(id);
    if (!factory) throw new Error(`Scene ${id} not found`);

    const next = factory();

    if (this.current) {
      this.app.stage.removeChild(this.current.container);
      this.current.destroy();
    }

    this.current = next;
    this.app.stage.addChild(next.container);

    await next.init();
  }

  update(ticker: Ticker) {
    this.current?.update(ticker);
  }
}
