import React from 'react';
import TweetList from '../common/TweetList';
import Navbar from '../common/Navbar';
import localStorage from 'local-storage';

class Account extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Navbar username={localStorage.get('username')}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <h2>{localStorage.get('username')}</h2>
                            <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png" style={{width: '5em'}}/>
                            <div>12 tweets</div>
                            <div>150 followers</div>
                            <div>114 following</div>
                        </div>
                        <div className="col-8">
                            <h3>Tweets</h3>
                            <TweetList tweets={[
                                        {
                                            username: "Lubo",
                                            tweet: "This is my first tweet! Wohooo!",
                                            time: "22 minutes ago"
                                        },
                                        {
                                            username: "Kekerinio",
                                            tweet: "I am feeling ill today :(",
                                            time: "24 minutes ago"
                                        }
                                    ]}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;