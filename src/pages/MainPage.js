import React from 'react';
import Navbar from '../common/Navbar';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import localStorage from 'local-storage';
import TweetList from '../common/TweetList';
import UserList from '../common/UserList';
import Modal from '../common/Modal';
import SearchBar from '../common/SearchBar';

class MainPage extends React.Component{
    constructor(props){
        super(props);

        this.tweet = React.createRef();

        this.handleTweet = this.handleTweet.bind(this);
        this.update = this.update.bind(this);

        this.state = {
            dataIsReady: false,
            allUsers: [],
            followers: [],
            following: [],
            tweets: [],
            showTweets: false,
            showFollowers: false,
            showFollowing: false
        }

    }

    componentWillMount(){
       this.update();
    }

    update(){
        let localGetUsers = "http://localhost:7071/api/getUsers";
        let prodGetUsers = "https://minitwitter.azurewebsites.net/api/getUsers?code=E1spIs9tUceYX5UzjP4sfqATUdwVm4JwAbZB9uruVJH8z7qVWWDK5A==";

        let localGetFollowing = "http://localhost:7071/api/getFollowing";
        let prodGetFollowing = "https://minitwitter.azurewebsites.net/api/getFollowing?code=M9lK114nl3ahBKOkCGJ4mSsSOBgzTaROIcXncy9MWJ5qydH06gsH4g==";

        let localGetFollowers = "http://localhost:7071/api/getFollowers";
        let prodGetFollowers = "https://minitwitter.azurewebsites.net/api/getFollowers?code=ly4uWcisDghMBkROUm1G5dh9MKXHCa3RtN1YTgiPE5rSnurQvywqXQ==";

        let localGetTweets = "http://localhost:7071/api/getTweets";
        let prodGetTweets = "https://minitwitter.azurewebsites.net/api/getTweets?code=Fj8kGdQRi1Fu80S0heaV3zbDy7DTPWbAo4uekp1hsp7fHVjvalqNyQ==";
        
        Promise.all([
            fetch(localGetUsers),
            fetch(localGetFollowing, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: localStorage.get('username')
                })
            }),
            fetch(localGetFollowers, {
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
            fetch(localGetTweets, {
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
                    dataIsReady: true,
                    allUsers: users.users,
                    followers: followers.users,
                    following: following.users,
                    tweets: tweets.tweets
                })
            })
        })
    }

    handleTweet(){
        let localPostTweet = "http://localhost:7071/api/postTweet";
        let prodPostTweet = "https://minitwitter.azurewebsites.net/api/postTweet?code=UJ6qRK7Oc92L65vhn/qtnNNXF461oG02s5X2KIB04GTyWJNEsbF10w==";

        fetch(localPostTweet, {
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
            console.log(json.timestamp)
            console.log(json.dateId)
            let newTweet = {
                user: json.username,
                tweet: json.tweet,
                timestamp: json.timestamp,
                dateId: json.dateId
            };
            let currentState = this.state.tweets;
            let newState = [newTweet].concat(currentState);
            this.setState({tweets: newState});
        })
    }

    render(){
        let myTweets = this.state.tweets.filter(tweet => tweet.user === localStorage.get('username'))
        let notFollowedUsers = this.state.allUsers.filter(user => !this.state.following.includes(user))

        if(!localStorage.get('username')){
            return <div>Access denied!</div>
        }else if(!this.state.dataIsReady){
            return <Spinner className="loading-spinner" animation="border" variant="primary" />
        }else{
            return(
                <div>
                    <Navbar username={localStorage.get('username')} />
                    <div className="row">
                        <div className="col-2" style={{textAlign: 'center', marginTop: '1em', fontSize: '1.5em'}}>
                            <h2 style={{overflowWrap: 'break-word'}}>{localStorage.get('username')}</h2>
                            <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png" alt="avatar" style={{width: '5em'}}/>
                            <div className="user-info" onClick={() => this.setState({showTweets: true})}>{myTweets.length} tweets</div>
                            <div className="user-info" onClick={() => this.setState({showFollowers: true})}>{this.state.followers.length} followers</div>
                            <div className="user-info" onClick={() => this.setState({showFollowing: true})}>{this.state.following.length} following</div>
                        </div>
                        <div className="col-7 main-page">
                            <Card style={{marginBottom: '5em'}}>
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
                            <TweetList tweets={this.state.tweets} update={this.update}/>
                        </div>
                        <div className="col-3">
                            <SearchBar following={this.state.following} notFollowedUsers={notFollowedUsers} update={this.update}/>
                        </div>
                    </div>
                    <Modal scrollable size={'xl'} title={"Tweets"} show={this.state.showTweets} handleClose={() => this.setState({showTweets: false})}>
                        <TweetList tweets={myTweets}/>
                    </Modal>
                    <Modal title={"Followers"} show={this.state.showFollowers} handleClose={() => this.setState({showFollowers: false})}>
                        <UserList type={"followers-only"} followers={this.state.followers} update={this.update}/>
                    </Modal>
                    <Modal title={"Following"} show={this.state.showFollowing} handleClose={() => this.setState({showFollowing: false})}>
                        <UserList type={"following-only"} following={this.state.following} update={this.update}/>
                    </Modal>
                </div>
            )
        }
    }
}

export default MainPage;