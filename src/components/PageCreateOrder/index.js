import React from 'react';
import Header from '../Header';
import OrderForm from '../OrderForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createOrder } from '../../actions';

const mapDispatchToProps = dispatch =>
    bindActionCreators({ createOrder }, dispatch);

class PageCreateOrder extends React.Component {
    render() {
        return <div>
            <Header text="Create new order" />
            <OrderForm onSubmit={this.props.createOrder} />
        </div>;
    }
}

export default connect(undefined, mapDispatchToProps)(PageCreateOrder);
