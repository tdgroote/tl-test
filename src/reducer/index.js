import {
    SUCCESS_PLACE,
    SUCCESS_REMOVE
} from '../constants';

import {
    combineObjs,
    argToObjKey,
    removeById,
    concat
} from '../util';

import { noop, flowRight as compose, identity, flip } from 'lodash';

const ordersActionHandler = handler => compose(
    argToObjKey('orders'),
    (payload, { orders }) => handler(payload, orders)
);

const initialState = {
    products: [],
    customers: [],
    orders: [],
    loadingInitialData: true,
    alert: ''
};

const alert = alert => newState => combineObjs(newState, { alert });
const removeOrder = ordersActionHandler(flip(removeById));

const actionHandlers = {
    initialLoadingDone: () => ({ loadingInitialData: false }),
    setProducts: argToObjKey('products'),
    setCustomers: argToObjKey('customers'),
    alert: argToObjKey('alert'),
    closeAlert: alert(''),
    setOrders: ordersActionHandler(identity),
    createOrder: ordersActionHandler(flip(concat)),
    placeOrder: compose(alert(SUCCESS_PLACE), removeOrder),
    removeOrder: compose(alert(SUCCESS_REMOVE), removeOrder),
    updateOrder: ordersActionHandler((changedOrder, orders) =>
        orders.map(order => order.id === changedOrder.id ? changedOrder : order)
    )
};

export default (state = initialState, action) => combineObjs(
    state,
    (actionHandlers[action.type] || noop)(action.payload, state)
);
