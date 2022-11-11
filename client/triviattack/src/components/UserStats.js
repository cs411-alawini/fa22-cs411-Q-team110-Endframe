import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class UserStats extends Component {

    constructor(props) {

        super(props);
        this.state = {

            username:this.props.username,
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateUsernameValue(event) {
        this.setState({username: event.target.value})
    }


    getUserStats(){
          let endpoint = "/getStats"
          fetch(`${this.scheme}${this.base_url}${endpoint}?username=${this.state.username}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then((resp) => {
                if(resp.ok){
                    return resp.text()
                }
            })
            .then((text) => {
                this.props.handler(text)
            });

          
    }

    componentDidMount() {
        this.setState({outputText: this.props.outputText})
    }


    render() {
        return (
            <div className='get-user-stats'>
                <div>
                    <span className="section-header"> Get User Stats: </span>
                </div>
                <div>
                   <span>User Stats: {this.props.outputText}</span> 
                </div>
                <div >
                    <div>
                        <span>Username</span>
                        <input
                            className='username'
                            type="text"
                            value={this.state.username}
                            onChange={(event) => this.updateUsernameValue(event)}
                        />
                    </div>
                </div>
                <button onClick={() => this.getUserStats()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default UserStats