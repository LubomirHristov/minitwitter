import React from 'react';
import { Card, Button } from 'react-bootstrap';
import localStorage from 'local-storage';

class User extends React.Component{
    constructor(props){
        super(props);

        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
    }

    followUser(){
        let localFollowUser = "http://localhost:7071/api/followUser";
        let prodFollowUser = "https://minitwitter.azurewebsites.net/api/followUser?code=GGzBbcL0R1MP7nyXXJngdiCKHarG5GlVK3BxeVSNaT5fERxolEcvzw==";

        fetch(prodFollowUser, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: localStorage.get('username'),
                followed: this.props.user
            })
        }).then(res => this.props.update())
    }

    unfollowUser(){
        let localUnfollowUser = "http://localhost:7071/api/unfollowUser";
        let prodUnfollowUser = "https://minitwitter.azurewebsites.net/api/unfollowUser?code=hApHatIY7wdYyMka3xLBDX1JvTbGbQAKvvOoz8Nssdj14HaIIdrheg==";

        fetch(prodUnfollowUser, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: localStorage.get('username'),
                unfollowed: this.props.user
            })
        }).then(res => this.props.update())
    }

    render(){
        let followButton = '';
        if(this.props.status === "followed"){
            followButton = 
            <Button 
                variant="light"
                style={{marginLeft: 'auto', marginRight: '0.3em', color: 'red', border: '1px solid rgba(0,0,0,.125)'}}
                onClick={this.unfollowUser}>
                Unfollow
            </Button>
        }else if(this.props.status === "not followed" && this.props.user !== localStorage.get('username')){
            followButton = 
            <Button style={{marginLeft: 'auto', marginRight: '0.3em'}} onClick={this.followUser}>
                Follow
            </Button>
        };

        return(
            <Card style={{borderTop: 'none'}}>
                <Card.Title>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center ', padding: '0.3em 0.3em 0 0.3em'}}>
                            <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png" alt="avatar" style={{width: '2.5em'}}/>
                            <div style={{marginLeft: '0.3em'}}>
                                <div>
                                    {this.props.user}
                                </div>
                            </div>
                            {followButton}
                        </div>
                    </Card.Title>
            </Card>
        )
    }
}

export default User;