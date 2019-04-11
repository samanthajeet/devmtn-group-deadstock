import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import ProductCard from '../ProductCard/ProductCard';
import { withRouter } from "react-router"

const MappedShoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;


`;

class Shop extends Component {
  state = {
    shoes: []
  };

  componentDidMount() {
    this.getShoes();
  }

  getShoes = async () => {
    try {
      let response = await axios.get(`/api/shoes`);
      console.log(response.data[0]);
      this.setState({ shoes: response.data });
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
        <div>Hello Shop</div>
        <MappedShoes>{mappedShoes}</MappedShoes>
      </>
    );
  }
}

export default withRouter(Shop);
