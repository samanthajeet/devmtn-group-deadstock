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
  height: 20rem;
  justify-content: space-around;
`;

const ChartJS = styled.div`
  width: 70%;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PaperContainer = styled.div`
  width: 30%;
  height: 100%;
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
      user_bio: ''
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
        bio: response.data.bio
      })
      // console.log(response.data)
    } else {
      // console.log(this.props)
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
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{
                      width: "66%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10%"
                    }}
                  >
                    <h1
                      style={{
                        color: "white",
                        borderBottom: "solid 1px white",
                        width: "100%"
                      }}
                    >
                      Your Closet
                  </h1>
                </div>
                <Chartjs user_id = {this.props.match.params.user_id} />
                { this.props.user_id === +this.props.match.params.user_id ?(

                    <Button
                      style={{ marginTop: "5%", width: "90%" }}
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

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                  <Paper
                    style={{
                      height: "90%",
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "80%"
                    }}
                  >
                    <div style={{ height: "50%", width: "50%", }}>
                      <img
                        src={this.state.profile_pic}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                    <p>{this.state.bio}</p>
                  </Paper>
                </div>
              </UserInfo>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10%"
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
