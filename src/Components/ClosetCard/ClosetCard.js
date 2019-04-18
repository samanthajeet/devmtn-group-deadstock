import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  paper: {
    height: "30rem",
    width: "28rem",
    margin: "0.75rem",
    padding: ".5rem"
  }

});

const Details = styled.div`

`
const SalePrice = styled.div`

`

const ShelfPrice = styled.div`

`
const Model = styled.div`

`
const Colorway = styled.div`

`

const ClosetCardContainer = styled.div`

  display: flex;
  flex-wrap: wrap;

  /* :hover {
    animation-name: increasesize;
    animation-duration: 0.5s;
    transition: 0s;
    transition-timing-function: ease;
    animation-fill-mode: forwards;
    cursor: pointer;
  }

  @keyframes increasesize {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.05);
    }
  } */
`;

const Images = styled.div`
  display: flex;
  flex-direction :column;
  height: 50%;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  height: 50%;

  img {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
`
const BottomRow = styled.div`
  display: flex;
  width: 100%;
  height: 50%;

  img {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
`


function ClosetCard(props) {
  const { classes } = props;
  function combineModelColor(model, colorway) {
    const modelColorway = model + " - " + colorway;
    return modelColorway;
  }


  return (
    <ClosetCardContainer>
      {/* <Grow in={true}> */}
        <Paper className={classes.paper}>
          <Model>
            {props.model}
          </Model>
          <Colorway>
            {props.colorway}
          </Colorway>
          <Images>
            <TopRow>
              <img src={props.image1} alt="" />
              <img src={props.image2} alt="" />
              </TopRow>
            <BottomRow>
            <img src={props.image3} alt="" />
            <img src={props.image4} alt="" />
            </BottomRow>
          </Images>

          <ShelfPrice>
            Shelf Price: ${props.shelfPrice}.00
          </ShelfPrice>
          <SalePrice>
            Selling at: ${props.forSale}.00
          </SalePrice>
          <Details>
            {props.details}
          </Details>
          <button onClick={() => {props.history.push(`/dashboard/shop/${props.shoeId}`)}}>View Shoe</button>
        </Paper>
      {/* </Grow> */}
    </ClosetCardContainer>
  );
}

ClosetCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClosetCard);
