import React from 'react';
import { Form } from 'react-bootstrap';
import UserList from './UserList';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.input = React.createRef();

        this.state = {
            input: ''
        }
    }

    render(){
        let following=this.props.following.filter(user => user.startsWith(this.state.input))
        let notFollowedUsers=this.props.notFollowedUsers.filter(user => user.startsWith(this.state.input))

        return(
            <div>
                <Form style={{margin: '1em 0 1em 0'}}>
                    <Form.Control
                        type="text"
                        placeholder="Search for people"
                        ref= {(input) => this.input = input}
                        onChange={() => this.setState({input: this.input.value})}>
                    </Form.Control>
                </Form>
                <UserList type={"following-and-not-followed"} following={following} notFollowedUsers={notFollowedUsers} update={this.props.update}/>
            </div>
        )
    }
}

export default SearchBar;