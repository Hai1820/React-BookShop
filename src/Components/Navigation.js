import {
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/index";
class Navigation extends Component {
  logOut = () => {
    this.props.logoutUser();
  };
  render() {
    const guestLinks = (
      <>
        <div className="mr-auto"></div>
        <Nav className="navbar-right">
          <Link to={"register"} className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} />
            Register
          </Link>
          <Link to={"login"} className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} />
            Login
          </Link>
        </Nav>
      </>
    );
    const userLinks = (
      <>
        <Nav className="mr-auto">
          <Link className="navbar-brand" to="/add">
            Add book
          </Link>
          <Link className="navbar-brand" to="/list">
            Book List
          </Link>
          <Link className="navbar-brand" to="/users">
            User List
          </Link>
        </Nav>
        <Nav className="navbar-right">
          <Link to={"logout"} className="nav-link" onClick={this.logOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            logout
          </Link>
        </Nav>
      </>
    );
    return (
      <Navbar bg="dark" variant="dark">
        <Link to="" className="navbar-brand" href="/">
          Book Store
        </Link>
        {this.props.auth.isLoggedIn ? userLinks : guestLinks}
      </Navbar>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
