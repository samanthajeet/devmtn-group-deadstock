import React, {Component, memo} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {handleFriend} from '../../ducks/reducer';

class Contacts extends Component {
    selectUser(friend){
        this.props.handleFriend(friend)
        this.props.startChat(friend)
    }

    render(){
        const {users} = this.props;
        let mappedFriends = users.map(friend=>{
            return(
                <div key={friend.user_id} onClick={()=>this.selectUser(friend)}>
                    <h3>{friend.first_name} {friend.last_name}</h3>
                </div>
            )
        })
        
        return(
            <div>
                {mappedFriends}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        user:reduxState.user
    }
}

export default memo(connect(mapStateToProps,{handleFriend})(Contacts)) 