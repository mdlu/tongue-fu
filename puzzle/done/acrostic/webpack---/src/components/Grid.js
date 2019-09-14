import React, {
    Component
} from 'react';
import Cell from './Cell';

class Grid extends Component {
    getRow(num) {
        var cells = [];
        for (var i = 0; i < this.props.nCols; i++) {
            var id = this.props.nCols * num + i
            cells.push( < Cell num = {
                    id
                }
                onLetterUpdate = {
                    this.props.onCellUpdate
                }
                key = {
                    id
                }
                letter = {
                    this.props.letters[id]
                }
                />)
            }
            return ( <
                tr key = {
                    num
                }
                className = "Grid" > {
                    cells
                } <
                /tr>
            )
        }

        render() {
            var rows = [];
            for (var i = 0; i < this.props.nRows; i++) {
                rows.push(this.getRow(i))
            }
            return ( <
                table cellSpacing = "0" >
                <
                tbody > {
                    rows
                } <
                /tbody> <
                /table>
            );
        }
    }

    export default Grid;


    // WEBPACK FOOTER //
    // ./src/components/Grid.js