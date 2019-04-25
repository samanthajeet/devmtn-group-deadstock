import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Fade from '@material-ui/core/Fade';
import skull from "../Landing/image/skull-white.png";
import Avatar from "@material-ui/core/Avatar";


const Progress = styled.div`
  color: white;
  margin-top: 25rem;
`;

const SkullProgress = styled.div`
  animation-name: spin;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-around",
    width: "100%"
  },
  close: {
    padding: theme.spacing.unit / 2
  },

  demo: {
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    height: "20rem",
    width: "20rem",
    margin: "0.5rem"
  },
  description: {
    width: "30rem",
    textAlign: "left",
    margin: "0.5rem",
    padding: "0.5rem"
  },

  sellers: {
    width: "30rem",
    textAlign: "left",
    margin: "0.5rem",
    padding: "0.5rem"
  },

  image: {
    width: "18rem",
    marginTop: "25%"
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

// function generate(element) {
//   return [0, 1, 2].map(value =>
//     React.cloneElement(element, {
//       key: value
//     })
//   );
// }

const Product = props => {
  const { classes } = props;

  const [data, setData] = useState({ model: [] });
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [dense, setDense] = useState(false);
  const [secondary = false, setSecondary] = useState("");
  const [open = false, setOpen] = useState("");
  const [loading, setLoading] = useState("");
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    setLoading(true);
    getShoe();
    getSellers();
    console.log(props, 222)
  }, []);

  const getShoe = async () => {
    const shoe_id = props.match.params.shoe_id;
    const response = await axios.get(`/api/shoes/${shoe_id}`);
    await setData({ model: response.data[0].model });

    setModel(response.data[0].shoe_model);
    setBrand(response.data[0].brand);
    setYear(response.data[0].year_released);
    setPrice(response.data[0].price);
    setDescription(response.data[0].description);
    setImage1(response.data[0].image_1_url);
    setImage2(response.data[0].image_2_url);
    setImage3(response.data[0].image_3_url);
    setImage4(response.data[0].image_4_url);
    setLoading(false);

  };

  const getSellers= async() => {
    const shoe_id = props.match.params.shoe_id;
    const response = await axios.get(`/api/sellers/${shoe_id}`)
    setSellers(response.data)
  }

  function setComma(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const mappedSellers = sellers.map( seller => {
        return (
          <div className={classes.demo} key= {seller.user_id}>
          <List dense={dense}>
              <ListItem onClick={() => props.history.push(`/dashboard/closet/${seller.user_id}`)} >
                <Avatar src={seller.profile_pic}  />
                <ListItemText
                  primary={`${seller.first_name} ${seller.last_name}`}
                  secondary={`Selling for $${setComma(seller.sale_price)} OBO`}
                />
                
              </ListItem>
          </List>
        </div>
        )
      })
     
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {loading ? (
        <Progress>
          <SkullProgress>
            <img src={skull} alt="loading" />
              </SkullProgress>
            <p>LOADING</p>
        </Progress>
      ) : (
        <Fade in={true} 
        {...(true ? { timeout: 1000 } : {})}
        >
        <div className={classes.root}>
          <div style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              <Paper className={classes.paper}>
                <img className={classes.image} src={image1} alt={model} />
              </Paper>
              <Paper className={classes.paper}>
                <img className={classes.image} src={image2} alt={model} />
              </Paper>
            </div>
            <div style={{ display: "flex" }}>
              <Paper className={classes.paper}>
                <img className={classes.image} src={image3} alt={model} />
              </Paper>
              <Paper className={classes.paper}>
                <img className={classes.image} src={image4} alt={model} />
              </Paper>
            </div>
          </div>
          <div>
            <Paper className={classes.description}>
              <Typography variant="h4" component="h4">
                {model}
              </Typography>
              <Typography component="p" style={{ marginTop: "0.5rem" }}>
                Brand: {brand}
                <br />
                Release Year: {year}
                <br />
                Release Price: ${price}
                <br />
              </Typography>
              <Divider
                style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                variant="middle"
              />
              <Typography component="p"> {description} </Typography>
              <br />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => setOpen(true)}
              >
                <Icon className={classes.rightIcon}>add_shopping_cart</Icon>
                add to cart
              </Button>
            </Paper>
            <Paper className={classes.sellers}>
              <Typography variant="h5" component="h3">
                Sellers
              </Typography>
              {mappedSellers}
            </Paper>
          </div>
        </div>
        </Fade>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{model} added to cart</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
};

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
