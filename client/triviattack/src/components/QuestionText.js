import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'
import CreateQuiz, {qid_array} from './CreateQuiz';
import SubmitAnswer from './SubmitAnswer';

export class QuestionText extends Component {

    constructor(props) {

        super(props);
        this.state = {

            questionID: this.props.questionID,
            questionText: this.props.questionText,
            questionList: this.props.questionList,
            quizID: this.props.quizID,
            userID: this.props.userID,
            userResponseText: "",
            allQuestionTexts: <div></div>,
            questionIndex: 0,
            questionTextArray: []
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
        
    }
    updateQuestionIndex(event){
        this.setState({questionIndex:this.state.questionIndex+1})
    }
    userResponseHandler(text) {
        this.setState({userResponseText: text});
    }

    updateSearchValue(event) {
        this.setState({questionID: event.target.value})
        // this.setState({questionID: QUESTION_ID})
    }

    searchForQuestionText(questionID){
        console.log("searching for question " + questionID)
        let endpoint = "/getQuestionText"
        let questionText = ""
        fetch(`${this.scheme}${this.base_url}${endpoint}?qid=${questionID}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then((resp) => {
                if(resp.ok){
                    let text 
                    return resp.text()
                }
            })
            .then((text) => {
                // this.props.handler(text, questionID)
                const responseObj = JSON.parse(text)
                this.setState({questionText:responseObj.Msg[0].questionText})
                console.log(this.state.questionText)
                return this.state.questionText
            }
            );
          //  return this.state.questionText
        
    }

    testfunction(newQuestionID){
        this.setState({questionID: newQuestionID})
    }

    componentDidMount() {
        
        this.setState({questionText: this.props.questionText})
    }

    componentDidUpdate() {

        let qText = ""
        let qarray = []
        for (let i = 0; i < 10; i++ ){
            qText = this.searchForQuestionText(this.state.questionList[i])
            qarray.push(qText)
            // this.setState({questionTextArray: [...this.state.questionTextArray, qText]})
        }

        console.log(qarray)
        // do something
        // let qtext_array = []
        // for (let i = 0; i < 10; i++) {
        //     qtext_array.push(this.searchForQuestionText(this.props.questionList[i]))
        // }
        // console.log(qtext_array)
        
    //     this.state.allQuestionTexts = this.props.questionList.map((item, index) => {
    //         let qText = this.searchForQuestionText(item)
    //         return (
    //         <div>
    //             <span key={item}>{qText}</span>
    //             <div className="submit-answer">
    //                 <SubmitAnswer handler={this.userResponseHandler.bind(this)} 
    //                 userID={this.props.userID} 
    //                 questionID={item} 
    //                 quizID={this.props.quizID} 
    //                 outputText={this.state.userResponseText}/>
    //             </div>
    //         </div>
    //         )
    //     }
    //    );
    // for (let i = 0; i < 10; i++) {
        console.log(this.state.questionIndex)
        console.log(this.props.questionList)
        let item = qarray[this.state.questionIndex]
       // let qText = this.searchForQuestionText(item)
    //    console.log(this.state.questionTextArray)
        console.log(this.state.questionText)
        this.state.allQuestionTexts = //return (
        <div>
            <span key={item}>{this.state.questionText}</span>
            <div className="submit-answer">
                <SubmitAnswer handler={this.userResponseHandler.bind(this)} 
                userID={this.props.userID} 
                questionID={item} 
                quizID={this.props.quizID}
                questionIndexHandler={this.updateQuestionIndex.bind(this)} 
                outputText={this.state.userResponseText}/>
            </div>
         </div>

      }
      


    render() {
        console.log("render questions " + this.props.questionList)
        return (
            <div className='questionText'>
                <div>
                    <span className="section-header"> Question Text: </span>
                </div>
                <div>
                   <span>QuestionID: {this.props.questionID}</span> 
                </div>
                <div>
                    {this.state.allQuestionTexts}
                </div>
                <input
                    type="text"
                    value={this.state.searchValue}
                    onChange={(event) => this.updateSearchValue(event)}
                />
                {/* <button onClick={() => this.searchForQuestionText("20")}>
                    Test Button
                </button> */}
            </div>
        );
    }
}

export default QuestionText