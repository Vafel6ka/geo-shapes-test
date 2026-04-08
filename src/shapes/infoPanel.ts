import { Container } from "pixi.js";
import { RegularText } from "../ui/Text";
import { rootStore } from "../store/rooteStore";

export class InfoPanel extends Container {
  private shapesText!: RegularText;
  private unsubscribe?: () => void;

  init() {
    this.shapesText = new RegularText("shapes: 0", 28);
    this.addChild(this.shapesText);

    this.unsubscribe = rootStore.shapes.subscribe((state) => {
      this.shapesText.setText(
        `shapes: ${state.shapesNumber} area: ${state.occupiedArea}`,
      );
    });

    this.sync();
  }

  private sync() {
    const state = rootStore.shapes.getState();
    this.shapesText.setText(
      `shapes: ${state.shapesNumber} | area: ${state.occupiedArea}`,
    );
  }

  destroy() {
    this.unsubscribe?.();
    super.destroy();
  }
}
