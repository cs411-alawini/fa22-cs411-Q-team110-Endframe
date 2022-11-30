import '../App.css';
import React, {Component} from 'react';
import config from '../config/config'
import CreateQuiz from './CreateQuiz';
import QuestionText from './QuestionText'
import DeleteUserFromTeam from './DeleteUser';
import QuestionList from './QuestionList';
import UserStats from './UserStats';
import TeamMembers from './TeamMembers';
import TeamStats from './TeamStats';
import UpdateUsername from './UpdateUsername';
import UserInfo from './UserInfo';
import SubmitAnswer from './SubmitAnswer';


class TakeQuiz extends Component {

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

    render() {
        return (
            <div>
                <span>Triviattack</span>
                <div className="display-question">
                    <QuestionText handler={this.updateQuestionTextHandler.bind(this)} questionID={this.state.questionID} questionText={this.state.questionText}/>
                </div>

                <div className="create-quiz">
                    <CreateQuiz handler={this.updateCreateQuizTextHandler.bind(this)} category="category" difficulty="difficulty" outputText={this.state.createQuizText}/>
                </div>

                <div className="question-list">
                    <QuestionList handler={this.quizQuestionsTextHandler.bind(this)} quizID="" outputText={this.state.quizQuestionsText}/>
                </div>

                <div className="user-info">
                    <SubmitAnswer handler={this.userResponseHandler.bind(this)} userID="" questionID="" quizID="" outputText={this.state.userResponseText}/>
                </div>


            
            </div>
        );
    }
}

export default TakeQuiz