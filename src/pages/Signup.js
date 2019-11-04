import React from "react";
import {Form, Button} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import localStorage from 'local-storage';

 class Signup extends React.Component{
     constructor(props){
         super(props)

         this.username = React.createRef();
         this.password = React.createRef();
         this.confirmPassword = React.createRef();

         this.handleSubmit = this.handleSubmit.bind(this);
         this.routeChange = this.routeChange.bind(this);

         this.state = {
            shouldShowUsernameError: false,
            shouldShowPasswordError: false
         }
     }

     handleSubmit() {
         console.log("Username: " + this.username.value);
         console.log("Password: " + this.password.value);
         
         if(this.password.value === this.confirmPassword.value){
             let localRegister = "http://localhost:7071/api/register";
             let prodRegister = "https://minitwitter.azurewebsites.net/api/Register?code=sDUaRpmxcPmoCvsBJG9DR3zXI02KGlOZc3/Fg0EtY93oAezXXse2aA==";

            fetch(localRegister, {
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
                    this.routeChange();
                    localStorage.set('username', json.username)
                }else{
                    this.setState({shouldShowUsernameError: true})
                }
            })
        }else{
            this.setState({shouldShowError: true})
        }
     }

     routeChange() {
        let path = `/app`;
        this.props.history.push(path);
      }

    render(){
        return(
            <div className="container">
                <h1 style={{fontSize: '5em', marginBottom: '1em', color: '#006bde'}}>
                    Register for Mini Twitter
                </h1>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter your username" ref= {(username) => this.username = username}/>
                        {this.state.shouldShowUsernameError ? 
                            <Form.Text style={{fontSize: "1em", paddingBottom: "0.5em", color: "red"}}>
                                Username already exists.
                            </Form.Text> : ''
                        }
                    </Form.Group>
        
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref= {(password) => this.password = password}/>
                    </Form.Group>
        
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" ref= {(confirmPassword) => this.confirmPassword = confirmPassword}/>
                        {this.state.shouldShowPasswordError ? 
                            <Form.Text style={{fontSize: "1em", paddingBottom: "0.5em", color: "red"}}>
                                Passwords do not match!
                            </Form.Text> : ''
                        }
                    </Form.Group>
        
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Sign up
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(Signup);