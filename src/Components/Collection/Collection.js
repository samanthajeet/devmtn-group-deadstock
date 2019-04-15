import React, { Component } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { withRouter } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const MappedCollection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
`;

const CollectionContainer = styled.div `
    h2{
        color:white
    }
`

const Progress = styled.div`
  color: white;
  margin-top: 25rem;
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
            <CircularProgress color="white" />
          </Progress>
        ) : (
            <CollectionContainer>
                
                <h2>Your Shoe Collection</h2>
                <MappedCollection>
                {mappedCollection}
                </MappedCollection>
            </CollectionContainer>
        )}
      </>
    );
  }
}

export default withRouter(Collection);
