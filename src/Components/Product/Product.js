import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';





const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    height: "20rem",
    width: "20rem"
  },
  description: {
    width: "100%",
    height: "20rem",
    textAlign: "left"
  },

  image: {
    width: "15rem",
    marginTop: "25%"
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});


function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Product = props => {
  const { classes } = props;

  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [dense=false, setDense] = useState("");
  const [secondary = false, setSecondary] = useState("")

  useEffect(() => {
    getShoe();
  }, []);

  const getShoe = async () => {
    const shoe_id = props.match.params.shoe_id;
    const response = await axios.get(`/api/shoes/${shoe_id}`);
    setModel(response.data[0].shoe_model);
    setDescription(response.data[0].description);
    setImage1(response.data[0].image_1_url);
    setImage2(response.data[0].image_2_url);
    setImage3(response.data[0].image_3_url);
    setImage4(response.data[0].image_4_url);
    console.log(response.data[0]);
  };

  return (
    <div>
      <div className={classes.root}>
            <Paper className={classes.paper}>
              <img className={classes.image} src={image1} alt={model} />
            </Paper>
            <Paper className={classes.paper}>
              <img className={classes.image} src={image2} alt={model} />
            </Paper>
            <Paper className={classes.paper}>
              <img className={classes.image} src={image3} alt={model} />
            </Paper>
            <Paper className={classes.paper}>
              <img className={classes.image} src={image4} alt={model} />
            </Paper>
            <Paper className={classes.description}>
              <Typography variant="h5" component="h3">
                {model}
              </Typography>
              <Typography component="p">{description}</Typography>
            </Paper>
            <Paper className={classes.description}>
              <Typography variant="h5" component="h3">
                users selling this shoe
              </Typography>
                <Typography variant="h6" className={classes.title}>
                  Icon with text
                </Typography>
                <div className={classes.demo}>
                  <List dense={dense}>
                    { generate(
                      <ListItem>
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Single-line item"
                          secondary={secondary ? "Secondary text" : null}
                        />
                      </ListItem>
                    )}
                  </List>
                </div>
            </Paper>
      </div>
    </div>
  );
};

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
