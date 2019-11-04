import React from "react";
import {Form, Button, Nav} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import localStorage from 'local-storage';

 class Login extends React.Component {
     constructor(props){
         super(props);

         this.username = React.createRef();
         this.password = React.createRef();
         this.routeChange = this.routeChange.bind(this);

         this.handleLogin = this.handleLogin.bind(this);

         this.state = {
            shouldShowInvalidCredentialsError: false
         }
     }

    handleLogin(){
        let localLogin = "http://localhost:7071/api/login";
        let prodLogin = "https://minitwitter.azurewebsites.net/api/login?code=QdF1TRaSscATTZMtoDxGUK3v/atd047aVyFmwd42fuW8puLZhPIoJg==";

        fetch(localLogin, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username.value,
                    password: this.password.value
                })
            })
            .then(res => res.json())
            .then(json => {
                if(json.error === undefined){
                    localStorage.set('username', json.username);
                    this.routeChange();
                }else{
                    this.setState({shouldShowInvalidCredentialsError: true})
                }
            })
    }

    routeChange() {
        let path = `/app`;
        this.props.history.push(path);
      }

    render(){
        return(
            <div className="container">
                <h1 style={{fontSize: '5em', marginBottom: '1em', color: '#006bde'}}>
                    Mini Twitter
                </h1>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter your username" ref= {(username) => this.username = username}/>
                        {this.state.shouldShowInvalidCredentialsError ? 
                            <Form.Text style={{fontSize: "1em", paddingBottom: "0.5em", color: "red"}}>
                                Invalid credentials.
                            </Form.Text> : ''
                        }
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref= {(password) => this.password = password}/>
                    </Form.Group>
                    <Form.Text className="text-muted" style={{fontSize: "1.2em", paddingBottom: "0.5em"}}>
                    Not registered yet? Please sign up <Nav.Link href="/signup" style={{display: "contents", padding: 0}} >here</Nav.Link>.
                    </Form.Text>
                    
                    <Button variant="primary" onClick={this.handleLogin}>
                        Log in
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(Login);