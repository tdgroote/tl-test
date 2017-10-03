import { curry, flowRight as compose } from 'lodash';
import { combineObjs, getById, get } from './util';

const getCustomerName = compose(get('name'), getById);
const getProductDescription = compose(get('description'), getById);

// Since the customer data etc isn't attached to the order directly we need to
// get it from the state. In the future we can look at something like normalizr
// to do this for us or do the mapping when we get the api response back.
const getOrder = curry((state, order) => combineObjs(order, {
    customerName: getCustomerName(state.customers, order['customer-id']),
    items: order.items.map(item => combineObjs(item, {
        name: getProductDescription(state.products, item['product-id'])
    }))
}));

export const getOrderById = (state, orderId) => {
    const rawOrder = getById(state.orders, orderId);
    if (rawOrder) {
        return getOrder(state, rawOrder);
    }
};

export const getOrders = state => state.orders.map(getOrder(state));
