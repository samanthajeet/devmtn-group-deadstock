import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
// import Uploader from "../Uploader/Uploader";
// import Modal from "react-responsive-modal";

class Closet extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      user_shoes:[]
    };
  }

  componentDidMount(){
    this.getCloset()
  }

  getCloset= async() => { 
    let {user_id} = this.props
    let response = await axios.get(`/api/closet/${user_id}`)
    this.setState({
      user_shoes: response.data
    })
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    // console.log(this.props)
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

const mapStateToProps = reduxState => {
  return reduxState.user;
};

export default connect(mapStateToProps)(Closet);
