import React from 'react';
import { connect } from 'react-redux';
import { combineObjs } from '../../util';
import { omit } from 'lodash';

const mapStateToProps = (state, ownProps) => ({
    customers: state.customers,
    products: state.products,
    order: ownProps.order,
    onSubmit: ownProps.onSubmit
});

const propsToFormState = ({ order, customers }) => ({
    'customer-id': order ? order['customer-id'] : customers[0].id,
    items: !order ? {} : order.items.reduce(
        (items, item) => combineObjs(items, {
            [item['product-id']]: item.quantity
        }),
        {}
    )
});

class OrderForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = propsToFormState(props);

        this.onCustomerChange = this.onCustomerChange.bind(this);
        this.onProductQuantityChange = this.onProductQuantityChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onCustomerChange({ target }) {
        this.setState({
            ['customer-id']: target.value
        });
    }

    onProductQuantityChange({ target }) {
        const { value, id } = target;
        const { items } = this.state;
        let newItems;

        if (!value || value === '0') {
            newItems = omit(items, id);
        } else {
            newItems = combineObjs(items, {
                [id]: value
            });
        }

        this.setState({
            items: newItems
        });
    }

    onSubmit(event) {
        this.props.onSubmit(this.state, this.props.order);
        event.preventDefault();
    }

    getCustomerOptions() {
        return this.props.customers.map(customer =>
            <option key={customer.id} value={customer.id}>
                {customer.name}
            </option>
        );
    }

    getProductOptions() {
        return this.props.products.map(product => {
            const quantity = this.state.items[product.id] || 0;
            const total = (Number(product.price) * quantity).toFixed(2);

            return <li key={product.id} className="list-group-item">
                <label htmlFor={product.id}>{product.description}</label>
                <div className="float-right">
                    <input id={product.id} onChange={this.onProductQuantityChange} type="number" min="0" value={quantity} /> x {product.price} = {total}
                </div>
            </li>;
        });
    }

    render() {
        return <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="customer">Customer</label>
                <select id="customer" className="form-control" onChange={this.onCustomerChange} value={this.state['customer-id']}>
                    {this.getCustomerOptions()}
                </select>
            </div>
            <div className="form-group">
                <label>Products</label>
                <ul className="list-group">
                    {this.getProductOptions()}
                </ul>
            </div>
            <input className="btn btn-primary" type="submit" value="Save order" />
        </form>;
    }
}

export default connect(mapStateToProps)(OrderForm);
