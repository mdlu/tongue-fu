import React, {
    Component
} from 'react';
import Grid from './Grid'
import Words from './Words'
import {
    clues,
    gridConfig
} from '../data';
import './Puzzle.css'

class Puzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letters: Array(gridConfig.maxVal).fill(""),
        }
        if (window.localStorage.getItem("letters")) {
            this.state = {
                letters: JSON.parse(window.localStorage.getItem("letters"))
            }
        }

        this.onCellUpdate = this.onCellUpdate.bind(this);
    }

    onCellUpdate(num, letter) {
        const letters = this.state.letters.slice();
        letters[num] = letter;
        this.setState({
            letters: letters
        });
        window.localStorage.setItem("letters", JSON.stringify(letters));
    }

    render() {
        return ( <
            div className = "wrapper" >
            <
            div className = "gridSection" >
            <
            Grid nRows = {
                gridConfig.nRows
            }
            nCols = {
                gridConfig.nCols
            }
            onCellUpdate = {
                this.onCellUpdate
            }
            letters = {
                this.state.letters
            }
            /> <
            /div> <
            div className = "wordsSection" >
            <
            Words clues = {
                clues
            }
            onCellUpdate = {
                this.onCellUpdate
            }
            letters = {
                this.state.letters
            }
            /> <
            /div> <
            /div>
        )
    }
}

export default Puzzle;


// WEBPACK FOOTER //
// ./src/components/Puzzle.js