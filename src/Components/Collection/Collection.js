import React, { Component } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { withRouter } from "react-router";
// import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import skull from "../Landing/image/skull-white.png";

const MappedCollection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CollectionContainer = styled.div`
  h2 {
    color: white;
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

class Collection extends Component {
  state = {
    collection: [],
    loading: true
  };

  componentDidMount() {
    this.getCollection();
  }

  getCollection = async () => {
    const response = await axios.get(`/api/collection`);
    this.setState({ collection: response.data, loading: false });
  };

  render() {
    const mappedCollection = this.state.collection.map(shoe => {
      return (
        <div key={shoe.shoe_id}>
          <ProductCard
            model={shoe.shoe_model}
            colorway={shoe.colorway}
            price={shoe.price}
            description={shoe.description}
            shoe_id={shoe.shoe_id}
            image={shoe.image_1_url}
            history={this.props.history}
          />
        </div>
      );
    });
    return (
      <>
        {this.state.loading ? (
          <Progress>
            <SkullProgress>
              <img src={skull} alt="loading" />
            </SkullProgress>
            <p>LOADING</p>
          </Progress>
        ) : (
          <CollectionContainer>
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
                  width: "66%"
                }}
              >
                Your Collection
              </h1>
            </div>
            <MappedCollection>{mappedCollection}</MappedCollection>
          </CollectionContainer>
        )}
      </>
    );
  }
}

export default withRouter(Collection);
