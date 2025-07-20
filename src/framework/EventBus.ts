export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<
    Event extends string = string,
    M extends { [K in Event]: unknown[] } = Record<Event, any[]>
    > {
    private listeners: { [key in Event]?: Listener<M[Event]>[] } = {};

    on(event: Event, callback: Listener<M[Event]>) {
        if (!this.listeners[event]) {
        this.listeners[event] = [];
        }

        this.listeners[event]?.push(callback);
    }

    off(event: Event, callback: Listener<M[Event]>) {
        if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event]?.filter(
        (listener) => listener !== callback
        );
    }

    emit(event: Event, ...args: M[Event]) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event]?.forEach(function (listener) {
            listener(...args);
        });
    }
}
