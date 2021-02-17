import React from "react";
import Aux from "../../../hoc/Aux";
import Logo from "../../Logo/Logo";
import BackDrop from "../../UI/BackDrop/BackDrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.responsive}>
          <div>
            <Logo />
          </div>
          <nav>
            <NavigationItems isAuthenticated={props.isAuth} />
          </nav>
        </div>
      </div>
    </Aux>
  );
};

export default sideDrawer;
