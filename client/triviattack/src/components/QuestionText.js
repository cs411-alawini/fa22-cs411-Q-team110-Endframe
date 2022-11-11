import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class QuestionText extends Component {

    constructor(props) {

        super(props);
        this.state = {

            questionID: this.props.questionID,
            questionText: this.props.questionText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateSearchValue(event) {
        this.setState({questionID: event.target.value})
    }

    searchForQuestionText(){
          let endpoint = "/getQuestionText"
          fetch(`${this.scheme}${this.base_url}${endpoint}?qid=${this.state.questionID}`, {
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
                this.props.handler(text, this.state.questionID)
            });

          
    }

    componentDidMount() {
        this.setState({questionText: this.props.questionText})
    }


    render() {
        return (
            <div className='questionText'>
                <div>
                    <span className="section-header"> Question Selector: </span>
                </div>
                <div>
                   <span>QuestionID: {this.props.questionID}</span> 
                </div>
                <div>
                   <span>Question Text: {this.props.questionText}</span> 
                </div>
                <input
                    type="text"
                    value={this.state.searchValue}
                    onChange={(event) => this.updateSearchValue(event)}
                />
                <button onClick={() => this.searchForQuestionText()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default QuestionText