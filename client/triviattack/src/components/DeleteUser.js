import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class DeleteUserFromTeam extends Component {

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

    deleteUserFromTeam(){
          let endpoint = "/deleteUserFromTeam"
          fetch(`${this.scheme}${this.base_url}${endpoint}?userID=${this.state.userID}&teamID=${this.state.teamID}`, {
                method: 'DELETE',
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
            <div className='delete-user-from-team'>
                <div>
                    <span className="section-header"> Delete User From Team: </span>
                </div>
                <div>
                   <span>Deleted User/Team: {this.props.outputText}</span> 
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
                <button onClick={() => this.deleteUserFromTeam()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default DeleteUserFromTeam