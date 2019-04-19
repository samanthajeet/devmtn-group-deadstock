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
      loading: true
    };
  }

  componentDidMount() {
    this.getCloset();
  }

  getCloset = async () => {
    let { user_id } = this.props;
    let response = await axios.get(`/api/closet/${user_id}`);
    console.log(response.data);
    this.setState({
      user_shoes: response.data
    });
    this.setState({
      loading: false
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props);
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
            <UserInfo
              style={{ borderBottom: "solid 4px #26f7ff", height: "52vh" }}
            >
              <div style={{ background: "transparent", width: "66%" }}>
                <h1 style={{ color: "white" }}>Your Closet</h1>
                <Chartjs />
              </div>
              <PaperContainer
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Paper
                  style={{
                    height: "50vh",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    width: "90%"
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      padding: 0,
                      textDecoration: "underline"
                    }}
                  >
                    About You
                  </h3>
                  <div style={{ height: "66%", width: "95%" }}>
                    <img
                      src={this.props.profile_pic}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: "95%",
                      height: "33%"
                    }}
                  >
                    <div
                      style={{
                        margin: 0,
                        padding: 0,
                        fontSize: ".66rem",
                        fontWeight: "bold",
                        textDecoration: "underline"
                      }}
                    >
                      Your Bio
                    </div>
                    <p
                      style={{
                        margin: 0,
                        passing: 0,
                        color: "black",
                        display: "flex",
                        width: "90%",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        fontSize: ".2rem"
                      }}
                    >
                      {this.props.bio}
                    </p>
                  </div>
                </Paper>
              </PaperContainer>
            </UserInfo>
            <h1 style={{ color: "white" }}>Your Shoes</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push("closet/upload")}
            >
              Add A New Shoe To Your Closet
            </Button>
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
