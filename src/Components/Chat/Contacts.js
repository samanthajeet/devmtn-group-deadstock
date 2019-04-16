import React, {Component, memo} from 'react';
import axios from 'axios';

class Contacts extends Component {
    constructor(){
        super()
        this.state={
            user:{}
        }
    }

    render(){
        const {users} = this.props;
        console.log(this.props.users)
        let mappedUsers = users.map(user=>{
            return(
                <div key={user.user_id}>
                    <h3>{user.first_name} {user.last_name}</h3>
                </div>
            )
        })
        
        return(
            <div>
                {mappedUsers}
            </div>
        )
    }
}

export default memo(Contacts) 