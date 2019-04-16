import React, { Component } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";


const Progress = styled.div`
  color: white;
  margin-top: 25rem;
`;

class Community extends Component {
    constructor(){
        super()
        this.state={
            loading:true
        }

    }
    render() {
        console.log(this.props.users)
        const { users } = this.props
        let mappedUsers = users.map(user => {
            return (
                <div>
                    <h1>{user.first_name} {user.last_name}</h1>
                    <h3>{user.email}</h3>
                    <img src={user.profile_pic} height='25px' width='25px' />
                </div>
            )
        })
        return (
            <>
                {this.state.loading ? (
                    <Progress>
                        <CircularProgress color="white" />
                    </Progress>
                ) : (
                        <div style={{ color: 'white' }}>{mappedUsers}</div>
                        )}

            </>
        )
    }
}

export default Community;
