import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import skull from "../Landing/image/skull-white.png";
import styled from 'styled-components';

const SkullProgress = styled.div`
  animation-name: spin;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Progress = styled.div`
  margin-top: 25%;
  color: white;
  letter-spacing: 0.2rem;
`;

class Home extends Component {

    state = {
        feed: [],
        loading: true
    }

    componentDidMount() {
        this.handleGetFeed()
    }

    handleGetFeed = async() => {
        await axios.get(`/api/following`).then(resp => {
            this.setState({
                feed: resp.data,
            })
        })
        this.setState({
            loading:false
        })
    }

    render() {
        const { feed } = this.state;
        console.log(feed)
        let mappedFeed = feed.map(follower => {
            return (
                <Paper key={follower.user_shoe_id} style={{ height: '40rem', width: '40rem', display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '20px' }}>
                    <div style={{ height: '8%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Avatar src={follower.profile_pic} style={{ margin: '.5rem' }} />
                        {follower.first_name} {follower.last_name}
                    </div>
                    <div style={{ height: '72%' }}>
                        <div style={{ display: 'flex', height: '50%', width: '100%' }}>
                            <img src={follower.image_1_url} alt='' style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                            <img src={follower.image_2_url} alt='' style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', height: '50%', width: '100%' }}>
                            <img src={follower.image_3_url} alt='' style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                            <img src={follower.image_4_url} alt='' style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                        </div>

                    </div>
                    <div style={{ width:'100%', height: '20%', display:'flex', alignItems:'center', flexDirection:'column' }}>
                        <div>{follower.shoe_brand} {follower.shoe_model} {follower.colorway}</div>
                        <div style={{width: '100%', display:'flex', justifyContent:'space-evenly'}}> 
                            <div>Copped At: ${follower.bought_price}.00 </div>
                            <div>Sell Price: ${follower.sale_price}.00</div>
                        </div>
                        <div>{follower.details}</div>
                       
                        
                        <button onClick={() => { this.props.history.push(`/dashboard/closet/${follower.user_id}`) }}>View Closet</button>
                        {follower.for_sale ? (
                            <button onClick={() => { this.props.history.push(`/dashboard/shop/${follower.shoe_id}`) }}>View Product</button>
                        ) : (
                                null
                            )}
                    </div>
                </Paper>

            )
        })
        return (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {this.state.loading ? (
                    <Progress>
                        <SkullProgress>
                            <img src={skull} alt="loading" />
                        </SkullProgress>
                        <p>LOADING</p>
                    </Progress>
                ) : (
                    <div>
                     { mappedFeed }  
                    </div>
                       
                    )}
            </div>

        )
    }
}

export default Home