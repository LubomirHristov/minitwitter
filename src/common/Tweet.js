import React from 'react';
import { Card } from 'react-bootstrap'

class Tweet extends React.Component{
    constructor(props){
        super(props)
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
                                    {this.props.tweet.time}
                                </div>
                            </div>
                        </div>
                    </Card.Title>
                    <Card.Text>
                    {this.props.tweet.tweet}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Tweet;