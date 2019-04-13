import React, { Component } from "react";
import Uploader from "../Uploader/Uploader";
import Modal from "react-responsive-modal";

class Closet extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div>Hello Closet</div>
        <button onClick={() => this.props.history.push("closet/upload")}>
          Add Shoe
        </button>
      </div>
    );
  }
}

export default Closet;
