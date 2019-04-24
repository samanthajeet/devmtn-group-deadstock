import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Contacts from "./Contacts";
import List from "./List";
import TextField from "@material-ui/core/TextField";
import ChatMessages from "./ChatMessages";
import sockets from "./Sockets";
import { handleRoom } from "../../ducks/reducer";
import "./Chat.css";
import Button from "@material-ui/core/Button";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      compRendered: List,
      search: "",
      message: "",
      loading: true
    };
  }

  startChat = friend => {
    sockets.emit("endChat", this.props.room);
    const user_id = this.props.user.user_id;
    const { user_id: friend_id } = friend;
    let big;
    let small;
    if (user_id > friend_id) {
      big = user_id;
      small = friend_id;
    } else {
      big = friend_id;
      small = user_id;
    }
    let room = big + ":" + small;
    this.props.handleRoom(room);
    sockets.emit("startChat", room);
  };

  sendMessage = async () => {
    const { message } = this.state;
    const { user_id } = this.props.user;
    const { room } = this.props;
    if (this.state.message != "") {
      await sockets.emit("sendMessage", { message, user_id, room });

      this.setState({
        message: ""
      });
    }
  };

  search = value => {
    this.handleSearch(value);
  };

  handleSearch = value => {
    this.setState({
      search: value
    });
  };

  render() {
    const { hidden, show } = this.props;
    const { first_name, last_name, profile_pic, user_id } = this.props.friend;
    const ConditionalComp = this.state.compRendered;
    return (
      <div
        className={
          hidden
            ? "settings-modal hidden"
            : show
            ? "settings-modal show"
            : "settings-modal no-show"
        }
      >
        <div
          style={{
            height: "calc(100% - 64px)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Paper style={{ height: "100%", width: "100%", display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "15%",
                background: "rgba(0, 0 ,0, .2 )",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                borderRight: "1px solid rgba(0, 0 ,0, .4 ) "
              }}
            >
              <div
                style={{
                  height: "60%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly"
                }}
              >
                <div>
                  <i
                    className="fas fa-comment"
                    style={{
                      fontSize: "3rem",
                      color: "#26f7ff"
                    }}
                    onClick={() => this.setState({ compRendered: List })}
                  />
                  <h5 style={{ margin: 0, padding: 0, marginTop: "3px" }}>
                    Messages
                  </h5>
                </div>
                <div>
                  <i
                    className="fas fa-address-book"
                    style={{ fontSize: "3rem", color: "#26f7ff" }}
                    onClick={() => this.setState({ compRendered: Contacts })}
                  />
                  <h5 style={{ margin: 0, padding: 0, marginTop: "3px" }}>
                    Contacts
                  </h5>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "40%",
                height: "100%",
                boxSizing: "border-box",
                borderRight: "1px solid rgba(0, 0 ,0, .4 ) "
              }}
            >
              <div
                style={{
                  background: "white",
                  boxSizing: "border-box",
                  borderBottom: "solid 1px rgba(0, 0 ,0, .4 )",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "15%"
                }}
              >
                <TextField
                  id="outlined-search"
                  label={
                    this.state.compRendered == List
                      ? "Search Messages"
                      : "Search Contacts"
                  }
                  type="search"
                  //   className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  placeholder={
                    this.state.compRendered == List
                      ? "Search Messages"
                      : "Search Contacts"
                  }
                  value={this.state.search}
                  style={{ width: "93%" }}
                  onChange={e => this.search(e.target.value)}
                  padding={0}
                />
              </div>
              <div
                style={{
                  background: "white",
                  overflowY: "scroll",
                  height: "85%",
                  boxSizing: "border-box"
                }}
              >
                <ConditionalComp
                  users={this.props.users}
                  startChat={this.startChat}
                  style={{
                    maxHeight: "100%",
                    minHeight: "100%",
                    overflowY: "scroll"
                  }}
                />
              </div>
            </div>

            <div style={{ width: "50%", height: "100%", background: "white" }}>
              <div
                style={{
                  height: "15%",
                  background: "#26f7ff50",
                  display: "flex",
                  alignItems: "center",
                  boxSizing: "border-box",
                  borderBottom: "solid 1px rgba(0, 0 ,0, .4 )"
                }}
              >
                <img
                  src={profile_pic}
                  height="66rem"
                  width="66rem"
                  style={{ borderRadius: "50%", marginLeft: "3%" }}
                />
                <h1 style={{ marginLeft: "2%" }}>
                  {first_name} {last_name}
                </h1>
              </div>
              <div
                style={{
                  maxHeight: "73%",
                  minHeight: "73%",
                  overflowY: "scroll"
                }}
              >
                <ChatMessages />
              </div>
              <div
                style={{
                  height: "12%",
                  background: "white",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderTop: "solid 1px rgba(0, 0, 0, .4)"
                }}
              >
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TextField
                    id="message"
                    label="Type Message..."
                    type="text"
                    // className={classes.textField}
                    variant="outlined"
                    placeholder="Type Message..."
                    value={this.state.message}
                    style={{ width: "95%", justifyContent: "center" }}
                    padding={0}
                    onChange={e => this.setState({ message: e.target.value })}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    height: "61px",
                    width: "20%",
                    alignItems: "center"
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "66%" }}
                    onClick={this.sendMessage}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
    friend: reduxState.friend,
    room: reduxState.room
  };
}

export default connect(
  mapStateToProps,
  { handleRoom }
)(Chat);
