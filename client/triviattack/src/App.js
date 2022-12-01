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
import TakeQuiz from './components/TakeQuiz';
import UserProfile from './components/UserProfile';
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
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/take-quiz' element={<TakeQuiz />} />
      </Routes>
      </Router>
      
      // <div>
      //   <TriviaPanel/>
      // </div>
    );
  }


}

export default App;
