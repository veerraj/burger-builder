import React, { Component } from "react";
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class orderSummary extends Component{


   render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map((iKey) => {
      return (
        <li key={iKey}>
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {iKey}
          </span>
          : {this.props.ingredients[iKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delecious burger with following ingredients :</p>
        <ul>{ingredientSummary}</ul>
        <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout</p>
        <Button btnType="Danger" clicked={this.props.canceled}>CANCEL</Button>
        <Button btnType="Success"  clicked={this.props.continued}>CONTINUE</Button>
      </Aux>
    )
   }
};

export default orderSummary;
