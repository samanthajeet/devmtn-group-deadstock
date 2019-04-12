import React, { Component } from "react";

export default class SearchItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      shoe_id,
      shoe_model,
      brand,
      colorway,
      image_1_url
    } = this.props.shoe;
    return (
      <div
        style={{
          display: "flex",
          margin: "2px",
          borderBottom: "solid 1px rgba(0, 0, 0, .2) "
        }}
        onClick={() => this.props.handleSelectedShoe(this.props.shoe)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={image_1_url}
            height="20px"
            width="20px"
            style={{ marginRight: "5px" }}
          />
        </div>

        <div style={{ flexDirection: "column" }}>
          <div style={{ fontSize: ".8rem" }}>
            {brand} {shoe_model}
          </div>
          <div style={{ fontSize: ".5rem" }}>{colorway}</div>
        </div>
      </div>
    );
  }
}
