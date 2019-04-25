import React, { Component } from "react";
import { connect } from "react-redux";
import sockets from "./Sockets";
import { handleChat } from "../../ducks/reducer";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import axios from 'axios';

class ChatMessages extends Component {
  state = {
    messages: [],
    message: "",
  };

  componentDidMount() {
    this.getFriendMessage()
    sockets.on("returnJoin", messages => {
      this.props.handleChat(messages);

    });
    sockets.on("returnMessages", messages => {
      this.props.handleChat(messages);
    });
  }
  
  getFriendMessage=async()=>{
    if(Object.entries(this.props.friend).length !== 0){
      let chat = await axios.get(`api/getChat/${this.props.friend.user_id}`)
      chat = chat.data
      this.props.handleChat(chat)
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
        {mappedMessages.length !== 0 ?
          <div style={{ marginTop: "5px" }}>
            {mappedMessages}
          </div>
          : 
          <div style={{margin:'1rem auto',fontSize:'1rem'}}>
            No chat history available
          </div>
        }
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
