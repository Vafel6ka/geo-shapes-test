import { Store } from "./store";
import { initialShapesState } from "./state.config";
import { eventBus } from "../core/eventBus";
import type { ShapeType } from "../common/types";

export class ShapesStore extends Store<typeof initialShapesState> {
  constructor() {
    super(initialShapesState);
  }

  private recalc(shapes: any[]) {
    const shapesNumber = shapes.length;
    const occupiedArea = shapes.reduce((sum, s) => sum + s.area, 0);

    this.setState({
      shapes,
      shapesNumber,
      occupiedArea,
    });

    eventBus.emit("SHAPES_UPDATED", {
      shapes,
      shapesNumber,
      occupiedArea,
    });
  }

  addShape(shape: {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
    area: number;
  }) {
    const shapes = [...this.getState().shapes, shape];

    eventBus.emit("SHAPE_ADDED", shape);

    this.recalc(shapes);
  }

  removeShape(id: string) {
    const shapes = this.getState().shapes.filter((s) => s.id !== id);

    eventBus.emit("SHAPE_REMOVED", { id });

    this.recalc(shapes);
  }

  clear() {
    eventBus.emit("SHAPES_CLEARED", {});

    this.recalc([]);
  }
}
