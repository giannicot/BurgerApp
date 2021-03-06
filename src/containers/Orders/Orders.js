import React, { Component } from 'react';
import {connect} from 'react-redux'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders()
    }

    render () {
        console.log(this.props)
        let orders = <Spinner />
        if (!this.props.loading) {
           orders = this.props.order.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

const mapStateToProps = state => {
    return {
        order: state.order.orders,
        loading: state.order.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));