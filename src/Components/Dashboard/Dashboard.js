import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Public from '@material-ui/icons/Public';
import Favorite from '@material-ui/icons/Favorite';
import Closet from '../Closet/Closet';
import Collection from '../Collection/Collection';
import Community from '../Community/Community';
import Shop from '../Shop/Shop';
import Logout from '@material-ui/icons/ExitToApp';
import Search from '@material-ui/icons/Search';
import Chat from '@material-ui/icons/Forum';
import Settings from '@material-ui/icons/Settings';
import { ListItemText, ListItemIcon, ListItem } from '@material-ui/core';
import {Route} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const drawerWidth = 240;
const image = 'https://images.unsplash.com/photo-1494122353634-c310f45a6d3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'

const styles = theme => ({
  root: {
    boxSizing:'borderBox',
    display: 'flex',
    margin:0,
    padding:0,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    background: 'black',
    display:'flex',
    justifyContent:'space-evenly',
    borderBottom:'white solid 1px'
  },
  toolbarIcon: {
    borderBottom:'white 1px solid',
    background:'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit - 8,
    maxHeight: '100vh',
    overflow: 'hidden',
  },
  chartContainer: {
    marginLeft: -22,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  iconButtons:{
    '&:hover':{
        background:'blue',
      }
  },
  chevronIcon:{
    border:'white 1px dashed'
  },

  inputHolder:{
    "&::-webkit-input-placeholder": {
        color: 'white'
    },
    '&:focus':{
        outline:'none'
    }
  },
  searchButton:{
    '&:focus':{
        outline:'none'
    } 
  },
  paperContainer:{
    backgroundImage:`url(${image})`,
    height:'90vh',
    width:'100%',
    overflow:'scroll',
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    overflowX:'hidden'
  }

});

class Dashboard extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogout=async()=>{
    await axios.post('/api/auth/logout')
    console.log('logged out!')
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
                <MenuIcon  style={{color:'white'}}/>
            </IconButton>
            
            <form style={{borderRadius:'16px',width:'20vw',height:'100%',display:'flex',justifyContent:'center',background:'#2c3539'}}>
                <input className={classes.inputHolder} placeholder="Search" style={{width:'78%',height:'40px',fontSize:'20px',background:'#2c3539',border:'transparent',color:'white'}}/>
                <button className={classes.searchButton} style={{background:'#2c3539',border:'transparent'}}><Search style={{color:'white'}}/></button>
            </form>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              style={{fontSize:'45px'}}
    
              className={classes.title}
              >
             
              DeadStock  

            </Typography>
            <div style={{display:'flex',width:'15%',justifyContent:'space-around'}}>
              <Chat/>
              <Settings/>
            </div>
            {/* <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>

        <Drawer 
        style={{background:'black'}}
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >

          <div style={{background:'black'}} className={classes.toolbarIcon}>
            <IconButton className={classes.chevronIcon} onClick={this.handleDrawerClose}>
              <ChevronLeftIcon style={{color:'white'}} />
            </IconButton>
          </div>
          {/* <Divider /> */}

          {/* This is the entire nav sidebar beneath the divider */}
            <div style={{background:'black',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}> 
                <div>
                    <ListItem button className={classes.iconButtons} onClick={() => this.props.history.push('/dashboard/closet')}>
                        <ListItemIcon>
                          <i className="fas fa-door-closed" style={{color:'white',fontSize:'20px'}}></i>
                        </ListItemIcon>
                        <ListItemText primary={<Typography style={{color:'#ffffff',fontSize:'25px'}}> Closet</Typography>}/>
                    </ListItem>

              {/* <Divider /> */}

                    <ListItem button className={classes.iconButtons} onClick={() => this.props.history.push('/dashboard/collection')}>
                        <ListItemIcon>
                          <Favorite style={{color:'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography style={{color:'#ffffff',fontSize:'25px'}}> Collection </Typography>}/>
                    </ListItem>

              {/* <Divider /> */}

                    <ListItem button className={classes.iconButtons} onClick={() => this.props.history.push('/dashboard/community')}>
                      <ListItemIcon>
                        <Public style={{color:'white'}}/>
                      </ListItemIcon>
                      <ListItemText primary={<Typography style={{color:'#ffffff',fontSize:'25px'}}> Community</Typography>} />
                    </ListItem>
              {/* <Divider /> */}

                    <ListItem button className={classes.iconButtons} onClick={() => this.props.history.push('/dashboard/shop')}>
                      <ListItemIcon>
                        <ShoppingCart style={{color:'white'}}/>
                      </ListItemIcon>
                      <ListItemText primary={<Typography style={{color:'#ffffff',fontSize:'25px'}}> Shop</Typography>}/>
                    </ListItem>
                </div>
                <div>
                  <ListItem button className={classes.iconButtons} onClick={this.handleLogout}>
                    <ListItemIcon>
                      <Logout style={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{color:'#ffffff',fontSize:'25px'}}> Logout</Typography>}/>
                  </ListItem>
                </div>
            </div>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <Paper className={classes.paperContainer}>
              <Route path='/dashboard/closet' component={Closet}/>
              <Route path='/dashboard/collection' component={Collection}/>
              <Route path='/dashboard/community' component={Community} />
              <Route path='/dashboard/shop' component={Shop} />
            </Paper>

        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);