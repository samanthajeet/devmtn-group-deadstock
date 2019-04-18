import React, { Component } from 'react';
import { connect } from 'react-redux';
import sockets from './Sockets';
import { handleChat } from '../../ducks/reducer';
// import CircularProgress from "@material-ui/core/CircularProgress";

class ChatMessages extends Component {
    state = {
        messages: [],
        message: '',
        loading: false
    }

    componentDidMount() {
        sockets.on('returnJoin', messages => {
            this.props.handleChat(messages)
            this.setState({
                loading: true
            })

        })
        sockets.on('returnMessages', messages => {
            this.props.handleChat(messages)
        })
    }

    render() {
        const mappedMessages = this.props.chat.map(message => {
            let color
            let position
            if (message.user_id == this.props.user.user_id) {
                color = 'lightblue';
                position = 'flex-end'
                return (
                    <div style={{ width: '98%', display: 'flex', justifyContent: `${position}`, marginRight: '5px' }}>
                        <div key={message.chat_id} style={{ background: `${color}`, display: 'flex', alignItems: 'center', marginBottom: '5px', maxWidth: '60%', justifyContent: 'flex-end', borderRadius: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' ,height:'45px'}}>
                                <p style={{ marginLeft: '5px' }}>{message.message}</p>
                                <img src={message.profile_pic} style={{ height: '25px', width: '25px', borderRadius: '50%', marginRight: '5px', marginLeft: '10px' }} />
                            </div>
                        </div>
                    </div>
                )

            } else {
                color = 'lightgrey';
                position = 'flex-start'
                return (
                    <div style={{ width: '98%', display: 'flex', justifyContent: `${position}`, marginLeft: '5px' }}>
                        <div key={message.chat_id} style={{ background: `${color}`, display: 'flex', alignItems: 'center', marginBottom: '5px', maxWidth: '60%', justifyContent: 'flex-start', borderRadius: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left' ,height:'45px'}}>
                                <img src={message.profile_pic} style={{ height: '25px', width: '25px', borderRadius: '50%', marginLeft: '5px', marginRight: '10px' }} />
                                <p style={{ marginRight: '5px' }}>{message.message}</p>
                            </div>
                        </div>
                    </div>
                )
            }


        })

        return (
            <>
                {this.state.loading &&
                    <div style={{ marginTop: '5px' }}>
                        {mappedMessages}
                    </div>
                }
            </>
        )
    }

}

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user,
        friend: reduxState.friend,
        chat: reduxState.chat
    }
}
export default connect(mapStateToProps, { handleChat })(ChatMessages) 