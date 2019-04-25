import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import logo from '../../image/logo-black.png'

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
        {/* <div
          style={{
            backgroundColor: "#ffffff",
            height: "33%",
            width: "50%",
            color: "#000000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
        </div> */}
          <img
            src={logo}
            alt=""
            style={{ width: "60%", marginTop: '6rem', transform: 'rotate(-3deg)'}}
          />
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
          style={{fontWeight:'bold', fontSize:'2rem', textShadow:'2px 2px #000000'}}
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
        <Typography 
          variant="body2" color="inherit" 
          className={classes.more}
          style={{fontWeight:'bold', fontSize:'1.5rem', textShadow:'2px 2px #000000'}}
          >
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
