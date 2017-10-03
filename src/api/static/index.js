import customers from './data/customers';
import products from './data/products';
import orders from './data/orders';

import { flowRight as compose } from 'lodash';
import { getById } from '../../util';

let currentIds = orders.map(order => parseInt(order.id, 10)).sort();

const newId = () => {
    const newId = currentIds[currentIds.length - 1] + 1;
    currentIds.push(newId);
    return '' + newId;
};

const mapItemsToApiItems = itemsUpdate => Object.keys(itemsUpdate).reduce(
    (items, productKey) => {
        const quantity = itemsUpdate[productKey];
        if (quantity > 0) {
            const product = getById(products, productKey);
            items.push({
                'product-id': productKey,
                quantity: '' + quantity,
                'unit-price': '' + product.price,
                'total': '' + (product.price * quantity).toFixed(2)
            });
        }
        return items;
    },[]);

const mapToApiOrder = (orderId, toMap) => {
    const items = mapItemsToApiItems(toMap.items);
    const total = '' + items.reduce(
        (total, item) => total + Number(item.total),
        0
    ).toFixed(2);

    return {
        id: orderId,
        'customer-id': toMap['customer-id'],
        items,
        total
    };
};

const logApiCall = api => data => {
    let log = `API call ${api}`;
    if (data) log += ` with data: ${JSON.stringify(data)}`;
    // eslint-disable-next-line no-console
    console.log(log);
    return data;
};

const resolveWith = response => () => Promise.resolve(response);

export const getCustomers = compose(resolveWith(customers), logApiCall('getCustomers'));
export const getProducts = compose(resolveWith(products), logApiCall('getProducts'));
export const getOrders = compose(resolveWith(orders), logApiCall('getOrders'));
export const removeOrder = compose(resolveWith(), logApiCall('removeOrder'));
export const placeOrder = compose(resolveWith(), logApiCall('placeOrder'));
export const updateOrder = compose(
    order => Promise.resolve(mapToApiOrder(order.id, order)),
    logApiCall('updateOrder')
);
export const createOrder = compose(
    order => Promise.resolve(mapToApiOrder(newId(), order)),
    logApiCall('createOrder')
);
