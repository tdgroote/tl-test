import React from 'react';
import Header from '../Header';
import OrderList from '../OrderList';

class PageOrders extends React.Component {
    render() {
        return <div>
            <Header text="Pending orders" />
            <OrderList />
        </div>;
    }
}

export default PageOrders;
