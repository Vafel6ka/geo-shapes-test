import { Container, Ticker } from "pixi.js";
import { EventEmitter } from "eventemitter3";
import { EventSubscriptionManager } from "../core/eventSubscriptionManager";
import { eventBus } from "../core/eventBus";
import type { ScenesName } from "../common/types";
import { Assets } from "pixi.js";

export abstract class BaseScene extends EventEmitter {
  public container = new Container();
  protected bundleName?: ScenesName;
  protected bus = new EventSubscriptionManager(eventBus);

  private isDestroyed = false;

  abstract init(): Promise<void> | void;
  abstract update(ticker: Ticker): void;

  protected onDestroy(): void {}

  public async destroy(): Promise<void> {
    if (this.isDestroyed) return;
    this.isDestroyed = true;

    // events
    this.cleanupEvents();

    // hook
    this.onDestroy();

    // pixi cleanup
    this.container.removeChildren();
    this.container.destroy({ children: true });

    // unload bundle
    if (this.bundleName) {
      await Assets.unloadBundle(this.bundleName);
      console.log("scene fully destroyed");
    }
  }

  protected cleanupEvents(): void {
    this.bus.clear();
    this.removeAllListeners();
  }
}
