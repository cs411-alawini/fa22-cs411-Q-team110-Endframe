import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class QuestionList extends Component {

    constructor(props) {

        super(props);
        this.state = {

            quizID:this.props.quizID,
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateQuizIDValue(event) {
        this.setState({quizID: event.target.value})
    }


    getQuizQuestions(){
          let endpoint = "/getQuiz"
          fetch(`${this.scheme}${this.base_url}${endpoint}?quizID=${this.state.quizID}`, {
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
            <div className='get-quiz-questions'>
                <div>
                    <span className="section-header"> Get Quiz Questions: </span>
                </div>
                <div>
                   <span>Quiz questions: {this.props.outputText}</span> 
                </div>
                <div >
                    <div>
                        <span>quiz ID</span>
                        <input
                            className='quizID'
                            type="text"
                            value={this.state.quizID}
                            onChange={(event) => this.updateQuizIDValue(event)}
                        />
                    </div>
                </div>
                <button onClick={() => this.getQuizQuestions()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default QuestionList