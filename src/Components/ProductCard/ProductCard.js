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
import Grow from '@material-ui/core/Grow';
import axios from 'axios';

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
  :hover{
  animation-name: increasesize;
  animation-duration: 0.5s;
  transition: 0s;
  transition-timing-function: ease;
  animation-fill-mode: forwards;
  cursor: pointer;
  };

  @keyframes increasesize {
  0%   { transform: scale(1); }
  100% { transform: scale(1.05); }
}

`


class ProductCard extends React.Component {
  state = {
    expanded: false,
    checked: true,
    like: false
   };

   componentDidMount(){
     this.checkFavorite()
   }

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

  handleAddFavorite(){
    const {shoe_id} = this.props
    axios.post(`/api/collection/favorite`, {shoe_id}).then()
    this.setState({
      like: true
    })
  }

  handleDeleteFavorite(){
    const {shoe_id} = this.props
    console.log(shoe_id)
    axios.delete(`/api/collection/deleteFavorite/${shoe_id}`)
    this.setState({
      like: false
    })
    }

  checkFavorite = async() => {
    const {shoe_id} = this.props
    let  response = await axios.get(`/api/collection/checkFavorites/${shoe_id}`)
    if (response.data[0]){
      this.setState({
        like: true
      })
    }
  }

  render() {
    const { classes } = this.props;
    const {checked} =  this.state


    return (
      <CardContainer>

      <Grow in={checked}>
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
          onClick={() => this.props.history.push(`/dashboard/shop/${this.props.shoe_id}`)}
        />
        <CardContent>
          <Typography component="p">
            ${this.setComma(this.props.price)}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>

        {this.state.like ? (
                  <IconButton aria-label="unliked"  onClick={() => this.handleDeleteFavorite()} >
                    <FavoriteIcon style={{color: "red"}} />
                  </IconButton>
        ): (
          <IconButton aria-label="Add to favorites" onClick={() => this.handleAddFavorite()}>
            <FavoriteIcon  />
          </IconButton>
        )}
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
      </Grow>
      </CardContainer>
    );
  }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCard);