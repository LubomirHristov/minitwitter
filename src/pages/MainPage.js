import React from 'react';
import Navbar from '../common/Navbar';
import { Card, Button, Form } from 'react-bootstrap';
import localStorage from 'local-storage';
import TweetList from '../common/TweetList';
import UserList from '../common/UserList';

class MainPage extends React.Component{
    constructor(props){
        super(props);

        this.tweet = React.createRef();

        this.handleTweet = this.handleTweet.bind(this);
        this.update = this.update.bind(this);

        this.state = {
            allUsers: [],
            followers: [],
            following: [],
            tweets: []
        }
    }

    componentWillMount(){
       this.update();
    }

    update(){
        Promise.all([
            fetch("http://localhost:7071/api/getUsers"),
            fetch("http://localhost:7071/api/getFollowing", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: localStorage.get('username')
                })
            }),
            fetch("http://localhost:7071/api/getFollowers", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: localStorage.get('username')
                })
            })
        ])
        .then(([resUsers, resFollowing, resFollowers]) => Promise.all([resUsers.json(), resFollowing.json(), resFollowers.json()]))
        .then(([users, following, followers]) => {
            fetch("http://localhost:7071/api/getTweets", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: localStorage.get('username'),
                    followed: following.users
                })
            })
            .then(res => res.json())
            .then(tweets => {
                this.setState({
                    allUsers: users.users,
                    followers: followers.users,
                    following: following.users,
                    tweets: tweets.tweets
                })
            })
        })
    }

    handleTweet(){
        fetch("http://localhost:7071/api/postTweet", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: localStorage.get('username'),
                tweet: this.tweet.value
            })
        })
        .then(res => res.json())
        .then(json => {
            let newTweet = {
                user: json.username,
                tweet: json.tweet   
            };
            let currentState = this.state.tweets;
            let newState = [newTweet].concat(currentState);
            this.setState({tweets: newState});
        })
    }

    render(){
        let myTweets = this.state.tweets.filter(tweet => tweet.user === localStorage.get('username'))
        let notFollowedUsers = this.state.allUsers.filter(user => !this.state.following.includes(user))

        return(
            <div>
                <Navbar username={localStorage.get('username')} />
                <div className="row">
                    <div className="col-2" style={{left: '1%'}}>
                        <h2>{localStorage.get('username')}</h2>
                        <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png" alt="avatar" style={{width: '5em'}}/>
                        <div>{myTweets.length} tweets</div>
                        <div>{this.state.followers.length} followers</div>
                        <div>{this.state.following.length} following</div>
                    </div>
                    <div className="col-7 main-page">
                        <Card>
                            <Card.Header>Create a tweet</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formTweet">
                                        <Form.Control as="textarea" rows="3" placeholder="What's on your mind?" ref={(tweet) => this.tweet = tweet}/>
                                    </Form.Group>
                                </Form>
                                <Button variant="primary" onClick={this.handleTweet}>
                                    Tweet
                                </Button>
                            </Card.Body>
                        </Card>
                        <TweetList tweets={this.state.tweets}/>
                    </div>
                    <div className="col-3">
                        <Form style={{margin: '1em 0 1em 0'}}>
                            <Form.Control
                                type="text"
                                placeholder="Search for people">
                                
                            </Form.Control>
                        </Form>
                        <UserList following={this.state.following} notFollowedUsers={notFollowedUsers} update={this.update}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage;