import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux"

//Components
import NavProfile from "./NavProfile";

//Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

class Header extends Component {
  render() {
    const classes = this.props.classes;
    const authenticated = this.props.authenticated;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="nav-container">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Docs
          </Typography>
          {!authenticated ? (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Fragment>
          ) : (
            <NavProfile />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, {})(Header);
