import React from 'react';
import Tweet from './Tweet';

class TweetList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            this.props.tweets.map((tweet, index) => <Tweet key={index} tweet={tweet}/>)
        )
    }
}

export default TweetList;