import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Reset(props) {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.getInitialState = function () {
            let initial_state =  {
                squares: Array(9).fill(null),
                xIsNext: true,
                turnCounter: 0,
                winner: null,
                winningSquares: Array(3).fill(null)
            }
            return initial_state;
        };

        this.state = this.getInitialState();
    }

    handleClick(i) {
        this.state.turnCounter++;
        const squares = this.state.squares.slice();
        // return early if the game is over or same square is clicked
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // if 9 turns are reached and no winner, declare draw
        if (this.state.turnCounter == 9 && !(calculateWinner(squares))) {
            this.state.winner = 'none';
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        let class_name = "square";
        if ((this.state.winningSquares).includes(i)) {
            class_name += ' winner';
        }
        return (
            <Square
                className={class_name}
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleReset() {
        console.log("game reset");
        this.setState(this.getInitialState());
    }

    renderReset() {
        let class_name = "reset-button";
        let reset_text = "Reset"
        if (this.state.winner) {
            return (
                <Reset
                    className={class_name}
                    value={reset_text}
                    onClick={() => this.handleReset()}
                />
            );
        }
    }

    render() {
        const winning_squares = calculateWinner(this.state.squares);
        let title = 'Tic-Tac-Toe';
        let status;
        if (winning_squares) {
            let winner = this.state.squares[winning_squares[0]];
            status = winner + ' wins!';
            this.state.winner = winner;
            this.state.winningSquares = winning_squares;
        } else if (this.state.winner == 'none') {
            status = 'Draw!';
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="title">{title}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="status">{status}</div>
                <div className="reset">{this.renderReset()}</div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const winning_squares = lines[i];
            return winning_squares;
        }
    }
    return null;
}