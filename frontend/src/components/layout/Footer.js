import React from "react";
import moment from "moment";

const Footer = () => ( <
  footer className = {
    `footer-area section-gap py-5`
  } >
  <
  div className = {
    `container`
  } >
  <
  div className = {
    `row text-white`
  } >
  <
  div className = {
    `col-lg-4`
  } >
  <
  h5 className = {
    `text-white pb-3`
  } > Contact Us < /h5> <
  p > (111) 111 - 1111 < /p> <
  p >
  Website developed by {
    " "
  } <
  a href = "http://www.shivangp.com/"
  style = {
    {
      color: "white"
    }
  } > {
    " "
  }
  Shivang Patel <
  /a>
  . <
  br / >
  Copyright & copy; {
    moment().year()
  } | All rights reserved <
  br / >
  This template was made by colorlib.com <
  /p> <
  br / >
  <
  /div> <
  div className = {
    `offset-lg-4 col-lg-4`
  } >
  <
  h5 className = {
    `text-white pb-3`
  } > Location and Hours < /h5> <
  p >
  ADDRESS <
  br / >
  ADDRESS <
  /p> <
  p >
  Sunday: 12 am to 12 pm <
  br / >
  Monday: 12 am to 12 pm <
  br / >
  Tuesday: 12 am to 12 pm <
  br / >
  Wednesday: 12 am to 12 pm <
  br / >
  Thursday: 12 am to 12 pm <
  br / >
  Friday: 12 am to 12 pm <
  br / >
  Saturday: 12 am to 12 pm <
  /p> < /
  div > <
  /div> < /
  div > <
  /footer>
);

export default Footer;