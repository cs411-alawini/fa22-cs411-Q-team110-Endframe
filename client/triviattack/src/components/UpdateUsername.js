import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class UpdateUsername extends Component {

    constructor(props) {

        super(props);
        this.state = {

            newUsername:this.props.newUsername,
            userID:this.props.userID,
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateUsernameValue(event) {
        this.setState({newUsername: event.target.value})
    }

    updateUserIDValue(event) {
        this.setState({userID: event.target.value})
    }


    setNewUsername(){
          let endpoint = "/updateUsername"
          fetch(`${this.scheme}${this.base_url}${endpoint}?newUsername=${this.state.newUsername}&userID=${this.state.userID}`, {
                method: 'PUT',
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
            <div className='set-new-username'>
                <div>
                    <span className="section-header"> Set New Username: </span>
                </div>
                <div>
                   <span>New Username: {this.props.outputText}</span> 
                </div>
                <div >
                    <div>
                        <span>Username</span>
                        <input
                            className='username'
                            type="text"
                            value={this.state.newUsername}
                            onChange={(event) => this.updateUsernameValue(event)}
                        />
                    </div>
                    <div>
                        <span>User ID</span>
                        <input
                            className='user-id'
                            type="text"
                            value={this.state.userID}
                            onChange={(event) => this.updateUserIDValue(event)}
                        />
                    </div>
                </div>
                <button onClick={() => this.setNewUsername()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default UpdateUsername