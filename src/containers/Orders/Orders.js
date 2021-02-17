import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import * as action from "../../store/actions/order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token,this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p style={{textAlign:'center'}}>{this.props.error}</p>;
    }
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return (
      <div>
        {errorMessage}
        {orders}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token:state.auth.token,
    userId:state.auth.userId
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onFetchOrders: (token,userId) => dispatch(action.fetchOrders(token,userId)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Orders);
