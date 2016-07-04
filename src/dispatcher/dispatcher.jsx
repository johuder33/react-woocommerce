import * as Flux from 'flux';

const AppDispatcher = Object.assign(new Flux.Dispatcher(), {
    handleAction: function(action) {
        if (!action.type) {
            throw new Error('You must to specify a type of event to dispatch');
        }

        this.dispatch(action);
    }
});

export default AppDispatcher;