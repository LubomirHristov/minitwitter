import React from 'react';
import { Card, Form } from 'react-bootstrap'
import Markdown from 'react-remarkable';
import localStorage from 'local-storage';
import Modal from './Modal';

class Tweet extends React.Component{
    constructor(props){
        super(props);

        this.tweet = React.createRef();

        this.handleEditTweet = this.handleEditTweet.bind(this);
        this.handleDeleteTweet = this.handleDeleteTweet.bind(this);

        this.state = {
            showModal: false
        }
    }

    handleEditTweet(){
        let localEditTweet = "http://localhost:7071/api/editTweet";
        let prodEditTweet = "https://minitwitter.azurewebsites.net/api/editTweet?code=F0XG6LvNFX7ypWqB3szD1n0XOUtDqyHaTGLoDvYXNlyXK1agytU0dQ==";

        let tweet = this.props.tweet.tweet;

        if(this.tweet !== null){
            tweet = this.tweet.value;
        }

        fetch(prodEditTweet, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: localStorage.get('username'),
                timestamp: this.props.timestamp,
                tweet: tweet,
                dateId: this.props.tweet.dateId
            })
        })
    }

    handleDeleteTweet(){
        let localDeleteTweet = "http://localhost:7071/api/deleteTweet";
        let prodDeleteTweet = "https://minitwitter.azurewebsites.net/api/deleteTweet?code=FsR8tBdUN5z0YbkTiJ1MpuV9r1v3QL1T/z4JcovDub3ciOSTXWTwJA==";

        let tweet = this.props.tweet.tweet;

        if(this.tweet !== null){
            tweet = this.tweet.value;
        }
        
        fetch(prodDeleteTweet, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: localStorage.get('username'),
                timestamp: this.props.timestamp,
                tweet: tweet,
                dateId: this.props.tweet.dateId
            })
        })
        .then(res => this.props.update())
    }

    render(){
        return(
            <Card style={{marginTop: "1em"}}>
                <Card.Body>
                    <Card.Title>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center '}}>
                            <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png" alt="avatar" style={{width: '2.5em'}}/>
                            <div style={{marginLeft: '0.3em'}}>
                                <div>
                                    {this.props.tweet.user}
                                </div>
                                <div style={{color: '#616770', fontSize: '0.8em'}}>
                                    {new Date(Date.parse(this.props.tweet.timestamp)).toLocaleString()}
                                </div>
                            </div>
                            {this.props.tweet.user === localStorage.get('username') ?
                            <div style={{display: 'flex', alignItems:'row', marginLeft: 'auto'}}>
                                <div className="tweet-operation" onClick={() => this.setState({showModal: true})} style={{marginRight: '0.5em'}}>Edit</div>
                                <div className="tweet-operation" onClick={this.handleDeleteTweet}>Delete</div>
                            </div> : ''}
                        </div>
                    </Card.Title>
                    <Card.Text>
                        <Markdown source={this.props.tweet.tweet} />
                    </Card.Text>
                </Card.Body>
                <Modal size={'xl'} title={"Edit tweet"} show={this.state.showModal} handleClose={() => this.setState({showModal: false})} handleEditTweet={this.handleEditTweet} update={this.props.update}>
                    <Form>
                        <Form.Group controlId="editTweetForm">
                            <Form.Control style={{height: '30em'}} size={'lg'} as="textarea" defaultValue={this.props.tweet.tweet} ref={(tweet) => this.tweet = tweet}/>
                        </Form.Group>
                    </Form>
                </Modal>
            </Card>
        )
    }
}

export default Tweet;