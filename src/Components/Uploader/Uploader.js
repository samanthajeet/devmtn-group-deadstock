import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { v4 as randomString } from "uuid";
import axios from "axios";
import SearchItem from "./SearchItem";
import { OutlinedInput } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TextFieldForm from "./TextFieldForm";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      products: [],
      selectedShoe: "",
      boolean: true,
      clickedShoe: ""
    };
  }

  componentDidMount() {
    this.getStore();
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false
    });
    this.getSignedRequest(files);
  }

  getStore = async () => {
    let shoes = await axios.get("/api/shoes");
    this.setState({
      products: shoes.data
    });
  };

  getSignedRequest = files => {
    const images = [];
    files.map(file => {
      let fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;
      axios
        .get("/api/signs3", {
          params: {
            "file-name": fileName,
            "file-type": file.type
          }
        })
        .then(response => {
          const { signedRequest, url } = response.data;

          this.uploadFile(file, signedRequest, url, images);
        });
    });
  };

  uploadFile = async (file, signedRequest, url, images) => {
    console.log('upload file hit',file)
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options).then(response => {});
    images.push(url);
    this.setState({ files: images });
  };

  handleSelectedShoe = shoe => {
    this.setState({
      clickedShoe: shoe
    });
  };

  handleSwitchToCloset = async () => {
    await this.setState({ boolean: false });

    setTimeout(() => {
      this.props.history.push("/dashboard/closet");
    }, 500);
  };

  render() {
    const hello = "hello";
    const { classes } = this.props;
    const mappedProducts = this.state.products
      .filter(shoe => {
        const { selectedShoe } = this.state;
        const splitString = selectedShoe.toLowerCase().split(" ");

        for (let i = 0; i < splitString.length; i++) {
          const term = splitString[i];
          if (
            !shoe.brand.toLowerCase().includes(term) &&
            !shoe.shoe_model.toLowerCase().includes(term)
          ) {
            return false;
          }
        }
        return true;
      })
      .map(shoe => {
        return (
          <SearchItem
            key={shoe.shoe_id}
            shoe={shoe}
            handleSelectedShoe={this.handleSelectedShoe}
          />
        );
      });
    const img = this.state.files.map(image => {
      return (
        <>
          <img
            src={image}
            alt="shoe"
            style={{ height: "100px", width: "100px", marginTop: 0 }}
          />
        </>
      );
    });
    return (
      <Grow in={this.state.boolean}>
        <div
          style={{
            display: "flex",
            height: "calc(100% - 64px)",
            justifyContent: "space-evenly",
            padding: "1%"
          }}
        >
          <Paper
            elevation={5}
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              alignItems: "center",
              position: "relative",
              backgroundImage: "linear-gradient(black, #26f7ff)"
            }}
          >
            <button
              style={{
                position: "absolute",
                right: ".2%",
                top: "-1%",
                background: "transparent",
                border: "none",
                outline: "none"
              }}
              onClick={() => {
                this.handleSwitchToCloset();
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bolder"
                }}
              >
                Close
              </h1>
            </button>
            <Paper
              elevation={10}
              style={{
                height: "80vh",
                width: "40%"
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  borderBottom: "solid 1px rgba(0, 0, 0, .2)",
                  alignItems: "center",
                  boxSizing: "border-box"
                }}
              >
                <TextField
                  id="outlined-search"
                  label="Search for your shoe"
                  type="search"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  placeholder="Find and select a shoe"
                  value={this.state.selectedShoe}
                  onChange={e =>
                    this.setState({
                      selectedShoe: e.target.value.toLowerCase()
                    })
                  }
                  style={{ width: "93%" }}
                  padding={0}
                />
              </div>
              <div
                style={{
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  overflow: "scroll",
                  height: "calc(99% - 81px)"
                }}
              >
                {mappedProducts}
              </div>
            </Paper>

            <Paper
              elevation={10}
              style={{
                // flexDirection: "column",
                width: "40%",
                // alignItems: "center",
                // justifyContent: "center",
                height: "80vh",
                overflow: "scroll"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                  overflow: "scroll"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    minHeight: "81px",
                    maxHeight: "81px",
                    borderBottom: "solid 1px rgba(0, 0, 0, .2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <h3 style={{ margin: "0", padding: "0" }}>
                    Tell Us About Your Shoe
                  </h3>
                </div>
                <div style={{ width: "90%", marginTop: "2%" }}>
                  <SearchItem shoe={this.state.clickedShoe} />
                </div>
                {/* <div
                  style={{
                    width: "200px",
                    display: "flex",
                    border: "dashed 1px black",
                    height: "200px",
                    flexWrap: "wrap"
                  }}
                >
                  <div>{img}</div>
                </div> */}
                {/* <Button onClick={this.handleOpen.bind(this)}>Add Image</Button> */}
                <div
                  style={{
                    width: "90%"
                  }}
                >
                  <DropzoneArea
                    align="center"
                    // open={this.state.open}
                    onChange={this.handleSave.bind(this)}
                    filesLimit={4}
                    acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                    showPreviews={false}
                    maxFileSize={10000000}
                    // onClose={this.handleClose.bind(this)}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3%"
                  }}
                >
                  <TextFieldForm />
                </div>
              </div>
            </Paper>
          </Paper>
        </div>
      </Grow>
    );
  }
}

Uploader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Uploader);
