import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/Checkoutsummary";
import ContactData from "./ContactData/ContactData";
import { Redirect } from "react-router-dom";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: null,
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect path="/" />;
    if (this.props.ings) {
    
      const purchaseRedirect = this.props.purchased ? <Redirect path="/" /> : null;
      summary = (
        <div>
        { purchaseRedirect } 
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
       
      );
    }
    return summary;
  }
}

const mapStatetoProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};



export default connect(mapStatetoProps)(Checkout);
