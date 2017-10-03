import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrders } from '../../selectors';
import { removeOrder, placeOrder } from '../../actions';
import { Link } from 'react-router-dom';
import { PROMPT_PLACE, PROMPT_REMOVE } from '../../constants';

const mapStateToProps = state => ({
    orders: getOrders(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ removeOrder, placeOrder }, dispatch);

class OrderList extends React.Component {
    onRemoveClick(orderId) {
        if (window.confirm(PROMPT_REMOVE)) {
            this.props.removeOrder(orderId);
        }
    }

    onPlaceClick(orderId) {
        if (window.confirm(PROMPT_PLACE)) {
            this.props.placeOrder(orderId);
        }
    }

    getOrders() {
        return this.props.orders.map(order => {
            const orderItems = order.items.map(item => {
                return <li key={item['product-id']} className="list-group-item">
                    {item.name}: {item.quantity} x {item['unit-price']} = {item.total}
                </li>;
            });

            return <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.items.length ? <ul className="list-group">{orderItems}</ul> : 'This order has no items.'}</td>
                <td>{order.total}</td>
                <td>
                    <div className="btn-group btn-group-sm">
                        <button className="btn btn-success" onClick={() => this.onPlaceClick(order.id)}>Place</button>
                        <Link className="btn btn-primary" to={'/orders/' + order.id}>Edit</Link>
                        <button className="btn btn-danger" onClick={() => this.onRemoveClick(order.id)}>Remove</button>
                    </div>
                </td>
            </tr>;
        });
    }

    getOrderTable() {
        return <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>{this.getOrders()}</tbody>
        </table>;
    }

    render() {
        let content;

        if (!this.props.orders.length) {
            content = <p className="alert alert-secondary">There are no open orders at this time.</p>;
        } else {
            content = this.getOrderTable();
        }

        return <div>
            {content}
            <Link className="btn" to={'/orders/create'}>Create new</Link>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
