import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class SubmitAnswer extends Component {

    constructor(props) {

        super(props);
        this.state = {

            userAnswer:this.props.answer,
            userID:this.props.userID,
            trueAnswer:this.props.answer,
            isCorrect:this.props.isCorrect,
            questionID:this.props.questionID,
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateAnswerValue(event) {
        this.setState({userAnswer: event.target.value})
    }

    updateQuestion(event) {
        this.setState({questionID: event.target.value})
    }

    updateUserID(event) {
        this.setState({userID: event.target.value})
    }


    submitAnswer(){
          let endpoint = "/submitAnswer"
          let answerBody = {
            "questionID": "",
            "userID": "",
            "quizID": "",
            "userAnswer":""

          }
          fetch(`${this.scheme}${this.base_url}${endpoint}?questionID=${this.state.questionID}&userID=${this.state.userID}&userAnswer=${this.state.userAnswer}&question=${this.state.questionID}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: answerBody
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