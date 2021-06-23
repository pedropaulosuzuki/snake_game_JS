export class EventHandler {
    constructor() {
        this.events = new Map();
    }


    subscribe(event, object) {
        // Object must have an update method
        if(typeof object?.update !== 'function') {
            throw new Error('Tried to subscribe object to an event without an update method.');
        }

        if(this.events.has(event)) {
            this.events.get(event).add(object);
        } else {
            this.events.set(event, new Set([object]));
        }

        return this;
    }

    unsubscribe(event, object) {
        // Object must have an update method
        if(typeof object?.update !== 'function') {
            throw new Error('Tried to unsubscribe object to an event without an update method.');
        }

        if(this.events.has(event)) {
            this.events.get(event).delete(object);
            if(this.events.size === 0) {
                this.events.delete(event);
            }
        }

        return this;
    }

    fire_event(event, data) {
        if(this.events.has(event)) {
            for(const object of this.events.get(event)) {
                object.update(event, data);
            }
        }

        return this;
    }
}