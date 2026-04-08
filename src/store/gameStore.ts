import { Store } from "./store";
import { initialGameState } from "./state.config";
import { eventBus } from "../core/eventBus";

export class GameStore extends Store<typeof initialGameState> {
  constructor() {
    super(initialGameState);
  }

  setScreenSize(width: number, height: number) {
    this.setState({ width, height });
    eventBus.emit("GAME_RESIZE", { width, height });
  }

  setFrame(frame: { x: number; y: number; width: number; height: number }) {
    this.setState({ frame });
    eventBus.emit("GAME_FRAME_UPDATED", frame);
  }

  pause() {
    this.setState({ isPaused: true, isRunning: false });
    eventBus.emit("GAME_PAUSED", {});
  }

  resume() {
    this.setState({ isPaused: false, isRunning: true });
    eventBus.emit("GAME_RESUMED", {});
  }

  stop() {
    this.setState({ isRunning: false });
    eventBus.emit("GAME_STOPPED", {});
  }
}
