import './App.css';
import { Component } from 'react';
import TriviaPanel from './components/TriviaPanel';
class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      questionID:'',
      questionText:''
    }
  }





  render(){

    
    return (
      
      <div>
        <TriviaPanel/>
      </div>
    );
  }


}

export default App;
