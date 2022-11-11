import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'


class CreateQuiz extends Component {

    constructor(props) {

        super(props);
        this.state = {

            category: '',
            difficulty: '',
            outputText: this.props.outputText
        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateCategoryValue(event) {
        this.setState({category: event.target.value})
    }
    updateDifficultyValue(event) {
        this.setState({difficulty: event.target.value})
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
                this.props.handler(text)
            });

          
    }

    componentDidMount() {
        this.setState({outputText: this.props.outputText})
    }


    render() {
        return (
            <div className='createQuiz'>
                <div>
                    <span className="section-header"> Create new Quiz: </span>
                </div>
                <div>
                   <span>New Quiz: {this.props.outputText}</span> 
                </div>
                <div >
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
                </div>
                <button onClick={() => this.createNewQuiz()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default CreateQuiz