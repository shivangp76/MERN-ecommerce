import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/categoryActions";

class Menu extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  chunk(arr, chunkSize = 1, cache = []) {
    const tmp = [...arr];
    if (chunkSize <= 0) return cache;
    while (tmp.length) cache.push(tmp.splice(0, chunkSize));
    return cache;
  }

  render() {
    return (
      <div>
        <section className={`banner-area`}>
          <div className={`overlay`} />
          <div className={`container`}>
            <div className={`row`}>
              <div className={`col-12 mx-auto`}>
                <h1 className={`text-white`}>Menu</h1>
                <p className={`link-nav`}>
                  <Link to="/">
                    <span className={`text-white`}>Home </span>
                  </Link>
                  >>
                  <Link to="/menu/">
                    <span className={`text-white`}> Menu</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={`bg-white fix-background pb-5`}>
          <div className={`container`}>
            {this.chunk(this.props.categories, 3).map((c_categories, i) => (
              <div className={`row`} key={i}>
                {c_categories.map(category => (
                  <div className={`col-md-4 p-4`} key={category._id}>
                    <Link to={"/menu/" + category._id}>
                      <div className={`card mx-auto border-secondary`}>
                        <img
                          className={`card-img-top`}
                          src={
                            process.env.PUBLIC_URL + "/images/" + category.image
                          }
                          alt={category.title}
                        />
                        <div className={`card-body`}>
                          <h5 className={`card-title text-center`}>
                            {category.title}
                          </h5>
                          <p className={`card-text`}>{category.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

Menu.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories.categories
});

export default connect(
  mapStateToProps,
  { fetchCategories }
)(Menu);
