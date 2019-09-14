import React, {
    Component
} from 'react';
import Puzzle from './Puzzle'
import './App.css'

class App extends Component {
    render() {
        return ( <
            div >
            <
            div className = "title" >
            <
            h1 >
            Solve the hackcrostic and GET your token!
            <
            /h1> <
            /div> <
            div >
            <
            Puzzle / >
            <
            /div> <
            /div>
        );
    }
}

export default App;



// WEBPACK FOOTER //
// ./src/components/App.js