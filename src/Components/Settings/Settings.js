import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { DropzoneDialog } from 'material-ui-dropzone';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import './Settings.css';

const Progress = styled.div`
  color: white;
  margin-top: 15rem;
`;


class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            files: [],
            boolean: true,
            email: '',
            first_name: '',
            last_name: '',
            profile_pic: '',
            password: '',
            bio: '',
            loading: true,
        }
    }

    componentDidMount() {
        this.handleGetUser();
    }

    handleGetUser = async () => {
        await axios.get(`/api/auth/getuser`).then(response => {
            this.setState({
                email: response.data[0].email,
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                profile_pic: response.data[0].profile_pic,
                bio: response.data[0].bio
            })
        }
        )
        this.setState({
            loading: false
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

    handleInputChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    updateUser() {
        const { first_name, last_name, email, profile_pic, password, bio } = this.state;
        const userBody = { first_name, last_name, email, profile_pic, password, bio }
        axios.put(`/api/auth/editprofile`, userBody).then((resp) => {
            this.setState({
                first_name: resp.data[0].first_name,
                last_name: resp.data[0].last_name,
                email: resp.data[0].email,
                profile_pic: resp.data[0].profile_pic,
                bio: resp.data[0].bio
            })
            window.history.back()
        })
    }

    render() {
        console.log()
        const {hidden, show} = this.props;
        return (
            <div className={hidden ? "settings-modal hidden" : show ? 'settings-modal show' : 'settings-modal no-show'}>
                <div
                    style={{
                        height: "calc(100% - 64px)",
                        display: 'flex',
                        justifyContent: 'center',
                 
                    }}
                >
                    {this.state.loading ? (
                        <Progress>
                            <CircularProgress />
                        </Progress>
                    ) : (
                            <Paper
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",

                                }}
                            >
                                <div
                                    style={{
                                        width: "50%",
                                        backgroundColor: 'rgba(0,0,0,.1)'
                                    }}
                                >
                                    <div style={{width:'80%', height:'60%', display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                        <img src={this.state.profile_pic} alt='profile picture' style={{ width:'100%', height:'100%', backgroundSize:'cover' }} />
                                        <Button onClick={() => this.handleOpen()}>Edit Photo</Button>
                                    </div>
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
                                    <TextField
                                        id="standard-multiline-fixed"
                                        label="Multiline Placeholder"
                                        multiline
                                        rows={8}
                                        value={this.state.bio}
                                        onChange={(e) => this.handleInputChange('bio', e.target.value)}
                                        style={{ marginTop: "10px", width: "90%" }}
                                        variant='outlined'
                                    />
                                </div>
                                <div
                                    style={{
                                        width: "50%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-around",
                                        alignItems: 'center',
                                        borderLeft: 'solid 1px rgba(0,0,0,.2)'
                                    }}
                                > Profile
                                    <TextField
                                        style={{
                                            width: '90%'
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
                                            width: '90%'
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
                                            width: '90%'
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
                                            width: '90%'
                                        }}
                                        id="outlined-name"
                                        label="New Password"
                                        // className={classes.textField}
                                        onChange={(e) => this.handleInputChange('password', e.target.value)}
                                        margin="normal"
                                        variant="outlined"
                                        type='password'
                                    />
                                    <div style={{ display: 'flex', width: "90%", justifyContent: 'flex-end' }}>
                                        <Button style={{ width: '33%', padding: '3%' }} variant="contained" color="primary" onClick={() => this.updateUser()}>Save Changes</Button>
                                    </div>

                                </div>

                            </Paper>
                        )
                    }

                </div>
            </div>
        )
    }
}

export default Settings