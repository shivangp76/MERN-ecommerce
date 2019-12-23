import React, { Component } from "react";
import { Link } from "react-router-dom";

class Error extends Component {
  render() {
    try {
      return (
        <div>
          <div>
            <section className={`banner-area`}>
              <div className={`overlay`} />
              <div className={`container`}>
                <div className={`row`}>
                  <div className={`col-12 mx-auto`}>
                    <h1 className={`text-white`}>
                      {this.props.location.state.title}
                    </h1>
                    <p className={`link-nav`}>
                      <Link to="/">
                        <span className={`text-white`}>Home </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className={`bg-white fix-background pb-5`}>
              <div className="container py-5">
                <h2>{this.props.location.state.message}</h2>
              </div>
            </section>
          </div>
        </div>
      );
    } catch (e) {
      return (
        <div>
          <div>
            <section className={`banner-area`}>
              <div className={`overlay`} />
              <div className={`container`}>
                <div className={`row`}>
                  <div className={`col-12 mx-auto`}>
                    <h1 className={`text-white`}>{"Page Not Found"}</h1>
                    <p className={`link-nav`}>
                      <Link to="/">
                        <span className={`text-white`}>Home </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className={`bg-white fix-background pb-5`}>
              <div className="container py-5">
                <h2>{"404 Error"}</h2>
              </div>
            </section>
          </div>
        </div>
      );
    }
  }
}

export default Error;
