import React from 'react';
import Header from '../Header';
import OrderForm from '../OrderForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrderById } from '../../selectors';
import { updateOrder } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
    order: getOrderById(state, ownProps.match.params.id)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ updateOrder }, dispatch);

class PageEditOrder extends React.Component {
    render() {
        const content = this.props.order ?
            <OrderForm order={this.props.order} onSubmit={this.props.updateOrder} /> :
            <p className="alert alert-secondary">This order does not seem to exist.</p>;

        return <div>
            <Header text="Edit order" />
            {content}
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEditOrder);
