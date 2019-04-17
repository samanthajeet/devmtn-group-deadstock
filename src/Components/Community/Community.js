import React, { Component } from "react";
// import CircularProgress from "@material-ui/core/CircularProgress";
import CommunityCard from '../CommunityCard/CommunityCard'
import styled from "styled-components";


const UserCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    height: 100%;
`

class Community extends Component {
  state = {
    loading: false
  };

  render() {
    const { users } = this.props;
    let mappedUsers = users.map(user => {
      return (
        <div key={user.user_id}>
          <CommunityCard
            profile_pic={user.profile_pic}
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
            user_id={user.user_id}
            
            />
        </div>
      );
    });

    return (
      <>
            <UserCards>
                {mappedUsers}
            </UserCards>
      </>
    );
  }
}

export default Community;
