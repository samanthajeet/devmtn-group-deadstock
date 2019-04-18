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
                <div key={friend.user_id} onClick={()=>this.selectUser(friend)} style={{display:'flex',maxHeight:'100%',alignItems:'center',border:'solid black 1px',margin:'2px'}}>
                    <img src={friend.profile_pic} style={{height:'25px',width:'25px',borderRadius:'50%',marginLeft:'5px',marginRight:'5px'}}/>
                    <h3 style={{fontSize:'1rem'}}>{friend.first_name} {friend.last_name}</h3>
                </div>
            )
        })
        
        return(
            <div style={{height: "100%"}}>
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