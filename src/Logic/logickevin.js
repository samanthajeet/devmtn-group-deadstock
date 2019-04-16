import axios from 'axios';

export function logout() {
   axios.post("/api/auth/logout");
    this.props.clearUser();
    this.props.history.push("/");
}

export function getSignedRequest (files){
    files.map(file => {
      let fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;
      axios
        .get("/api/signs3", {
          params: {
            "file-name": fileName,
            "file-type": file.type
          }
        })
        .then(response => {
          const { signedRequest, url } = response.data;
        });
    });
  };

  export function getContacts(){
    let users = axios.get('/api/users')
    this.setState({users:users.data})
}

