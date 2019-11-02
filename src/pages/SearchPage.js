import React from 'react';
import { Form } from 'react-bootstrap';
import Navbar from '../common/Navbar';
import localStorage from 'local-storage';
import UserList from '../common/UserList';

class SearchPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            users: []
        }
    }

    componentWillMount(){
        let urls = ["http://localhost:7071/api/getUsers", "http://localhost:7071/api/getFollowers"]
        // fetch(, {
        //     method: 'GET',
        //     mode: 'cors'
        // })
        // .then(res => res.json())
        // .then(json => this.setState({users: json.users}))
    }

    render(){
        return(
            <div>
                <Navbar username={localStorage.get('username')}/>
                    <div className="container">
                    <Form style={{marginTop: '1em'}}>
                        <Form.Control
                            type="text"
                            placeholder="Search for people">
                            
                        </Form.Control>
                    </Form>
                    <UserList users={this.state.users}/>
                </div>
            </div>
        )
    }
}

export default SearchPage;