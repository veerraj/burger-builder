import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/burgerBuilder";
import * as action from "../../store/actions/order";
import * as authaction from "../../store/actions/auth";

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  //     this.state = {

  //     }
  // }

  state = {
    // ingredients: null,
    purchasable: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }else{
       this.props.onSetAuthRedirectPath('/checkout')
       this.props.history.push('/auth')
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((iKey) => {
        return ingredients[iKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    // {salad:true,meat:false ...}
    let burgerControl = <Spinner />;
    let orderSummary = null;
    if (this.props.ings) {
      burgerControl = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disableInfo}
            price={this.props.totalPrice}
            isAuth={this.props.isAuthenticated}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          continued={this.purchaseContinueHandler}
          canceled={this.purchaseCancelHandler}
          price={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burgerControl}
      </Aux>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onIngredientAdd: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
    onInitPurchase: () => dispatch(action.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(authaction.setAuthRedirectPath(path))
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(BurgerBuilder);
