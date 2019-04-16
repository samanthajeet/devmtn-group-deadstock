import React, {Component} from 'react';
import axios from 'axios';

class Contacts extends Component {
    constructor(){
        super()
        this.state={
            
        }
    }

    componentDidMount(){
        this.getContacts()
    }

    getContacts=async()=>{
        let users = await axios.get('/api/users')
        console.log(users.data)
    }


    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default Contacts 