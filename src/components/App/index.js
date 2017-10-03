import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import history from '../../history';
import PageOrders from '../PageOrders';
import PageEditOrder from '../PageEditOrder';
import PageCreateOrder from '../PageCreateOrder';
import Alert from '../Alert';
import { closeAlert } from '../../actions';

const mapStateToProps = state => ({
    loading: state.loadingInitialData,
    alert: state.alert
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ closeAlert }, dispatch);

class App extends React.Component {
    getAlert() {
        if (this.props.alert) {
            return <Alert message={this.props.alert} onClose={this.props.closeAlert} />;
        }
    }

    render() {
        const alert = this.getAlert();

        if (this.props.loading) {
            return <div>
                {alert}
                <p>Loading...</p>
            </div>;
        }

        return <ConnectedRouter history={history}>
            <div className="container">
                {alert}
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/orders" />} />
                    <Route exact path="/orders" component={PageOrders} />
                    <Route exact path="/orders/create" component={PageCreateOrder} />
                    <Route path="/orders/:id" component={PageEditOrder} />
                </Switch>
            </div>
        </ConnectedRouter>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
