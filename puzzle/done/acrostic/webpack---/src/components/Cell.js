import React, {
    Component
} from 'react'
import './Cell.css'

function getCellId(wordNum, cellNum) {
    if (wordNum != null && cellNum != null) {
        return "word" + wordNum.toString() + "cell" + cellNum.toString()
    } else {
        return ""
    }
}

class Cell extends Component {
    focusNext(e) {
        console.log(e.keyCode)

        if (e.keyCode == 9) {
            void(0)
        } else if (this.props.letter.length == 1) {
            // move forward
            var next = document.getElementById(getCellId(this.props.wordNum, this.props.cellNum + 1))
            if (next == null) next = document.getElementById(getCellId(this.props.wordNum + 1, 0))
            if (next == null) return
            next.focus()
        } else if (e.keyCode == 8) { // pressed backspace
            // move backward
            if (this.props.wordNum == 0 && this.props.cellNum == 0) return

            var prev = document.getElementById(getCellId(this.props.wordNum, this.props.cellNum - 1))
            if (prev == null) {
                var prevCellNum = 20;
                while (document.getElementById(getCellId(this.props.wordNum - 1, prevCellNum)) == null) {
                    prevCellNum--
                }
                prev = document.getElementById(getCellId(this.props.wordNum - 1, prevCellNum))
            }

            prev.focus()
        }
    }

    render() {
        return ( <
            td className = "square"
            key = {
                this.props.num
            } >
            <
            input id = {
                getCellId(this.props.wordNum, this.props.cellNum)
            }
            type = 'text'
            value = {
                this.props.letter
            }
            maxLength = "1"
            onChange = {
                (e) => this.props.onLetterUpdate(this.props.num, e.target.value)
            }
            onKeyUp = {
                (e) => this.focusNext(e)
            }
            title = {
                this.props.hoverText
            }
            style = {
                this.props.hoverText ? {
                    "fontWeight": "bold"
                } : {}
            }
            /> <
            /td>
        )
    }
}

export default Cell;


// WEBPACK FOOTER //
// ./src/components/Cell.js