import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: .20
    }

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
        this.flipCellsAround = this.flipCellsAround.bind(this);
    }

    /** create a board nrow high and ncols wide, each cell randomly lit or unlit */
    createBoard() {
        // let board = [['.', 'O', '.', '.', '.'], ['.', '.', 'O', 'O', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.']];
        let board = [];
        // TODO: create array of arrays of true/false values
        for (let y = 0; y < this.props.nrows; y++) {
            board[y] = [];
            for (let x = 0; x < this.props.ncols; x++) {
                board[y].push(Math.random() < this.props.chanceLightStartsOn);
            }
        }
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
        flipCell(y, x);
        flipCell(y + 1, x);
        flipCell(y - 1, x);
        flipCell(y, x + 1);
        flipCell(y, x - 1);

        // win when every cell is turned off
        // TODO: determine if game is won
        for (let i = 0; i < this.props.nrows; i++) {
            for (let j = 0; j < this.props.ncols; j++) {
                if (board[i][j] === true) {
                    return this.setState({ board, hasWon: false });
                } 
            }
        }

        return this.setState({ board, hasWon: true });
    }

    render() {
        return (
            <div className="Board-container">
                <div className="Board-title">
                    <div className="neon-orange">Lights</div>
                    <div className="neon-blue">Out</div>
                </div>
                {!this.state.hasWon 
                    ?   <table className="Board">
                            <tbody>
                                {this.state.board.map((row, rowIdx) => {return (
                                    <tr key={rowIdx}>{row.map((cell, cellIdx) => {return (
                                        <Cell 
                                            key={`${rowIdx}-${cellIdx}`} 
                                            id={`${rowIdx}-${cellIdx}`} 
                                            isLit={cell === true} 
                                            flipCellsAround={this.flipCellsAround} 
                                        />
                                    )})}</tr>
                                )})}
                            </tbody>
                        </table> 
                    :   <div className="Board-title">
                            <div className="winner">
                                <span className="neon-orange">YOU</span>
                                <span className="neon-blue">WIN</span>
                            </div>
                        </div> 
                }
            </div>
        )
    }
}

export default Board;