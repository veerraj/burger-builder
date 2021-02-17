import React from "react";
import {withRouter} from 'react-router-dom'

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  let transformIngredients = Object.keys(props.ingredients).map((ikey) => {
    return [...Array(props.ingredients[ikey])].map((_, i) => {
      return <BurgerIngredient key={ikey + i} type={ikey} />;
    });
  }).reduce((arr,el)=>{
       return arr.concat(el)
  },[]);

  if(transformIngredients.length === 0){
        transformIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
       {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
