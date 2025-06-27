export type Listener = (...args: any[]) => void;
type ListenersMap = { [event: string]: Listener[] };

export default class EventBus {
    private listeners: ListenersMap;

    constructor() {
        this.listeners = {};
    }
    
    /**
     * Registers a callback function to an event.
     *
     * @param {string} event - The event name.
     * @param {Listener} callback - The callback function.
     */
    on(event: string, callback: Listener): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    /**
     * Removes a callback function from an event.
     *
     * @param {string} event - The event name.
     * @param {Listener} callback - The callback function.
     * @throws Will throw an error if the event does not exist.
     */
    off(event: string, callback: Listener): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    /**
     * Emits an event, calling all registered callback functions with the provided arguments.
     *
     * @param {string} event - The event name.
     * @param {...any} args - Arguments to pass to the callback functions.
     * @throws Will throw an error if the event does not exist.
     */
    emit(event: string, ...args: any[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}
