import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import ProductCard from "../ProductCard/ProductCard";
import { withRouter } from "react-router";
// import CircularProgress from '@material-ui/core/CircularProgress';
import skull from "../Landing/image/skull-white.png";

const MappedShoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

class Shop extends Component {
  state = {
    shoes: [],
    loading: true
  };

  componentDidMount() {
    this.getShoes();
  }

  getShoes = async () => {
    try {
      let response = await axios.get(`/api/shoes`);
      this.setState({ shoes: response.data, loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let mappedShoes = this.state.shoes.map(shoe => {
      return (
        <div key={shoe.shoe_id}>
          <ProductCard
            model={shoe.shoe_model}
            brand={shoe.brand}
            colorway={shoe.colorway}
            image={shoe.image_1_url}
            price={shoe.price}
            description={shoe.description}
            shoe_id={shoe.shoe_id}
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
          <MappedShoes>{mappedShoes}</MappedShoes>
        )}
      </>
    );
  }
}

export default withRouter(Shop);
