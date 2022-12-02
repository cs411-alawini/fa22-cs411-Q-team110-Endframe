import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class JoinTeam extends Component {

    constructor(props) {

        super(props);
        this.state = {

            userID: '',
            teamID:'',
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateUserIDValue(event) {
        this.setState({userID: event.target.value})
    }
    updateTeamIDValue(event) {
        this.setState({teamID: event.target.value})
    }

    joinTeam(){
          let endpoint = "/joinTeam"
          fetch(`${this.scheme}${this.base_url}${endpoint}?userID=${this.state.userID}&teamID=${this.state.teamID}`, {
                method: 'POST',
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
            <div className='join-team'>
                <div>
                    <span className="section-header"> Join Team: </span>
                </div>
                <div>
                   <span>Team: {this.props.outputText}</span> 
                </div>
                <div >
                    <div>
                        <span>Team ID</span>
                        <input
                            className='teamID'
                            type="text"
                            value={this.state.teamID}
                            onChange={(event) => this.updateTeamIDValue(event)}
                        />
                    </div>
                    <div>
                        <span>User ID</span>
                        <input
                            className='userID'
                            type="text"
                            value={this.state.userID}
                            onChange={(event) => this.updateUserIDValue(event)}
                        />
                    </div>
                </div>
                <button onClick={() => this.joinTeam()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default JoinTeam