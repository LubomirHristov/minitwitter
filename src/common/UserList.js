import React from 'react';
import User from './User';

class UserList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.type === "followers-only"){
            return(
                <div>
                    {this.props.followers.map((user, index) => <User key={index} user={user} status="follower" update={this.props.update}/>)}
                </div>
            )
        }else if(this.props.type === "following-only"){
            return(
                <div>
                {this.props.following.map((user, index) => <User key={index} user={user} status="followed" update={this.props.update}/>)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.props.notFollowedUsers.map((user, index) => <User key={index} user={user} status="not followed" update={this.props.update}/>)}
                    {this.props.following.map((user, index) => <User key={index} user={user} status="followed" update={this.props.update}/>)}
                </div>
            )
        }
    }
}

export default UserList;