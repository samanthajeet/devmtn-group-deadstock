import React, { Component } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";


const Progress = styled.div`
  color: white;
  margin-top: 25rem;
`;

class Community extends Component {
  state = {
    users: [],
    loading: true
  };

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    const response = await axios.get(`/api/users`);
    this.setState({
      users: response.data,
      loading: false
    });
  };

  render() {
    const mappedUsers = this.state.users.map( user => {
        return (
            <div key={user.email}>
                
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
          <div>Hello Community</div>
        )}
      </>
    );
  }
}

export default Community;
