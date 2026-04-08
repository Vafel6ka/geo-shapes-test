import type EventEmitter from "eventemitter3";

export class EventSubscriptionManager<T extends Record<string, any>> {
  private emitter: EventEmitter;
  private subscriptions: Array<{
    event: keyof T;
    handler: (...args: any[]) => void;
  }> = [];

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }

  on<K extends keyof T>(
    event: K,
    handler: T[K] extends void ? () => void : (payload: T[K]) => void,
  ) {
    this.emitter.on(event as string, handler as any);

    this.subscriptions.push({
      event,
      handler: handler as (...args: any[]) => void,
    });
  }

  off<K extends keyof T>(
    event: K,
    handler: T[K] extends void ? () => void : (payload: T[K]) => void,
  ) {
    this.emitter.off(event as string, handler as any);

    this.subscriptions = this.subscriptions.filter(
      (s) => !(s.event === event && s.handler === handler),
    );
  }

  clear() {
    for (const { event, handler } of this.subscriptions) {
      this.emitter.off(event as string, handler);
    }
    this.subscriptions = [];
  }
}
