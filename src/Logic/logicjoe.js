import axios from 'axios';

export function logout() {
    axios.post("/api/auth/logout");
     this.props.clearUser();
     this.props.history.push("/");
 }

 export function getContacts() {
    let users = axios.get("/api/users");
    this.setState({ users: users.data });
  };

  
export function handleSwitchToCloset(){
    return true
};