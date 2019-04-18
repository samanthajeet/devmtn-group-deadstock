import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";

class TextFieldForm extends Component {
  state = {
    shoeSize: "",
    shoeDetails: "",
    sellingPrice: "",
    boughtPrice: "",
    isForSale: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleForSale = value => {
    this.setState({
      isForSale: value
    });
  };

  handleSubmitUpload = () => {
    console.log("hit submit", this.state, this.props);

    if (
      this.props.shoe &&
      this.props.images.length == 4 &&
      this.state.shoeSize != "" &&
      this.state.shoeDetails != "" &&
      this.state.sellingPrice != "" &&
      this.state.boughtPrice != "" &&
      this.state.isForSale != ""
    ) {
      let { shoe, images } = this.props;
      let { shoe_id } = shoe;

      let {
        shoeSize,
        shoeDetails,
        sellingPrice,
        boughtPrice,
        isForSale
      } = this.state;
      console.log("hit submit");
      console.log("shoe:", this.props.shoe);
      axios.post("/api/closet/addshoe", {
        shoe_id,
        images,
        shoe,
        shoeDetails,
        sellingPrice,
        boughtPrice,
        isForSale
      });
    } else {
      alert(" please add all info");
    }

    // axios.post("/api/closet/addShoe", {});
  };

  render() {
    const { classes } = this.props;

    return (
      <form
        noValidate
        autoComplete="off"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <FormLabel component="legend">Is your shoe for sale?</FormLabel>
            <RadioGroup style={{ margin: 0 }}>
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Yes"
                onClick={() => this.handleForSale(true)}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                onClick={() => this.handleForSale(false)}
                label="No"
              />
            </RadioGroup>
            <TextField
              id="standard-multiline-fixed"
              label="Shoe Details"
              multiline
              rows={3}
              value={this.state.multiline}
              onChange={this.handleChange("shoeDetails")}
              style={{ marginTop: "10px", width: "90%" }}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <TextField
              id="standard-number"
              label="Shoe Size"
              value={this.state.shoeSize}
              onChange={this.handleChange("shoeSize")}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />

            <TextField
              id="standard-number"
              label="Bought Price (Dollars)"
              value={this.state.boughtPrice}
              onChange={this.handleChange("boughtPrice")}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />

            <TextField
              id="standard-number"
              label="Selling Price (Dollars)"
              value={this.state.sellingPrice}
              onChange={this.handleChange("sellingPrice")}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.handleSubmitUpload();
          }}
          style={{ width: "90%", marginTop: "3%", marginBottom: "2%" }}
        >
          Add Shoe to Closet
        </Button>
      </form>
    );
  }
}

// TextFieldForm.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default TextFieldForm;
