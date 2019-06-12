import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: .30
    }

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
    }

    /** create a board nrow high and ncols wide, each cell randomly lit or unlit */
    createBoard() {
        // let board = [['.', 'O', '.', '.', '.'], ['.', '.', 'O', 'O', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.']];
        let board = [];
        // (x) TODO: create array of arrays of true/false values
        for (let i = 0; i < this.props.nrows; i++) {
            board[i] = [];
            for (let j = 0; j < this.props.ncols; j++) {
                let cell = Math.floor(Math.random() * 2) === 0 ? '.' : 'O';
                board[i].push(cell);
            }
        }
        // ( ) TODO: factor in chancesLightStartsOn prop into this function
        return board;
    }

    /** handle changing a cell: update board & determine if winner */
    flipCellsAround(coord) {
        let {ncols, nrows} = this.props;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) {
            // if this coord is actually on board, flip it
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        // TODO: flip this cell and its neighbors

        // win when every cell is turned off
        // TODO: determine if game is won
    }

    render() {
        return (
            <div className="Board-container">
                {!this.state.hasWon 
                    ? <table className="Board">
                        <tbody>
                            {this.state.board.map((row) => {return (
                                <tr>{row.map((cell) => {return (
                                    <Cell isLit={cell === 'O'} flipCellsAround={this.flipCellsAround} />
                                )})}</tr>
                            )})}
                        </tbody>
                    </table> 
                    : "YOU WON!" }
            </div>
        )
    }
}

export default Board;