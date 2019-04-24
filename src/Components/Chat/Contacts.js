import React, { Component, memo } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { handleFriend} from "../../ducks/reducer";

class Contacts extends Component {
    selectUser(friend){
        this.props.handleFriend(friend)
        this.props.startChat(friend)
    }

  render() {
    const { users,search } = this.props;
    let mappedFriends = users.filter(user=>{
      const friendSearch = search.toLowerCase().split(' ')
        for (let i = 0; i < friendSearch.length; i++) {
          const searchName = friendSearch[i];
          if (!user.first_name.toLowerCase().includes(searchName) &&
            !user.last_name.toLowerCase().includes(searchName)) {
            return false
          }
        }
        return true
    }).map(friend => {
      return (
        <div
          key={friend.user_id}
          onClick={() => this.selectUser(friend)}
          style={{
            display: "flex",
            maxHeight: "100%",
            minHeight: "10vh",
            alignItems: "center",
            borderBottom: "solid 1px rgba(0, 0, 0, .1)",
            background: "rgba(0,0,0, .02)",
            boxSizing: "border-box"
          }}
        >
          <img
            src={friend.profile_pic}
            style={{
              height: "3rem",
              width: "3rem",
              borderRadius: "50%",
              marginLeft: "3%",
              marginRight: "2%"
            }}
          />
          <h3 style={{ fontSize: "1rem" }}>
            {friend.first_name} {friend.last_name}
          </h3>
        </div>
      );
    });

    return <div style={{ height: "100%" }}>
    {mappedFriends}
    </div>;
  }
}

function mapStateToProps(reduxState){
    return{
        user:reduxState.user
    }
}

export default memo(connect(mapStateToProps,{handleFriend})(Contacts)) 