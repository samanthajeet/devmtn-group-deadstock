import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import skull from "../Landing/image/skull-white.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Shoe = styled.div`
  :hover {
  }
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

class Home extends Component {
  state = {
    feed: [],
    loading: true
  };

  componentDidMount() {
    this.handleGetFeed();
  }

  handleGetFeed = async () => {
    await axios.get(`/api/following`).then(resp => {
      this.setState({
        feed: resp.data
      });
    });
    this.setState({
      loading: false
    });
  };

  render() {
    const { feed } = this.state;

    let mappedFeed = feed.map(follower => {
      console.log(follower.for_sale);
      return (
        <Paper
          key={follower.user_shoe_id}
          style={{
            height: "40rem",
            width: "40rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "20px"
          }}
        >
          <div
            style={{
              height: "8%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={follower.profile_pic} style={{ margin: ".5rem" }} />
              <div style={{ fontWeight: "bold" }}>
                {follower.first_name} {follower.last_name}
              </div>
            </div>
            {follower.for_sale == true ? (
              <div
                style={{
                  border: "1px solid green",
                  borderRadius: "6px",
                  padding: "3px 6px 3px 6px",
                  color: "green",
                  marginRight: "1%"
                }}
              >
                {" "}
                For Sale{" "}
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid red",
                  borderRadius: "6px",
                  padding: "3px 6px 3px 6px",
                  color: "red",
                  marginRight: "1%"
                }}
              >
                {" "}
                Not For Sale{" "}
              </div>
            )}
          </div>
          <div style={{ height: "72%" }}>
            <div style={{ display: "flex", height: "50%", width: "100%" }}>
              <img
                src={follower.image_1_url}
                alt=""
                style={{ width: "50%", height: "100%", objectFit: "cover" }}
              />
              <img
                src={follower.image_2_url}
                alt=""
                style={{ width: "50%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "flex", height: "50%", width: "100%" }}>
              <img
                src={follower.image_3_url}
                alt=""
                style={{ width: "50%", height: "100%", objectFit: "cover" }}
              />
              <img
                src={follower.image_4_url}
                alt=""
                style={{ width: "50%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "20%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  width: "75%",
                  display: "flex"
                }}
                to={`/dashboard/shop/${follower.shoe_id}`}
              >
                <Shoe
                  style={{
                    fontWeight: "bold",
                    marginLeft: "1%",
                    marginTop: "1%"
                  }}
                >
                  {follower.shoe_brand} {follower.shoe_model}{" "}
                  {follower.colorway}
                </Shoe>
              </Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "1%"
                }}
              >
                <div style={{ fontWeight: "bold" }}>Copped At</div>{" "}
                <div style={{ fontSize: "1.1rem", color: "green" }}>
                  ${follower.bought_price}.00{" "}
                </div>
              </div>
            </div>

            <div>{follower.details}</div>

            <Button
              style={{ marginBottom: "1%" }}
              color="primary"
              variant="contained"
              onClick={() => {
                this.props.history.push(
                  `/dashboard/closet/${follower.user_id}`
                );
              }}
            >
              View {follower.first_name}'s Closet
            </Button>
          </div>
        </Paper>
      );
    });
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {this.state.loading ? (
          <Progress>
            <SkullProgress>
              <img src={skull} alt="loading" />
            </SkullProgress>
            <p>LOADING</p>
          </Progress>
        ) : (
          <div>
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
                  width: "100%"
                }}
              >
                Home
              </h1>
            </div>
            <div>{mappedFeed}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
