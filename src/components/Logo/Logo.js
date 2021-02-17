import React from 'react'

import classes from './Logo.module.css';

import logo from '../../assets/logo.png';

const Logo = (props) => (
     <div className={classes.Logo}>
         <img src={logo} alt="MyBurger"/>
     </div>
);

export default Logo;