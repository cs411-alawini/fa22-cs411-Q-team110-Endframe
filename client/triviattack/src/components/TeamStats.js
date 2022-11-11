import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class TeamStats extends Component {

    constructor(props) {

        super(props);
        this.state = {

            teamID:this.props.teamID,
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateTeamIDValue(event) {
        this.setState({teamID: event.target.value})
    }


    getTeamStats(){
          let endpoint = "/getTeamStats"
          fetch(`${this.scheme}${this.base_url}${endpoint}?teamID=${this.state.teamID}`, {
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
            <div className='get-team-stats'>
                <div>
                    <span className="section-header"> Get Team Stats: </span>
                </div>
                <div>
                   <span>Team Stats: {this.props.outputText}</span> 
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
                </div>
                <button onClick={() => this.getTeamStats()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default TeamStats