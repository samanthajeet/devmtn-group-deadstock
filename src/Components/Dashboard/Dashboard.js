import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
// import Badge from '@material-ui/core/Badge';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import NotificationsIcon from '@material-ui/icons/Notifications';
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Public from "@material-ui/icons/Public";
import Favorite from "@material-ui/icons/Favorite";
import Closet from "../Closet/Closet";
import Collection from "../Collection/Collection";
import Community from "../Community/Community";
import Shop from "../Shop/Shop";
import Logout from "@material-ui/icons/ExitToApp";
// import Search from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Forum";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import { ListItemText, ListItemIcon, ListItem } from "@material-ui/core";
import { Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import axios from "axios";
import Product from "../Product/Product";
import Settings from "../Settings/Settings";
import Chat from "../Chat/Chat";
import Uploader from "../Uploader/Uploader";
import { connect } from "react-redux";
import { clearUser } from "../../ducks/reducer";
import logo from "../Landing/image/logo-white.png";
import Home from "../Home/Home";

const drawerWidth = 240;
const image =
  '"https://images.unsplash.com/photo-1518692118831-d2b55f1d014c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1379&q=80"';

const StyledButton = styled.div`
  :hover {
    animation-name: increaseDashSize;
    animation-duration: 0.25s;
    transition: 0s;
    transition-timing-function: ease-in;
    animation-fill-mode: forwards;
    cursor: pointer;
    color: #26f7ff;
  }

  @keyframes increaseDashSize {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
`;

const styles = theme => ({
  root: {
    boxSizing: "borderBox",
    display: "flex",
    margin: 0,
    padding: 0
  },
  drawerButtonContent: {
    color: "white"
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    background: "black",
    display: "flex",
    justifyContent: "space-evenly",
    borderBottom: "white solid 1px"
  },
  toolbarIcon: {
    borderBottom: "white 1px solid",
    background: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflow: "hidden"
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit - 8,
    maxHeight: "100vh",
    overflow: "scroll"
  },
  chartContainer: {
    marginLeft: -22
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  iconButtons: {
    "&:hover": {
      background: "#26f7ff"
    },
    "&:hover $drawerButtonContent": {
      color: "black"
    }
  },
  chevronIcon: {
    border: "white 1px dashed"
  },
  inputHolder: {
    "&::-webkit-input-placeholder": {
      color: "white"
    },
    "&:focus": {
      outline: "none"
    }
  },
  searchButton: {
    "&:focus": {
      outline: "none"
    }
  },
  paperContainer: {
    backgroundImage: `url(${image})`,
    height: "100vh",
    width: "100%",
    overflow: "scroll",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflowX: "hidden"
  }
});

// const [open,setOpen] = useState(true)
// const [users,setUsers] =useState([])

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
      users: [],
      hidden: true,
      show: false,
      hidden2: true,
      show2: false
    };
  }

  componentDidMount() {
    this.getContacts();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogout = async () => {
    await axios.post("/api/auth/logout");
    this.props.clearUser();
    this.props.history.push("/");
  };

  getContacts = async () => {
    let users = await axios.get("/api/users");
    this.setState({ users: users.data });
  };

  handleSettingsToggle = async () => {
    if (this.state.show2) {
      await this.setState({ show2: false });
    }

    this.setState({
      hidden: false,
      show: !this.state.show
    });
  };

  handleChatToggle = async () => {
    if (this.state.show) {
      await this.setState({ show: false });
    }
    this.setState({
      hidden2: false,
      show2: !this.state.show2
    });
  };


  async handleHomeToggle(){
    if(this.state.show){
      await this.setState({
        show:false
      })
    }
    if(this.state.show2){
      await this.setState({
        show2:false
      })
    }
    this.props.history.push("/dashboard/home")
  }

  async handleClosetToggle(){
    if(this.state.show){
      await this.setState({
        show:false
      })
    }
    if(this.state.show2){
      await this.setState({
        show2:false
      })
    }
    this.props.history.push(`/dashboard/closet/${this.props.user.user_id}`)
  }

  async handleCollectionToggle(){
    if(this.state.show){
      await this.setState({
        show:false
      })
    }
    if(this.state.show2){
      await this.setState({
        show2:false
      })
    }
    this.props.history.push("/dashboard/collection")
  }

  async handleCommunityToggle(){
    if(this.state.show){
      await this.setState({
        show:false
      })
    }
    if(this.state.show2){
      await this.setState({
        show2:false
      })
    }
    this.props.history.push("/dashboard/community")
  }

  async handleShopToggle(){
    if(this.state.show){
      await this.setState({
        show:false
      })
    }
    if(this.state.show2){
      await this.setState({
        show2:false
      })
    }
    this.props.history.push("/dashboard/shop")
  }


  render() {
    const { hidden, show, hidden2, show2 } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon style={{ color: "white" }} />
            </IconButton>

            <div style={{ width: "15%" }} />
            {/* <form
              style={{
                borderRadius: "16px",
                width: "20vw",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                background: "#2c3539"
              }}
            >
              <input
                className={classes.inputHolder}
                placeholder="Search"
                style={{
                  width: "78%",
                  height: "40px",
                  fontSize: "20px",
                  background: "#2c3539",
                  border: "transparent",
                  color: "white"
                }}
              />
              <button
                className={classes.searchButton}
                style={{ background: "#2c3539", border: "transparent" }}
              >
                <Search style={{ color: "white" }} />
              </button>
            </form> */}
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              style={{ fontSize: "45px" }}
              className={classes.title}
            >
              <div
                className="deadstock-logo-background"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img src={logo} alt="logo-white" style={{ width: "25%" }} />
              </div>
            </Typography>
            <div
              style={{
                display: "flex",
                width: "15%",
                justifyContent: "space-around"
              }}
            >
              <StyledButton>
                <ChatIcon onClick={this.handleChatToggle} />
              </StyledButton>

              <StyledButton>
                <SettingsIcon onClick={this.handleSettingsToggle} />
              </StyledButton>
            </div>
            {/* <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>

        <Drawer
          style={{ background: "black" }}
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div style={{ background: "black" }} className={classes.toolbarIcon}>
            <IconButton
              className={classes.chevronIcon}
              onClick={this.handleDrawerClose}
            >
              <ChevronLeftIcon style={{ color: "white" }} />
            </IconButton>
          </div>
          {/* <Divider /> */}

          {/* This is the entire nav sidebar beneath the divider */}
          <div
            style={{
              background: "black",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            {this.props.user.first_name ? (
              <>
                <div>
                  <ListItem
                    button
                    className={classes.iconButtons}
                    onClick={() => this.handleHomeToggle()}
                  >
                    <ListItemIcon>
                      <HomeIcon className={classes.drawerButtonContent} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.drawerButtonContent}
                          style={{ fontSize: "25px" }}
                        >
                          {" "}
                          Home{" "}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem
                    button
                    className={classes.iconButtons}
                    onClick={() => this.handleClosetToggle()}
                  >
                    <ListItemIcon>
                      <i
                        className={
                          classes.drawerButtonContent + " " + "fas fa-door-closed"
                        }
                        style={{ fontSize: "20px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.drawerButtonContent}
                          style={{ fontSize: "25px" }}
                        >
                          {" "}
                          Closet
                    </Typography>
                      }
                    />
                  </ListItem>

                  {/* <Divider /> */}

                  <ListItem
                    button
                    className={classes.iconButtons}
                    onClick={() => this.handleCollectionToggle()}
                  >
                    <ListItemIcon>
                      <Favorite className={classes.drawerButtonContent} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.drawerButtonContent}
                          style={{ fontSize: "25px" }}
                        >
                          {" "}
                          Collection{" "}
                        </Typography>
                      }
                    />
                  </ListItem>

                  {/* <Divider /> */}

                  <ListItem
                    button
                    className={classes.iconButtons}
                    onClick={() => this.handleCommunityToggle()}
                  >
                    <ListItemIcon>
                      <Public className={classes.drawerButtonContent} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.drawerButtonContent}
                          style={{ fontSize: "25px" }}
                        >
                          {" "}
                          Community
                    </Typography>
                      }
                    />
                  </ListItem>
                  {/* <Divider /> */}

                  <ListItem
                    button
                    className={classes.iconButtons}
                    onClick={() => this.handleShopToggle()}
                  >
                    <ListItemIcon>
                      <ShoppingCart className={classes.drawerButtonContent} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.drawerButtonContent}
                          style={{ fontSize: "25px" }}
                        >
                          {" "}
                          Shop
                    </Typography>
                      }
                    />
                  </ListItem>
                </div>
                <div>
                  <ListItem
                    button
                    className={classes.iconButtons}
                    onClick={() => this.handleLogout()}
                  >
                    <ListItemIcon>
                      <Logout className={classes.drawerButtonContent} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.drawerButtonContent}
                          style={{ fontSize: "25px" }}
                        >
                          {" "}
                          Logout
                    </Typography>
                      }
                    />
                  </ListItem>
                </div>
              </>
            ) : (
                <div>
                  <ListItem
                    button
                    className={classes.iconButtons}
                    onClick={() => this.props.history.push('/login')}
                  >
                    <ListItemIcon>
                      <Logout className={classes.drawerButtonContent} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.drawerButtonContent}
                          style={{ fontSize: "25px" }}
                        >
                          {" "}
                          Login
                    </Typography>
                      }
                    />
                  </ListItem>
                </div>
              )}

          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Paper className={classes.paperContainer + " modal-container"}>
            <Chat hidden={hidden2} show={show2} users={this.state.users} />
            <Settings hidden={hidden} show={show} />
            <Route path="/dashboard/home" component={Home} />
            <Route path="/dashboard/closet/upload" component={Uploader} />
            <Route exact path='/dashboard/closet/:user_id' component={Closet} />
            <Route path="/dashboard/collection" component={Collection} />
            <Route
              path="/dashboard/community"
              render={props => (
                <Community {...props} users={this.state.users} />
              )}
            />
            {/* <Route
              path="/dashboard/chat"
              render={props => <Chat {...props} users={this.state.users} />}
            /> */}
            <Route path="/dashboard/shop/:shoe_id" component={Product} />
            <Route exact path="/dashboard/shop" component={Shop} />
          </Paper>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user
  };
}

export default connect(
  mapStateToProps,
  { clearUser }
)(withStyles(styles)(Dashboard));
