import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Contacts from './Contacts';
import List from './List';

class Chat extends Component {
    constructor(){
        super()
        this.state={
            compRendered:List
        }
    }



    render(){
        console.log(this.props.user)
        const {first_name,last_name,profile_pic} = this.props.user
        const ConditionalComp = this.state.compRendered
        return(
            <div style={{height:'calc(100% - 64px)',width:'100%',display:'flex',justifyContent:'center', alignItems:'center'}}>
                <Paper style={{height:'95%',width:'95%',display:'flex',background:'grey'}}>
                    <div style={{display:'flex',flexDirection:'column',width:'15%',background:'blue',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{height:'60%',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                            <i className="fas fa-comment" style={{fontSize:'100px',color:'white'}} onClick={()=>this.setState({compRendered:List})}/>
                            <i className="fas fa-address-book" style={{fontSize:'100px',color:'white'}} onClick={()=>this.setState({compRendered:Contacts})}/>
                        </div>
                    </div>

                    <div style={{width:'40%',height:'100%',background:'green'}}>
                        <div style={{height:'10%',background:'red'}}>Search Bar</div>
                        <ConditionalComp/>
                    </div>
                    
                    <div style={{width:'50%',height:'100%',background:'orange'}}>
                        <div style={{height:'10%',background:'yellow'}}>Chat Name and Pic</div>
                        <div style={{height:'75%'}}>Chat History</div>
                        <div style={{height:'15%',background:'purple'}}>Send</div>
                        
                    </div>
                </Paper>





            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        user:reduxState.user
    }
}

export default connect(mapStateToProps)(Chat)