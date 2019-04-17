import React, {Component} from 'react';
import {connect} from 'react-redux';
import sockets from './Sockets';
import {handleChat} from '../../ducks/reducer';

class ChatMessages extends Component{
    //get the chat history onComponentDidMount
    //sockets should have been opened on each name push
    state={
        messages:[],
        message:''
    }

    componentDidMount(){
        sockets.on('returnJoin', messages=>{
            console.log(messages)
            this.props.handleChat(messages)
            // this.setState({
            //     messages
            // })
        })
        sockets.on('returnMessages',messages=>{
            console.log(messages)
            this.props.handleChat(messages)
            // this.setState({
            //     messages
            // })
        })
    }

    render(){
        console.log(this.props.chat)
        const mappedMessages = this.props.chat.map(message=>{
            let color
            let position
            if(message.user_id == this.props.user.user_id){
                color = 'lightblue';
                position = 'flex-start'
            } else {
                color = 'lightgrey';
                position = 'flex-end'
            }

            return (
                <div key={message.chat_id} style={{background:`${color}`,display:'flex',alignItems:'center',justifyContent:`${position}`, marginBottom:'5px',marginRight:'20%',marginLeft:'1%'}}>
                    <img src={message.profile_pic} style={{height:'25px',width:'25px',borderRadius:'50%',margin:'5px'}}/>
                    <h3>{message.message}</h3>
                    {/* <h3>{message.first_name} {message.last_name}</h3> */}
                </div>
            )
        })

        return(
            <div style={{marginTop:'5px'}}>
                {mappedMessages}
            </div>
        )
    }

}

function mapStateToProps(reduxState){
    return{
        user:reduxState.user,
        friend:reduxState.friend,
        chat:reduxState.chat
    }
}
export default connect(mapStateToProps, {handleChat})(ChatMessages) 