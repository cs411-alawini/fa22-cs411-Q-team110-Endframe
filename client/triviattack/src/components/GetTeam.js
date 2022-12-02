import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class GetTeam extends Component {

    constructor(props) {

        super(props);
        this.state = {
            teamID:'',
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateTeamIDValue(event) {
        this.setState({teamID: event.target.value})
    }

    getTeam(){
          let endpoint = "/getTeam"
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
            <div className='get-team'>
                <div>
                    <span className="section-header"> Get Team: </span>
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
                </div>
                <button onClick={() => this.getTeam()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default GetTeam