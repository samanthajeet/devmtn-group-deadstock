import React, { Component } from "react";
import { connect } from "react-redux";
import sockets from "./Sockets";
import { handleChat } from "../../ducks/reducer";
// import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';

class ChatMessages extends Component {
  state = {
    messages: [],
    message: "",
    loading: false
  };

  componentDidMount() {
    this.getFriendMessage()
    sockets.on("returnJoin", messages => {
      this.props.handleChat(messages);
      this.setState({
        loading: true
      });
    });
    sockets.on("returnMessages", messages => {
      this.props.handleChat(messages);
    });
  }
  
  getFriendMessage=()=>{
    console.log(this.props.friend)
    if(this.props.friend !== {}){
      // axios.get('api/')

    }

  }

  render() {
    const mappedMessages = this.props.chat.map(message => {
      let color;
      let position;
      if (message.user_id == this.props.user.user_id) {
        color = "#26f7ff75";
        position = "flex-end";
        return (
          <div
            key={message.chat_id}
            style={{
              width: "98%",
              display: "flex",
              justifyContent: `${position}`,
              marginRight: "5px"
            }}
          >
            <div
              style={{
                background: `${color}`,
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                maxWidth: "60%",
                justifyContent: "flex-end",
                borderRadius: "10px",
                padding: "4px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    textAlign: "left",
                    marginLeft: "2px"
                  }}
                >
                  {message.message}
                </p>
                {/* <div style={{}}>
                  <img
                    src={message.profile_pic}
                    style={{
                      height: "2rem",
                      width: "2rem",
                      borderRadius: "50%"
                    }}
                  />
                </div> */}
              </div>
            </div>
          </div>
        );
      } else {
        color = "lightgrey";
        position = "flex-start";
        return (
          <div
            key={message.chat_id}
            style={{
              width: "98%",
              display: "flex",
              justifyContent: `${position}`,
              marginLeft: "5px"
            }}
          >
            <div
              style={{
                background: `${color}`,
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                maxWidth: "60%",
                justifyContent: "flex-start",
                borderRadius: "10px",
                padding: "4px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  padding: "2px"
                }}
              >
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "100%"
                  }}
                >
                  <img
                    src={message.profile_pic}
                    style={{
                      height: "2rem",
                      width: "2rem",
                      borderRadius: "50%"
                    }}
                  />
                </div> */}
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    textAlign: "left",
                    marginLeft: "2px"
                  }}
                >
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        );
      }
    });

    return (
      <>
        {this.state.loading && (
          <div style={{ marginTop: "5px" }}>{mappedMessages}</div>
        )}
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
    friend: reduxState.friend,
    chat: reduxState.chat
  };
}
export default connect(
  mapStateToProps,
  { handleChat }
)(ChatMessages);
