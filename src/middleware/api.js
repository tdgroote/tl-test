import { ERROR_GENERAL } from '../constants';

import {
    setProducts,
    setCustomers,
    setOrders,
    initialLoadingDone,
    alert
} from '../actions';

import {
    getProducts,
    getCustomers,
    getOrders,
    updateOrder,
    removeOrder,
    placeOrder,
    createOrder
} from '../api';

const handleError = (store, message = ERROR_GENERAL) => () => {
    store.dispatch(alert(message));
    return Promise.reject(message);
};

const callNext = (action, next) => () => next(action);
const callNextWithPayload = ({ type }, next) => (payload) => next({
    type,
    payload
});

const getInitialValues = () => Promise.all([
    getProducts(),
    getCustomers(),
    getOrders()
]);

const handleApiCall = (apiCall, onSuccess, onError) => (action, next, store) =>
    apiCall(action.payload).then(onSuccess(action, next), onError(store));

const actionToApi = {
    removeOrder: handleApiCall(removeOrder, callNext, handleError),
    placeOrder: handleApiCall(placeOrder, callNext, handleError),
    createOrder: handleApiCall(createOrder, callNextWithPayload, handleError),
    updateOrder: handleApiCall(updateOrder, callNextWithPayload, handleError)
};

export default store => {
    // Get the initial values from the API. Best to move this out of here and
    // let it be triggered by an action like all the other API calls instead.
    getInitialValues().then(([products, customers, orders]) => {
        store.dispatch(setProducts(products));
        store.dispatch(setCustomers(customers));
        store.dispatch(setOrders(orders));
        store.dispatch(initialLoadingDone());
    }, handleError(store));

    return next => action => {
        const apiCall = actionToApi[action.type];

        if (apiCall) {
            return apiCall(action, next, store);
        }

        return next(action);
    };
};
