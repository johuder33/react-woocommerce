import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/dispatcher.jsx';

class EventStoreClass extends EventEmitter {
    addUpdateCartListener(callback) {
        this.on('ADD_TO_CART', callback);
    }

    emitUpdateCartEvent(callback) {
        this.emit('ADD_TO_CART', callback);
    }

    removeUpdateCartListener(callback) {
        this.removeListener('ADD_TO_CART', callback);
    }
}

const EventStore = new EventStoreClass();

AppDispatcher.register((action) => {
    switch(action.type) {
    case "ADD_TO_CART":
        EventStore.emitUpdateCartEvent();
        break;
    }
});

export default EventStore;