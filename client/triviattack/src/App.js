import './App.css';
import { Component } from 'react';
import TriviaPanel from './components/TriviaPanel';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './components/Home'
import CreateQuiz from './components/CreateQuiz';
import QuestionText from './components/QuestionText'
import DeleteUserFromTeam from './components/DeleteUser';
import QuestionList from './components/QuestionList';
import UserStats from './components/UserStats';
import TeamMembers from './components/TeamMembers';
import TeamStats from './components/TeamStats';
import UpdateUsername from './components/UpdateUsername';
import UserInfo from './components/UserInfo';
import config from './config/config';
import SubmitAnswer from './components/SubmitAnswer';
class App extends Component{

  constructor(props) {

    super(props);
    this.state = {
        questionID: '',
        questionText: '',
        quizID:'',
        quizNumsText:'',
        userID:'',
        statsText:'',
        createQuizText:'',
        teamID:'',
        deleteUserText:'',
        quizQuestionsText:'',
        teamMembersText:'',
        teamStatsText:'',
        userInfoText:'',
        updateUserText:'',
        userResponseText:''


    }
    this.scheme = config.baseScheme;
    this.base_url = config.baseURL;
}

updateQuestionTextHandler(newQuestionText, newQuestionID) {
    this.setState({questionText: newQuestionText, questionID:newQuestionID});
}

updateCreateQuizTextHandler(text) {
    this.setState({createQuizText: text});
}

deleteUserFromTeamTextHandler(text) {
    this.setState({deleteUserText: text});
}

quizQuestionsTextHandler(text) {
    this.setState({quizQuestionsText: text});
}

userStatsTextHandler(text) {
    this.setState({statsText: text});
}

teamMembersTextHandler(text) {
    this.setState({teamMembersText: text});
}

teamStatsTextHandler(text) {
    this.setState({teamStatsText: text});
}

updateUserTextHandler(text) {
    this.setState({updateUserText: text});
}

userInfoHandler(text) {
    this.setState({userInfoText: text});
}

userResponseHandler(text) {
    this.setState({userResponseText: text});
}


  render(){
    return (
      <Router>
      <Navbar />
      <Routes>
          {/* <Route exact path='/' exact element={<Home />} /> */}
          <Route path='/home' element={<Home/>} />
          <Route path='/create-quiz' element={<CreateQuiz handler={this.updateCreateQuizTextHandler.bind(this)} category="category" difficulty="difficulty" outputText={this.state.createQuizText}/>} />
          <Route path='/question-text' element={<QuestionText handler={this.updateQuestionTextHandler.bind(this)} questionID={this.state.questionID} questionText={this.state.questionText}/>} />
          <Route path='/delete-user' element={<DeleteUserFromTeam handler={this.deleteUserFromTeamTextHandler.bind(this)} teamID="category" userID="difficulty" outputText={this.state.deleteUserText}/>} />
          <Route path='/question-list' element={<QuestionList handler={this.quizQuestionsTextHandler.bind(this)} quizID="" outputText={this.state.quizQuestionsText}/>} />
          <Route path='/user-stats' element={<UserStats handler={this.userStatsTextHandler.bind(this)} username="" outputText={this.state.statsText}/>} />
          <Route path='/team-members' element={<TeamMembers handler={this.teamMembersTextHandler.bind(this)} userID="" outputText={this.state.teamMembersText}/>} />
          <Route path='/team-stats' element={<TeamStats handler={this.teamStatsTextHandler.bind(this)} userID="" outputText={this.state.teamStatsText}/>} />
          <Route path='/update-username' element={<UpdateUsername handler={this.updateUserTextHandler.bind(this)} userID="" newUsername="" outputText={this.state.updateUserText}/>} />
          <Route path='/user-info' element={<UserInfo handler={this.userInfoHandler.bind(this)} userID="" outputText={this.state.userInfoText}/>} />
          <Route path='/user-response' element={<SubmitAnswer handler={this.userResponseHandler.bind(this)} userID="" questionID="" quizID="" outputText={this.state.userResponseText}/>} />
      </Routes>
      </Router>
      
      // <div>
      //   <TriviaPanel/>
      // </div>
    );
  }


}

export default App;
