import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} 
          isAuth = {this.props.isAuthenticated}
        />
       
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerHandler}
          isAuth = {this.props.isAuthenticated}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state =>{
    return {
       isAuthenticated:state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
