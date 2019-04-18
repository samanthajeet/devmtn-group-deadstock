import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from "@material-ui/core/Paper";
import Contacts from './Contacts';
import List from './List';
import TextField from "@material-ui/core/TextField";
import ChatMessages from './ChatMessages';
import sockets from './Sockets';
import {handleRoom} from '../../ducks/reducer';

class Chat extends Component {
    constructor() {
        super()
        this.state = {
            compRendered: List,
            search:'',
            message:'',
            loading:true
        }
    }

    startChat=(friend)=>{
        sockets.emit('endChat',this.props.room)
        const user_id = this.props.user.user_id;
        const {user_id:friend_id} = friend;
        let big
        let small 
        if(user_id > friend_id){
            big = user_id;
            small = friend_id
        } else {
            big = friend_id;
            small = user_id
        }
        let room = big + ':' + small;
        this.props.handleRoom(room)
        sockets.emit('startChat',room)
    }

    sendMessage=()=>{
        console.log(this.state.message,this.props.user.user_id,this.props.room)
        const {message} = this.state;
        const {user_id} = this.props.user;
        const {room} = this.props
        sockets.emit('sendMessage',{message,user_id,room})
    }

    search=(value)=>{
        this.handleSearch(value);

    }

    handleSearch=(value)=>{
        this.setState({
            search:value
        })
    }

    render() {
        const { first_name, last_name, profile_pic, user_id } = this.props.friend
        const ConditionalComp = this.state.compRendered
        return (
            <div style={{ height: 'calc(100% - 64px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper style={{ height: '95%', width: '95%', display: 'flex'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '15%', background: 'blue', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <i className="fas fa-comment" style={{ fontSize: '100px', color: 'white' }} onClick={() => this.setState({ compRendered: List })} />
                            <i className="fas fa-address-book" style={{ fontSize: '100px', color: 'white' }} onClick={() => this.setState({ compRendered: Contacts })} />
                        </div>
                    </div>

                    <div style={{ width: '40%', height: '100%', background: 'green' }}>
                        <div style={{ height: '15%', background: 'gray' }}>
                            <TextField
                                id="outlined-search"
                                label={this.state.compRendered == List ? "Search Messages":"Search Contacts"}
                                type="search"
                                // className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                placeholder={this.state.compRendered == List ? "Search Messages":"Search Contacts"}
                                value={this.state.search}
                                style={{ width: "93%" }}
                                onChange={(e)=>this.search(e.target.value)}
                                padding={0}
                            />
                        </div>
                        <div style={{maxHeight:'85%',minHeight:'85%',background:'white', overflowY: "scroll"}}>
                            <ConditionalComp users={this.props.users} startChat={this.startChat} style={{maxHeight:'100%',minHeight:'100%',overflowY:'scroll'}}/>
                        </div>
                    </div>

                    <div style={{ width: '50%', height: '100%', background: 'white' }}>
                        <div style={{ height: '15%', background: 'yellow', display:'flex',alignItems:'center',justifyContent:'space-evenly' }}>
                            <img src={profile_pic} height='50px' width='50px' style={{borderRadius:'50%'}}/>
                            <h1>{first_name} {last_name}</h1>
                        </div>
                        <div style={{ maxHeight: '73%', minHeight:'73%', overflowY:'scroll' }}>
                            <ChatMessages/>                            
                        </div>
                        <div style={{ height: '12%', background: 'purple',display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                            <TextField
                                    id="message"
                                    label='Type Message...'
                                    type="text"
                                    // className={classes.textField}
                                    variant="outlined"
                                    placeholder='Type Message...'
                                    value={this.state.message}
                                    style={{ width: "85%", justifyContent:'center'}}
                                    padding={0}
                                    onChange={(e)=>this.setState({message:e.target.value})}
                                />
                            <button style={{height:'75%'}} onClick={this.sendMessage}>Send</button>
                        </div>

                    </div>
                </Paper>

            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user,
        friend:reduxState.friend,
        room: reduxState.room
    }
}

export default connect(mapStateToProps, {handleRoom})(Chat)