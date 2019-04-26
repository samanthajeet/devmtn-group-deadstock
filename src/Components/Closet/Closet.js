import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ClosetCard from "../ClosetCard/ClosetCard";
// import Uploader from "../Uploader/Uploader";
// import Modal from "react-responsive-modal";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import skull from "../Landing/image/skull-white.png";
import Paper from "@material-ui/core/Paper";
import Chartjs from "./Chartjs";
import Button from "@material-ui/core/Button";

const MappedUserShoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
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

const Progress = styled.div`
  margin-top: 25%;
  color: white;
  letter-spacing: 0.2rem;
`;

class Closet extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      user_shoes: [],
      loading: true,
      user_image: '',
      user_bio: '',
      first_name: '',
      last_name: ''
    };
  }

  componentDidMount() {
    this.getCloset();
    this.getUserInfo()
  }

  getCloset = async () => {
    let response = await axios.get(`/api/closet/${this.props.match.params.user_id}`);
    this.setState({
      user_shoes: response.data
    });
    this.setState({
      loading: false
    });
  };

  getUserInfo = async () => {
    if (this.props.user_id != +this.props.match.params.user_id) {
      let response = await axios.get(`/api/closetUserInfo/${this.props.match.params.user_id}`)
      this.setState({
        profile_pic: response.data.profile_pic,
        bio: response.data.bio,
        first_name: response.data.first_name,
        last_name: response.data.last_name
      })
    } else {
      this.setState({
        profile_pic: this.props.profile_pic,
        bio: this.props.bio
      })
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    let mappedUserShoes = this.state.user_shoes.map(shoe => {
      return (
        <div key={shoe.user_shoe_id}>
          <ClosetCard
            image1={shoe.image_1_url}
            image2={shoe.image_2_url}
            image3={shoe.image_3_url}
            image4={shoe.image_4_url}
            details={shoe.details}
            shelfPrice={shoe.bought_price}
            forSale={shoe.sale_price}
            model={shoe.shoe_model}
            colorway={shoe.colorway}
            shoeId={shoe.shoe_id}
            history={this.props.history}
          />
        </div>
      );
    });
    return (
      <div>
        {this.state.loading ? (
          <Progress>
            <SkullProgress>
              <img src={skull} alt="loading" />
            </SkullProgress>
            <p>LOADING</p>
          </Progress>
        ) : (
            <div>
              <UserInfo>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{
                      width: "66%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                      
                    }}
                  >
                    {(this.props.user_id != +this.props.match.params.user_id) ? (
                      <h1
                        style={{
                          color: "white",
                          borderBottom: "solid 1px white",
                          width: "100%"
                        }}
                      >
                        {this.state.first_name} {this.state.last_name}'s Closet
                </h1>
                    ) : (
                        <h1
                          style={{
                            color: "white",
                            borderBottom: "solid 1px white",
                            width: "100%"
                          }}
                        >
                          Your Closet
                  </h1>
                      )}

                  </div>
                  <Chartjs user_id={this.props.match.params.user_id} />
                  {this.props.user_id === +this.props.match.params.user_id ? (

                    <Button
                      style={{ width: "80%" }}
                      variant="contained"
                      color="primary"
                      onClick={() => this.props.history.push("/dashboard/closet/upload")}
                    >
                      Add A New Shoe To Your Closet
                </Button>
                  ) : (
                      null
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh" }}>
                  <Paper
                    style={{
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "100%",
                      minWidth: '300px',
                      maxWidth: '400px',
                      minHeight: '50vh'
                    }}
                  >
                    <div style={{ height: "50%", width: "50%", }}>
                      <h3
                        style={{
                          color: "black",
                          margin: "0",
                          padding: "0",
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          justifyContent: "center"
                        }}
                      >
                        <div>{this.props.first_name}</div>
                        <div style={{ marginLeft: "2%" }}>
                          {this.props.last_name}
                        </div>
                      </h3>
                      <img
                        src={this.state.profile_pic}
                        alt=""
                        style={{
                          width: "12rem",
                          marginTop: '10%',
                          height: "12rem",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <p style={{ margin: "0", padding: "0", marginTop: "2%" }}>
                        {this.state.bio}
                      </p>
                    </div>                  
                    </Paper>
                </div>
              </UserInfo>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1%"
                }}
              >
                <h1
                  style={{
                    color: "white",
                    borderBottom: "solid 1px white",
                    width: "66vw"
                  }}
                >
                  Your Shoes
              </h1>
              </div>

              <MappedUserShoes>{mappedUserShoes}</MappedUserShoes>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState.user;
};

export default withRouter(connect(mapStateToProps)(Closet));
