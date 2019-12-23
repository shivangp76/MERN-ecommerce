import React from "react";
import {
  NavLink
} from "react-router-dom";
import logo from "../../img/logo.png";

const Navbar = () => ( <
  div className = {
    `fixed-top`
  } >
  <
  div className = {
    `above-navbar d-none d-md-block`
  } >
  <
  h6 className = {
    `text-uppercase small-text text-right`
  } >
  ADDRESS <
  /h6> < /
  div > <
  nav className = {
    `navbar navbar-expand-sm navbar-light bg-light`
  } >
  <
  span className = {
    `navbar-brand`
  } >
  <
  NavLink to = "/" >
  <
  img src = {
    logo
  }
  alt = "Logo"
  style = {
    {
      width: "9rem"
    }
  }
  /> < /
  NavLink > <
  /span> <
  button className = {
    `navbar-toggler`
  }
  type = "button"
  data - toggle = "collapse"
  data - target = "#navbarNav"
  aria - controls = "navbarNav"
  aria - expanded = "false"
  aria - label = "Toggle navigation" >
  <
  span className = {
    `navbar-toggler-icon`
  }
  /> < /
  button > <
  div className = {
    `collapse navbar-collapse`
  }
  id = "navbarNav" >
  <
  span className = "nav navbar-nav ml-auto" >
  <
  span className = {
    `nav-item nav-link disabled d-sm-none`
  } >
  <
  h6 className = {
    `text-uppercase small-text`
  } >
  ADDRESS <
  /h6> < /
  span > <
  span className = {
    `nav-item nav-link`
  } >
  <
  NavLink to = "/" > Home < /NavLink> < /
  span > <
  span className = {
    `nav-item nav-link`
  } >
  <
  NavLink to = "/about-us/" > About Us < /NavLink> < /
  span > <
  span className = {
    `nav-item nav-link`
  } >
  <
  NavLink to = "/menu/" > Menu < /NavLink> < /
  span > <
  span className = {
    `nav-item nav-link`
  } >
  <
  NavLink to = "/cart/" > Cart < /NavLink> < /
  span > {
    /* <span className={`nav-item nav-link`}>
                <NavLink to="/checkout/">Checkout - remove this after</NavLink>
              </span> */
  } <
  /span> < /
  div > <
  /nav> < /
  div >
);

export default Navbar;