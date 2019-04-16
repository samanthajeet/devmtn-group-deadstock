import React, {Component} from 'react';

class Community extends Component {
    render(){
        console.log(this.props.users)
        const {users} = this.props
        let mappedUsers = users.map(user=>{
            return(
                <div>
                    <h1>{user.first_name} {user.last_name}</h1>
                    <h3>{user.email}</h3>
                    <img src={user.profile_pic} height='25px' width='25px'/>
                </div>
            )
        })
        return(
            <>
              <div style={{color:'white'}}>{mappedUsers}</div>
            </>
        )
    }
}

export default Community