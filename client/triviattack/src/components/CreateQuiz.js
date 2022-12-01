import '../App.css';
import React, {Component} from 'react';
import Select from 'react-select';
import config from '../config/config'
import QuestionText, {updateSearchValue, searchForQuestionText, testfunction} from './QuestionText';
import TakeQuiz from './TakeQuiz';

const categories = [
    { label: "Literature", value: 1 },
    { label: "Science", value: 2 },
    { label: "History", value: 3 },
    { label: "Religion", value: 4 },
    { label: "Mythology", value: 5 },
    { label: "Philosophy", value: 6 },
    { label: "Fine Arts", value: 7 },
    { label: "Social Science", value: 8 },
    { label: "Geography", value: 9 },
    { label: "Trash", value: 10 },
  ];
  
  const difficulty = [
    { label: "College", value: 1 },
    { label: "Open", value: 2 },
  ];

class CreateQuiz extends Component {

    constructor(props) {

        super(props);
        this.state = {

            category: '',
            difficulty: '',
            questionID: '',
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
        this.question_list = '';
    }

    updateCategoryValue(event) {
        this.setState({category: event.label})

    }
    updateDifficultyValue(event) {
        this.setState({difficulty: event.label})
    }

    createNewQuiz(){
          let endpoint = "/createQuiz"
          fetch(`${this.scheme}${this.base_url}${endpoint}?category=${this.state.category}&difficulty=${this.state.difficulty}`, {
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
                this.question_list = text;
                // console.log(this.question_list)
                this.readQuestions();
                this.props.handler(text)
            });

          
    }

    componentDidMount() {
        this.setState({outputText: this.props.outputText})
    }

    readQuestions() { 
        // var questions_json = JSON.stringify(this.question_list);
        var parsed_questions = JSON.parse(this.question_list);
        var question_id_dict = parsed_questions.Msg;
        var num_questions = Object.keys(question_id_dict).length
        var qid_array = []
        for (let i = 0; i < num_questions - 1; i++) {
            qid_array.push(question_id_dict[i].question)
        }
        console.log(qid_array);
        // for (let i = 0; i < length(qid_array); i ++) {
            // testfunction(qid_array[0])
            // this.setState({questionID: qid_array[0]})
            // console.log(this.state.questionID)
            // this.searchForQuestionText()
            // QuestionText.searchForQuestionText()
            // console.log(QuestionText.props.questionText)
        // }
    }


    render() {
        return (
            <div className='createQuiz'>
                <div>
                    <span className="section-header"> Create New Quiz: </span>
                </div>
                <div>
                   <span>New Quiz: {this.props.outputText}</span> 
                </div>
                {/* <div >
                    <input
                        className='category'
                        type="text"
                        value={this.state.category}
                        onChange={(event) => this.updateCategoryValue(event)}
                    />
                    <input
                        className='difficulty'
                        type="text"
                        value={this.state.difficulty}
                        onChange={(event) => this.updateDifficultyValue(event)}
                    />
                </div> */}
                <div >
                    <Select onChange={(event) => this.updateCategoryValue(event)}
                        placeholder = "Category"
                        options = { categories } 
                        value={this.state.selected} 
                    />          
                    <Select onChange={(event) => this.updateDifficultyValue(event)}
                        placeholder = "Difficulty"
                        options = { difficulty } 
                        value={this.state.selected} 
                    />
                </div>
                <button onClick={() => this.createNewQuiz()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default CreateQuiz