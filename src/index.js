import React from 'react';
import store from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
