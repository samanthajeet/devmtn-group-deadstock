import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import logo from '../../image/logo-white.png';
import whiteskull from '../../image/skull-white.png'

const styles = theme => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-around"
  },
  left: {
    width: '20%',
    display: "flex",
    justifyContent: "flex-start"
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  ceter: {
    width: '60%'
  },
  right: {
    width: '20%',
    display: "flex",
    justifyContent: "space-around"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
        <div className={classes.left}>
        <img src={whiteskull} 
              style={{
                width: '15%',
                height: '80%'
              }}
              />
        </div>
          <div className={classes.center} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            // className={classes.title}
            className="test-css"
            href="/"
          >
            {<img src={logo} 
              style={{
                width: '15%'
              }}/>}

          </Link>
          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="/#/login"
            >
              {"Sign In"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={classes.rightLink}
              // className={classNames(classes.rightLink, classes.linkSecondary)}
              href="/#/register"
            >
              {"Register"}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
