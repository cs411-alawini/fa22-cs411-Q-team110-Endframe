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


class UserProfile extends Component {

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
                <span className='page-title'>Triviattack</span>
               

                <div className="delete-user-from-team">
                    <DeleteUserFromTeam handler={this.deleteUserFromTeamTextHandler.bind(this)} teamID="category" userID="difficulty" outputText={this.state.deleteUserText}/>
                </div>

                <div className="user-stats">
                    <UserStats handler={this.userStatsTextHandler.bind(this)} username="" outputText={this.state.statsText}/>
                </div>

                <div className="team-members">
                    <TeamMembers handler={this.teamMembersTextHandler.bind(this)} userID="" outputText={this.state.teamMembersText}/>
                </div>

                <div className="team-stats">
                    <TeamStats handler={this.teamStatsTextHandler.bind(this)} userID="" outputText={this.state.teamStatsText}/>
                </div>

                <div className="update-username">
                    <UpdateUsername handler={this.updateUserTextHandler.bind(this)} userID="" newUsername="" outputText={this.state.updateUserText}/>
                </div>

                <div className="user-info">
                    <UserInfo handler={this.userInfoHandler.bind(this)} userID="" outputText={this.state.userInfoText}/>
                </div>


            
            </div>
        );
    }
}

export default UserProfile