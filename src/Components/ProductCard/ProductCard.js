import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';

const styles = theme => ({
  card: {
    width: '25rem',
    margin: '1rem',

  },
  media: {
    height: '18rem',
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

const CardContainer = styled.div `
  /* animation-name: fade-in; */
  /* animation-duration: 1s; */
  /* animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  transition-timing-function: ease; */

  :hover{
  animation-name: increasesize;
  animation-duration: 0.5s;
  transition: 0s;
  transition-timing-function: ease;
  animation-fill-mode: forwards;
  cursor: pointer;
  };


  @keyframes fade-in {
  0%   { opacity: 0; }
  100% { opacity: 1; }
  }


  @keyframes increasesize {
  0%   { transform: scale(1); }
  100% { transform: scale(1.05); }
}


`


class ProductCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  setComma(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  combineModelColor(model, colorway){
    const modelColorway = model + ' - ' + colorway
    return modelColorway
  }

  render() {
    const { classes } = this.props;


    return (
      <CardContainer>


      <Card className={classes.card}>
        <CardHeader
          // avatar={
          //   <Avatar aria-label="Recipe" className={classes.avatar}>
              
          //   </Avatar>
          // }
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={this.props.model}
          subheader={this.props.colorway}
        />
        <CardMedia
          className={classes.media}
          image={this.props.image}
          title={this.props.model}
          subheader={this.props.colorway}
          onClick={() => this.props.history.push(`/shop/${this.props.shoe_id}`)}
        />
        <CardContent>
          <Typography component="p">
            ${this.setComma(this.props.price)}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          {/* <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton> */}
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {this.props.description}
            </Typography>
            
          </CardContent>
        </Collapse>
      </Card>
      </CardContainer>
    );
  }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCard);