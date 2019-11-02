import React from 'react';
import User from './User';

class UserList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {this.props.notFollowedUsers.map((user, index) => <User key={index} user={user} status="not followed" update={this.props.update}/>)}
                {this.props.following.map((user, index) => <User key={index} user={user} status="followed" update={this.props.update}/>)}
            </div>
        )
    }
}

export default UserList;