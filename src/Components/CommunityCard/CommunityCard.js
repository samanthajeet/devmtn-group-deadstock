import React, { Component} from "react";
import axios from 'axios'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  card: {
    display: "flex",
    width: "23rem",
    height: "10rem",
    margin: "0.75rem",
    justifyContent: "flex-end"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "50%"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "50%"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  },
  button: {
    margin: theme.spacing.unit,
    color: 'black'
  }
});

class CommunityCard extends Component {
  state = { 
    following: false,
    loading: true
   }

   componentDidMount(){
     this.checkFollowing()
   }


  checkFollowing = async() =>  {
    const followed_user_id = this.props.user_id
    let response = await axios.get(`/api/checkFollowing/${followed_user_id}`)
    console.log(followed_user_id)
    if(response.data){
      this.setState({
        following: true
      })
    }
    this.setState({
      loading: false
    })
  }

  followUser(){
    const followed_user_id = this.props.user_id
    axios.post(`/api/following/add/${followed_user_id}`)    
    this.setState({
      following: true
    })
  }

  toggleFollow(){
    
  }
  render() { 
    const { classes, theme } = this.props;
    return ( 
      <>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {this.props.first_name} {this.props.last_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                50 Pairs of Shoes
              </Typography>
              {this.state.follwing ? (
                <Button variant="outlined" className={classes.button} onClick={() => this.toggleFollow()}  >
                  unfollow
                </Button>
              ) : (
                <Button variant="outlined"  className={classes.button} onClick={() => this.followUser()} >
                  follow
                </Button>
              )}
            </CardContent>
            <div className={classes.controls} />
          </div>
          <CardMedia
            className={classes.cover}
            image={this.props.profile_pic}
            title="Live from space album cover"
          />
        </Card>

    </>
     );
  }
}
 




CommunityCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CommunityCard);
