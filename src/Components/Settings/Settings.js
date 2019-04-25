import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import "./Settings.css";

const Progress = styled.div`
  color: white;
  margin-top: 15rem;
`;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      boolean: true,
      email: "",
      first_name: "",
      last_name: "",
      profile_pic: "",
      password: "",
      bio: "",
      loading: true,
      
      file: '',
      filename: '',
      filetype: '',
      isLoading:false
    };
    this.handlePhoto = this.handlePhoto.bind(this);
  }




// this is the event handler for the file input field
handlePhoto(event) {
  // this makes a generic file reader that an convert files into strings that allows us to upload it to a server.
  const reader = new FileReader();
  // the file itself is located here
  const file = event.target.files[0];

  // this is an event handeler and will not actaully run untill the code on line 39 finishes running
  reader.onload = photo => {
    // the photo param here is the processed image from the reader.
    this.setState({
      file: photo.target.result,
      filename: file.name,
      filetype: file.type,
      isLoading:true
    });
  };
  // take the file from the input field and process it at a DataURL (a special way to interpret files)
 reader.readAsDataURL(file);


setTimeout(() => {  
  
  axios.post('/api/s3', this.state).then(response => {
  this.setState({ profile_pic: response.data.Location,isLoading:false });
})}, 5000)

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
      });
    });
    this.setState({
      loading: false
    });
  };

handleInputChange(prop, val) {
  this.setState({
    [prop]: val
  });
}

updateUser() {
  const {
    first_name,
    last_name,
    email,
    profile_pic,
    password,
    bio
  } = this.state;
  const userBody = {
    first_name,
    last_name,
    email,
    profile_pic,
    password,
    bio
  };
  axios.put(`/api/auth/editprofile`, userBody).then(resp => {
    this.setState({
      first_name: resp.data[0].first_name,
      last_name: resp.data[0].last_name,
      email: resp.data[0].email,
      profile_pic: resp.data[0].profile_pic,
      bio: resp.data[0].bio,
      password: ""
    });
  });
}

render() {
  const { hidden, show } = this.props;
  return (
    <div
      className={
        hidden
          ? "settings-modal hidden"
          : show
            ? "settings-modal show"
            : "settings-modal no-show"
      }
    >
      <div
        style={{
          height: "calc(100% - 64px)",
          display: "flex",
          justifyContent: "center"
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
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  width: "50%",
                  backgroundColor: "rgba(0,0,0,.1)"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "60%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "5%"
                  }}
                >
                  {this.state.isLoading?<Progress style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <CircularProgress />
          </Progress>:<img
                    src={this.state.profile_pic}
                    alt="profile picture"
                    style={{
                      width: "80%",
                      height: "100%",
                      backgroundSize: "cover"
                    }}
                  />}
                </div>
          
          <input type="file" onChange={this.handlePhoto} />
                <TextField
                  id="standard-multiline-fixed"
                  label="About Me"
                  multiline
                  rows={8}
                  value={this.state.bio}
                  onChange={e => this.handleInputChange("bio", e.target.value)}
                  style={{ marginTop: "10px", width: "90%" }}
                  variant="outlined"
                />
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderLeft: "solid 1px rgba(0,0,0,.2)"
                }}
              >
                <h2>Your Profile</h2>
                <TextField
                  style={{
                    width: "90%"
                  }}
                  id="outlined-name"
                  label="First Name"
                  // className={classes.textField}
                  value={this.state.first_name}
                  onChange={e =>
                    this.handleInputChange("first_name", e.target.value)
                  }
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  style={{
                    width: "90%"
                  }}
                  id="outlined-name"
                  label="Last Name"
                  // className={classes.textField}
                  value={this.state.last_name}
                  onChange={e =>
                    this.handleInputChange("last_name", e.target.value)
                  }
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  style={{
                    width: "90%"
                  }}
                  id="outlined-name"
                  label="Email"
                  // className={classes.textField}
                  value={this.state.email}
                  onChange={e =>
                    this.handleInputChange("email", e.target.value)
                  }
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  style={{
                    width: "90%"
                  }}
                  id="outlined-name"
                  label="New Password"
                  // className={classes.textField}
                  onChange={e =>
                    this.handleInputChange("password", e.target.value)
                  }
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={this.state.password}
                />
                <div
                  style={{
                    display: "flex",
                    width: "90%",
                    justifyContent: "flex-end"
                  }}
                >
                  <Button
                    style={{ width: "33%", padding: "3%" }}
                    variant="contained"
                    color="primary"
                    onClick={() => this.updateUser()}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </Paper>
          )}
      </div>
    </div>
  );
}
}

export default Settings;





   

        
