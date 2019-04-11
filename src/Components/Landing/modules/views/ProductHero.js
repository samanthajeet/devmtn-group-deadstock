import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const backgroundImage =
  "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing.unit * 10
    }
  },
  more: {
    marginTop: theme.spacing.unit * 2
  }
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout>
      {/* backgroundClassName={classes.background} */}
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: "none" }} src={backgroundImage} alt="" />
      {/* <Typography color="inherit" align="center" variant="h2" marked="center">
        DEADSTOCK
      </Typography> */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          width: "100%",
          height: "85vh",
          minHeight: "500",
          maxHeight: "1300",
          marginTop: "70",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"
          alt=""
          style={{ width: "25%", margin: 0 }}
        /> */}
        <div
          style={{
            backgroundColor: "#ffffff",
            height: "33%",
            width: "33%",
            color: "#000000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          DEADSTOCK LOGO GOES HERE
        </div>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
        >
          A Sneakerhead Community
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component={linkProps => (
            <Link {...linkProps} href="/#/register" variant="button" />
          )}
        >
          Register
        </Button>
        <Typography variant="body2" color="inherit" className={classes.more}>
          Discover the experience
        </Typography>
      </div>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
