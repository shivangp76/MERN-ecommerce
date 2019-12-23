import React, {
  Component
} from "react";
import {
  Link
} from "react-router-dom";

const reviews = [
  [
    "Beverly",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora consequatur necessitatibus incidunt velit iste odit nulla maxime, rerum aperiam quod sed similique est voluptatum culpa magnam eaque voluptate consequuntur harum."
  ],
  [
    "Stephen",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora consequatur necessitatibus incidunt velit iste odit nulla maxime, rerum aperiam quod sed similique est voluptatum culpa magnam eaque voluptate consequuntur harum."
  ],
  [
    "Janet",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora consequatur necessitatibus incidunt velit iste odit nulla maxime, rerum aperiam quod sed similique est voluptatum culpa magnam eaque voluptate consequuntur harum."
  ]
];

class Home extends Component {
  render() {
    return ( <
      div >
      <
      section className = {
        `banner-area`
      } >
      <
      div className = {
        `overlay`
      }
      /> <
      div className = {
        `container`
      } >
      <
      div className = {
        `row px-2`
      } >
      <
      div className = {
        `col-12 mx-auto`
      } >
      <
      h6 className = {
        `text-uppercase small-text`
      } > BUSINESS_NAME < /h6> <
      h1 className = {
        `main-line mb-3`
      } > Love Food ? < /h1> <
      h5 className = {
        `text-white pb-4 font-weight-normal`
      } >
      Visit Us!Since 20..BUSINESS_NAME has been a real crowd pleaser with its fine...BUSINESS_NAME always finds a way to keep you coming back
      for more!
      <
      /h5> <
      Link to = "/menu/" >
      <
      button className = {
        `primary-btn text-uppercase mt-10`
      } >
      Check Our Menu <
      /button> < /
      Link > <
      /div> < /
      div > <
      /div> < /
      section > <
      section className = {
        `bg-white fix-background py-5`
      } >
      <
      div className = {
        `container`
      } >
      <
      div className = {
        `row px-3`
      } >
      <
      div className = {
        `col-lg-9`
      } >
      <
      h6 className = {
        `text-uppercase small-text`
      } >
      Brand new location <
      /h6> <
      h1 className = {
        `my-3`
      } >
      BUSINESS_NAMEs slogan goes here < /
      h1 > <
      p >
      Our Goal is to provide healthy and delcious food in a clean and friendly environment. <
      /p> <
      p >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temp or incididunt ut labore
      et dolore magna aliqua.Ut enim ad minim.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temp or
      incididunt ut labore et dolore magna aliqua.Ut enim ad minim. <
      /p> <
      Link to = "/menu/" >
      <
      button className = {
        `primary-btn text-uppercase mx-auto mt-20`
      } >
      Get Started Now <
      /button> < /
      Link > <
      /div> < /
      div > <
      /div> < /
      section > <
      section className = {
        `review-area position-relative py-5`
      } >
      <
      div className = {
        `overlay`
      }
      /> <
      div className = {
        `container fix-background pt-3`
      } >
      <
      div className = {
        `row text-white`
      } >
      <
      div className = {
        `px-3 mx-auto text-center`
      } >
      <
      h1 className = {
        `text-white`
      } > Enjoy our Client’ s Review < /h1> <
      p > Who are extremely in love with our food. < /p> < /
      div > <
      /div> <
      div className = {
        `row text-white`
      } > {
        reviews.map((review, index) => ( <
          div key = {
            index
          }
          className = {
            `my-3 px-4`
          } >
          <
          div className = {
            `title`
          } >
          <
          h4 className = {
            `text-white`
          } > {
            review[0]
          } < /h4> <
          div className = {
            `star`
          } >
          <
          span className = {
            `fa fa-star checked text-warning`
          }
          /> <
          span className = {
            `fa fa-star checked text-warning`
          }
          /> <
          span className = {
            `fa fa-star checked text-warning`
          }
          /> <
          span className = {
            `fa fa-star checked text-warning`
          }
          /> <
          span className = {
            `fa fa-star checked text-warning`
          }
          /> < /
          div > <
          /div> <
          p className = {
            `text-white`
          } > {
            review[1]
          } < /p> < /
          div >
        ))
      } <
      /div> < /
      div > <
      /section> < /
      div >
    );
  }
}

export default Home;