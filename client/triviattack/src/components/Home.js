import logo from './Homepage/logo.svg';
import './Homepage/Home.css';
import React, {Component, useState} from 'react';
import Select from 'react-select';
import { View, Button } from 'react-native';
// import SideSheet from 'react-side-sheet';
import { IconButton } from "rsuite";
import { Admin, Menu, Reload, Resize, Search } from '@rsuite/icons';
// Import the default CSS
// import "rsuite/dist/rsuite.min.css";

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
  { label: "Easy", value: 1 },
  { label: "Medium", value: 2 },
  { label: "Hard", value: 3 },
];


class App extends Component {

  callSelect20Users(){
      fetch(`http://34.27.63.203:8080/select20Users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then((resp) => {
        if(resp.ok){
            let a = resp.json();
            console.log(a);
            return a;
        }
        })
  }

  render() {
    // const [open, setOpen] = useState(false);
    const ButtonStyle = { margin: "0px 10px" };
    return (
      <div className="App">
        <header className="App-header">
          <View style = {{flexDirection:'row'}}>
            <h1>TriviAttack!</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </View>
          {/* <h1>TriviAttack!</h1>
          <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Select Category and Difficulty:
          </p>
        
          <div className="container" style={{display: "flex", justifyContent: "space-between"}}>
            <View style = {{flexDirection:'row'}} >
              <div className="categorySelect">
                <Select 
                  placeholder = "Category"
                  options = { categories } 
                />
              </div>
              <div className="difficultySelect">
                <Select 
                  placeholder = "Difficulty"
                  options = { difficulty } 
                />
              </div>
            </View>
          </div>
          <div>
            <button 
              onClick={() => this.callSelect20Users()} type="start quiz">Start Quiz!
            </button>
          </div>
          <View style = {{flexDirection:'row'}}>
            <IconButton icon={<Search />} color="cyan" appearance="primary" style={ButtonStyle} />
            <IconButton onClick={() => this.callSelect20Users()} icon={<Admin />} color="violet"  appearance="primary" style={ButtonStyle} />
          </View>
        </header>
          
      {/* <div>
        <button onClick={() => setOpen(true)}>Open</button>
        <SideSheet isOpen={open} onDismiss={() => setOpen(false)} />
      </div> */}

      

      </div>
    );
  }
}

export default App;
