type Listener<T> = (state: T) => void;

export class Store<T> {
  private state: T;
  private listeners: Listener<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(partial: Partial<T>) {
    this.state = { ...this.state, ...partial };
    this.emit();
  }

  subscribe(fn: Listener<T>) {
    this.listeners.push(fn);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private emit() {
    for (const l of this.listeners) {
      l(this.state);
    }
  }
}
