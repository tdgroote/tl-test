import reducer from '../';

const action = (type, payload) => ({ type, payload });

describe('reducer', () => {
    it('initializes the state', () => {
        expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('updates the loading state', () => {
        const state = { loadingInitialData: true };
        const expected = false;
        const result = reducer(state, action('initialLoadingDone'));

        expect(result.loadingInitialData).toEqual(expected);
    });

    it('sets products', () => {
        const state = {
            products: [1, 2, 3]
        };
        const expected = [3, 4, 5];
        const result = reducer(state, action('setProducts', [3, 4, 5]));

        expect(result.products).toEqual(expected);
    });

    it('sets customers', () => {
        const state = {
            customers: [1, 2, 3]
        };
        const expected = [3, 4, 5];
        const result = reducer(state, action('setCustomers', [3, 4, 5]));

        expect(result.customers).toEqual(expected);
    });

    it('sets orders', () => {
        const state = {
            orders: [1, 2, 3]
        };
        const expected = [3, 4, 5];
        const result = reducer(state, action('setOrders', [3, 4, 5]));

        expect(result.orders).toEqual(expected);
    });

    it('removes orders', () => {
        const state = {
            orders: [{ id: 1 }, { id: 2 }, { id: 3 }]
        };
        const expected = [{ id: 1 }, { id: 3 }];
        const result = reducer(state, action('removeOrder', 2));

        expect(result.orders).toEqual(expected);
    });

    it('places orders', () => {
        const state = {
            orders: [{ id: 1 }, { id: 2 }, { id: 3 }]
        };
        const expected = [{ id: 1 }, { id: 2 }];
        const result = reducer(state, action('placeOrder', 3));

        expect(result.orders).toEqual(expected);
    });

    it('creates new orders', () => {
        const state = {
            orders: [{ id: 1 }, { id: 2 }]
        };
        const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const result = reducer(state, action('createOrder', {id: 3}));

        expect(result.orders).toEqual(expected);
    });

    it('updates orders', () => {
        const state = {
            orders: [{ id: 1 }, { id: 2 }, { id: 3 }]
        };
        const expected = [{ id: 1 }, { id: 2, newField: 'newValue' }, { id: 3 }];
        const result = reducer(state, action('updateOrder', {
            id: 2,
            newField: 'newValue'
        }));

        expect(result.orders).toEqual(expected);
    });

    it('alerts', () => {
        const state = {};
        const expected = 'message';
        const result = reducer(state, action('alert', 'message'));
        expect(result.alert).toEqual(expected);
    });

    it('closes alerts', () => {
        const state = { alert: 'message' };
        const expected = '';
        const result = reducer(state, action('closeAlert'));
        expect(result.alert).toEqual(expected);
    });
});
