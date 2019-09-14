import React, {
    Component
} from 'react';
import Cell from './Cell';

class Word extends Component {
    render() {
        return ( <
            table cellSpacing = "0" >
            <
            tbody >
            <
            tr > {
                this.props.cells.map((cellNum, idx) => {
                    return ( <
                        Cell onLetterUpdate = {
                            this.props.onCellUpdate
                        }
                        num = {
                            cellNum
                        }
                        key = {
                            cellNum
                        }
                        letter = {
                            this.props.letters[cellNum]
                        }
                        hoverText = {
                            (this.props.dataLoc === idx ? this.props.data : "")
                        }
                        wordNum = {
                            this.props.wordNum
                        }
                        cellNum = {
                            idx
                        }
                        />
                    )
                })
            } <
            /tr> <
            /tbody> <
            /table>
        )
    }
}

class Words extends Component {
    render() {
        return ( <
            table >
            <
            tbody > {
                this.props.clues.map((clue, index) => {
                    return ( <
                        tr key = {
                            index
                        } >
                        <
                        td key = {
                            1
                        } > {
                            clue.hint
                        } <
                        /td> <
                        td key = {
                            2
                        } >
                        <
                        Word cells = {
                            clue.cells
                        }
                        onCellUpdate = {
                            this.props.onCellUpdate
                        }
                        letters = {
                            this.props.letters
                        }
                        data = {
                            clue.data
                        }
                        dataLoc = {
                            clue.dataLoc
                        }
                        wordNum = {
                            index
                        }
                        /> <
                        /td> <
                        /tr>
                    );
                })
            } <
            /tbody> <
            /table>
        )
    }

}

export default Words;



// WEBPACK FOOTER //
// ./src/components/Words.js