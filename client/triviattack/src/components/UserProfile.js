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
import JoinTeam from './JoinTeam';
import GetTeam from './GetTeam';
import GetCompetitionTeam from './GetCompetitionTeam';


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
            userResponseText:'',
            joinTeamText:'',
            getTeamText:'',
            getCompTeamText:''


        }
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateQuestionTextHandler(newQuestionText, newQuestionID) {
        this.setState({questionText: newQuestionText, questionID:newQuestionID});
    }
    updateCompTeamTextHandler(compTeam) {
        this.setState({ getCompTeamText: compTeam});
    }

    updateCreateQuizTextHandler(text) {
        this.setState({createQuizText: text});
    }

    deleteUserFromTeamTextHandler(text) {
        this.setState({deleteUserText: text});
    }

    joinTeamTextHandler(text) {
        this.setState({joinTeamText: text});
    }

    getTeamTextHandler(text) {
        this.setState({getTeamText: text});
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
               
                <div className="join-team">
                    <JoinTeam handler={this.joinTeamTextHandler.bind(this)} teamID="" userID="" outputText={this.state.joinTeamText}/>
                </div>

                <div className="get-team">
                    <GetTeam handler={this.getTeamTextHandler.bind(this)} teamID=""  outputText={this.state.getTeamText}/>
                </div>

                <div className="delete-user-from-team">
                    <DeleteUserFromTeam handler={this.deleteUserFromTeamTextHandler.bind(this)} teamID="" userID="" outputText={this.state.deleteUserText}/>
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

                <div className="get-comp-team">
                    <GetCompetitionTeam handler={this.updateCompTeamTextHandler.bind(this)} userID="" outputText={this.state.getCompTeamText}/>
                </div>


            
            </div>
        );
    }
}

export default UserProfile