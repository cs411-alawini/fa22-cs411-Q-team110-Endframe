package types

type User struct {
	UserID        int    `json:"user-id"`
	Password      string `json:"password"`
	Username      string `json:"username"`
	ProfilePicURL string `json:"profile-pic-url"`
}

type Team struct {
	TeamID   int    `json:"team-id"`
	TeamName string `json:"team-name"`
}

type TeamMembership struct {
	TeamID int `json:"team-id"`
	UserID int `json:"user-id"`
}

type Quiz struct {
	QuizID int `json:"quiz-id"`
}

type Question struct {
	QuestionID   int    `json:"question-id"`
	Answer       string `json:"answer"`
	QuestionText string `json:"question-text"`
	Subcategory  string `json:"subcategory"`
	Category     string `json:"category"`
	Difficulty   string `json:"difficulty"`
}

type QuizQuestions struct {
	QuestionID int `json:"question-id"`
	QuizID     int `json:"quiz-id"`
}

type Response struct {
	ResponseID int    `json:"response-id"`
	QuestionID int    `json:"question-id"`
	QuizID     int    `json:"quiz-id"`
	UserID     int    `json:"user-id"`
	Date       string `json:"date"`
	IsCorrect  bool   `json:"is-correct"`
}
