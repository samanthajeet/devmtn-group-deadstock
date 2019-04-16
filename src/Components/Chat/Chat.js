import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from "@material-ui/core/Paper";
import Contacts from './Contacts';
import List from './List';
import TextField from "@material-ui/core/TextField";

class Chat extends Component {
    constructor() {
        super()
        this.state = {
            compRendered: List
        }
    }



    render() {
        console.log(this.props.users)
        const { first_name, last_name, profile_pic } = this.props.user
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
                        <div style={{ height: '15%', background: 'red' }}>
                            <TextField
                                id="outlined-search"
                                label={this.state.compRendered == List ? "Search Messages":"Search Contacts"}
                                type="search"
                                // className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                placeholder={this.state.compRendered == List ? "Search Messages":"Search Contacts"}
                                value={this.state.selectedShoe}
                                style={{ width: "93%" }}
                                padding={0}
                            />
                        </div>
                        <ConditionalComp users={this.props.users}/>
                    </div>

                    <div style={{ width: '50%', height: '100%', background: 'orange' }}>
                        <div style={{ height: '15%', background: 'yellow' }}>Chat Name and Pic</div>
                        <div style={{ height: '73%' }}>Chat History</div>
                        <div style={{ height: '12%', background: 'purple',display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                            <TextField
                                    id="outlined-search"
                                    label='Type Message...'
                                    type="text"
                                    // className={classes.textField}
                                    variant="outlined"
                                    placeholder='Type Message...'
                                    value={this.state.selectedShoe}
                                    style={{ width: "85%", justifyContent:'center'}}
                                    padding={0}
                                />
                            <button style={{height:'75%'}}>Send</button>
                        </div>

                    </div>
                </Paper>





            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
    }
}

export default connect(mapStateToProps)(Chat)