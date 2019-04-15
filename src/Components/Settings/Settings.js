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
            loading: true

        }
    }

    componentDidMount(){
        this.handleGetUser();
    }

    handleGetUser= async() => {
        await axios.post(`/api/auth/checkuser`).then(response => {
            this.setState({
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                profile_pic: response.data.profile_pic
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
        const {first_name, last_name, email, profile_pic} = this.state;
        const userBody = {first_name, last_name, email, profile_pic}
        axios.put(`/api/auth/editprofile`, userBody).then((resp) => {
            this.setState({
                first_name: resp.data[0].first_name,
                last_name: resp.data[0].last_name,
                email: resp.data[0].email,
                profile_pic: resp.data[0].profile_pic
            })
            window.history.back()
        })
        console.log(this.state)
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
                        <Paper
                            style={{
                                width: "50%"
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
                        </Paper>
                        <Paper
                            style={{
                                width: "50%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around"
                            }}
                        >
                            <TextField
                                id="outlined-name"
                                label="First Name"
                                // className={classes.textField}
                                value={this.state.first_name}
                                onChange={(e) => this.handleInputChange('first_name', e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-name"
                                label="Last Name"
                                // className={classes.textField}
                                value={this.state.last_name}
                                onChange={(e) => this.handleInputChange('last_name', e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-name"
                                label="Email"
                                // className={classes.textField}
                                value={this.state.email}
                                onChange={(e) => this.handleInputChange('email', e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <TextField
                                id="outlined-name"
                                label="New Password"
                                // className={classes.textField}
                                value={this.state.email}
                                onChange={(e) => this.handleInputChange('password', e.target.value)}
                                margin="normal"
                                variant="outlined"
                            /> */}
                            <Button variant="contained" color="primary" onClick={() => this.updateUser()}>Update</Button>

                        </Paper>
                        
                    </Paper>    
                )
            }
                    
                </div>
            </Grow>
        )
    }
}

export default Settings