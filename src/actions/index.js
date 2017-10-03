const argAsPayloadAction = type => payload => ({ type, payload });

export const setOrders = argAsPayloadAction('setOrders');
export const setCustomers = argAsPayloadAction('setCustomers');
export const setProducts = argAsPayloadAction('setProducts');
export const initialLoadingDone = argAsPayloadAction('initialLoadingDone');
export const removeOrder = argAsPayloadAction('removeOrder');
export const placeOrder = argAsPayloadAction('placeOrder');
export const createOrder = argAsPayloadAction('createOrder');
export const alert = argAsPayloadAction('alert');
export const closeAlert = () => ({ type: 'closeAlert' });
export const updateOrder = (changeSet, { id }) => ({
    type: 'updateOrder',
    payload: { id, ...changeSet }
});
