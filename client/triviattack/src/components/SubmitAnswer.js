import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class SubmitAnswer extends Component {

    constructor(props) {

        super(props);
        this.state = {

            userAnswer:this.props.answer,
            userID:this.props.userID,
            quizID:this.props.quizID,
            questionID:this.props.questionID,
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateResponse(event) {
        this.setState({userAnswer: event.target.value})
    }

    updateQuestionID(event) {
        this.setState({questionID: event.target.value})
    }

    updateUserID(event) {
        this.setState({userID: event.target.value})
    }

    updateQuizID(event) {
        this.setState({quizID: event.target.value})
    }


    submitAnswer(){
        let h = new Date()
        let currDate = h.toLocaleString().slice(0,-3)
        let endpoint = "/submitAnswer"
        let answerBody = {
        "questionID": this.state.questionID,
        "userID": this.state.userID,
        "quizID": this.state.quizID,
        "userAnswer":this.state.userAnswer,
        "date":currDate

        }
          fetch(`${this.scheme}${this.base_url}${endpoint}?questionID=${this.state.questionID}&userID=${this.state.userID}&userResponse=${this.state.userAnswer}&quizID=${this.state.quizID}&date=${currDate}`, {
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


    getNextQuestion() {
        this.props.question_index = this.props.question_index + 1
    }

    componentDidMount() {
        this.setState({outputText: this.props.outputText})
    }


    render() {
        return (
            <div className='submit-answer'>
                <div>
                    <span className="section-header"> Submit Answer: </span>
                </div>
                <div>
                   <span>Actual Answer: {this.props.outputText}</span> 
                </div>
                <div >
                    <div>
                        <span>User ID</span>
                        <input
                            className='teamID'
                            type="text"
                            value={this.state.userID}
                            onChange={(event) => this.updateUserID(event)}
                        />
                    </div>
                    <div>
                        <span>Question ID</span>
                        <input
                            className='questionID'
                            type="text"
                            value={this.state.questionID}
                            onChange={(event) => this.updateQuestionID(event)}
                        />
                    </div>
                    <div>
                        <span>Quiz ID</span>
                        <input
                            className='quizID'
                            type="text"
                            value={this.state.quizID}
                            onChange={(event) => this.updateQuizID(event)}
                        />
                    </div>
                    <div>
                        <span>User Response</span>
                        <input
                            className='response'
                            type="text"
                            value={this.state.userAnswer}
                            onChange={(event) => this.updateResponse(event)}
                        />
                    </div>
                </div>
                <button onClick={() => this.submitAnswer()}>
                    Submit Response
                </button>
            </div>
        );
    }
}

export default SubmitAnswer