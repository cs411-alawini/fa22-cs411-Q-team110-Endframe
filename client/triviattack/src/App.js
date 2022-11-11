import './App.css';
import QuestionText from './components/QuestionText'
import { Component } from 'react';
class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      questionID:'',
      questionText:''
    }
  }


  updateQuestionTextHandler(newQuestionText, newQuestionID) {
    this.setState({questionText: newQuestionText, questionID:newQuestionID});
  }


  render(){

    
    return (
      
      <div>
        <span>Triviattack</span>
        <div className="App">
          <QuestionText handler={this.updateQuestionTextHandler.bind(this)} questionID={this.state.questionID} questionText={this.state.questionText}/>
        </div>
        
      </div>
    );
  }


}

export default App;
