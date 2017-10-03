import { push } from 'react-router-redux';

const actionTypeToLocation = {
    'createOrder': '/orders',
    'updateOrder': '/orders'
};

// Forwards the application to a different path based on specific actions
export default store => next => action => {
    const newLocation = actionTypeToLocation[action.type];

    next(action);

    if (newLocation) {
        store.dispatch(push(newLocation));
    }
};
