import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class TeamMembers extends Component {

    constructor(props) {

        super(props);
        this.state = {

            userID:this.props.userID,
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateUserIDValue(event) {
        this.setState({userID: event.target.value})
    }


    getTeamMembers(){
          let endpoint = "/getTeamMembers"
          fetch(`${this.scheme}${this.base_url}${endpoint}?userID=${this.state.userID}`, {
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
            <div className='get-team-members'>
                <div>
                    <span className="section-header"> Get Team Members: </span>
                </div>
                <div>
                   <span>Team Members: {this.props.outputText}</span> 
                </div>
                <div >
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
                <button onClick={() => this.getTeamMembers()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default TeamMembers