import React, {Component} from 'react';
import sockets from './Sockets';
import axios from 'axios';
import {handleList,handleFriend} from '../../ducks/reducer';
import { connect } from 'react-redux';

class List extends Component {
    componentDidMount(){
        this.getChats()
    }

    selectUser(friend){
        this.props.handleFriend(friend)
        this.props.startChat(friend)
    }

    getChats=async()=>{
        let chats = await axios.get('/api/chats')
        chats = chats.data
        this.props.handleList(chats)
    }

  render() {
    let { list,search } = this.props

    const mappedName = this.props.list.filter(friend => {
        const friendSearch = search.toLowerCase().split(' ')
        for (let i = 0; i < friendSearch.length; i++) {
          const searchName = friendSearch[i];
          if (!friend.first_name.toLowerCase().includes(searchName) &&
            !friend.last_name.toLowerCase().includes(searchName)) {
            this.props.handleList(list)
            return false
          }
        }
        return true
      }).map(name => {
      return (
        <div
          key={name.user_id}
          onClick={() => this.selectUser(name)}
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
            src={name.profile_pic}
            style={{
              height: "3rem",
              width: "3rem",
              borderRadius: "50%",
              marginLeft: "3%",
              marginRight: "2%"
            }}
          />
          <h3 style={{ fontSize: "1rem" }}>
            {name.first_name} {name.last_name}
          </h3>
        </div>
      );
    });
    return <div style={{ height: "100%" }}>
    {mappedName}
    </div>
  }
}

function mapStateToProps (reduxState){
    return{
        list:reduxState.list
    }
}

export default connect(mapStateToProps,{handleList,handleFriend})(List) 