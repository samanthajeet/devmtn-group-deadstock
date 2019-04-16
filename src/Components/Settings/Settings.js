import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { DropzoneDialog } from 'material-ui-dropzone';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grow from "@material-ui/core/Grow";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Progress = styled.div`
  color: white;
  margin-top: 15rem;
`;

class Settings extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            files: [],
            boolean: true,
            email: '',
            first_name: '',
            last_name: '',
            profile_pic: '',
            password: '',
            loading: true,
        }
    }

    componentDidMount(){
        this.handleGetUser();
    }

    handleGetUser= async() => {
        await axios.get(`/api/auth/getuser`).then(response => {
            console.log(response.data)
            this.setState({
                email: response.data[0].email,
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                profile_pic: response.data[0].profile_pic
            })
          }
        )
        this.setState({
            loading:false
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    handleOpen() {
        this.setState({
            open: true
        })
    }

    handleSave(files) {
        this.setState({
            files: files,
            open: false
        })
    }

    handleInputChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    updateUser(){
        const {first_name, last_name, email, profile_pic, password} = this.state;
        const userBody = {first_name, last_name, email, profile_pic, password}
        axios.put(`/api/auth/editprofile`, userBody).then((resp) => {
            console.log(resp.data)
            this.setState({
                first_name: resp.data[0].first_name,
                last_name: resp.data[0].last_name,
                email: resp.data[0].email,
                profile_pic: resp.data[0].profile_pic
            })
            console.log(this.state)
            window.history.back()
        })
    }


    render() {
        console.log()
        return (
            <Grow in={this.state.boolean}>
                <div
                    style={{
                        height: "calc(100%-64px)",
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '3%'
                    }}
                >
                {this.state.loading ? (
                  <Progress>
                    <CircularProgress color="white" />
                  </Progress>
                ) : (
                <Paper
                        style={{
                            height: "82vh",
                            width: "80%",
                            display: "flex",
                            justifyContent: "center",
                            
                        }}
                    >
                        <div
                            style={{
                                width: "50%",
                                backgroundColor:'rgba(0,0,0,.1)'
                            }}

                        >
                            <img src={this.state.profile_pic} alt='profile picture' style={{width: '100%'}}/>
                            <Button onClick={() => this.handleOpen()}>Edit Photo</Button>
                            <DropzoneDialog
                                align="center"
                                open={this.state.open}
                                onSave={this.handleSave.bind(this)}
                                filesLimit={4}
                                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                                showPreviews={true}
                                maxFileSize={10000000}
                                onClose={this.handleClose.bind(this)}
                                height={450}
                                width={400}
                            />
                        </div>
                        <div
                            style={{
                                width: "50%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems:'center',
                                borderLeft: 'solid 1px rgba(0,0,0,.2)'
                            }}
                        >
                            <TextField
                                style={{
                                    width:'90%'
                                }}
                                id="outlined-name"
                                label="First Name"
                                // className={classes.textField}
                                value={this.state.first_name}
                                onChange={(e) => this.handleInputChange('first_name', e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                style={{
                                    width:'90%'
                                }}
                                id="outlined-name"
                                label="Last Name"
                                // className={classes.textField}
                                value={this.state.last_name}
                                onChange={(e) => this.handleInputChange('last_name', e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                style={{
                                    width:'90%'
                                }}
                                id="outlined-name"
                                label="Email"
                                // className={classes.textField}
                                value={this.state.email}
                                onChange={(e) => this.handleInputChange('email', e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                style={{
                                    width:'90%'
                                }}
                                id="outlined-name"
                                label="New Password"
                                // className={classes.textField}
                                onChange={(e) => this.handleInputChange('password', e.target.value)}
                                margin="normal"
                                variant="outlined"
                                type='password'
                            />
                            <div style={{display:'flex', width:"90%", justifyContent:'flex-end'}}>
                                <Button style={{width:'33%', padding:'3%'}}variant="contained" color="primary" onClick={() => this.updateUser()}>Save Changes</Button>
                            </div>

                        </div>
                        
                    </Paper>    
                )
            }
                    
                </div>
            </Grow>
        )
    }
}

export default Settings