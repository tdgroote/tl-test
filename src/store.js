import { createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
// import { createLogger } from 'redux-logger';
import reduceReducers from 'reduce-reducers';

import reducer from './reducer';
import history from './history';
import apiMiddleware from './middleware/api';
import locationMiddleware from './middleware/location';

export default createStore(
    reduceReducers(reducer, routerReducer),
    applyMiddleware(
        apiMiddleware,
        locationMiddleware,
        routerMiddleware(history)
        // createLogger()
    )
);
