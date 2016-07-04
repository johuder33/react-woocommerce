import AppDispatcher from '../dispatcher/dispatcher.jsx';

export function updateCart() {
    AppDispatcher.handleAction({
        type: 'ADD_TO_CART'
    });
}
