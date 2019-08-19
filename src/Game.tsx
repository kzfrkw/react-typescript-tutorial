import * as React from 'react';
import Board from './Board';
// import ToggleButton from 'react-toggle-button'
import './Game.css';
  
type BoardType = string | null;

interface State {
    history: Array<{[key: string]: BoardType[]}>;
    locationHistory: Array<number>;
    xIsNext: boolean;
    stepNumber: number;
    // moveIsAscend: boolean;
}

class Game extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            locationHistory: [],
            stepNumber: 0,
            xIsNext: true,
            // moveIsAscend: true,
        };
    }

    public handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        var locationHistory = this.state.locationHistory.slice(0, this.state.stepNumber);
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        locationHistory.push(i);
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            locationHistory: locationHistory,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    public jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    private calcCol(move: number, locationHistory: Array<number>) {
        const location = locationHistory[move - 1];
        if ((location % 3) === 0) {
            return 1;
        } else if ((location % 3) === 1) {
            return 2;
        } else {
            return 3;
        }
    }

    private calcRow(move: number, locationHistory: Array<number>) {
        const location = locationHistory[move - 1];
        if (location < 3) {
            return 1;
        } else if (location < 6) {
            return 2;
        } else {
            return 3;
        }
    }

    // toggle() {
    //     return (<ToggleButton
    //     activeLabel={'Asc'}
    //     inactiveLabel={'Des'}
    //     value={this.state.moveIsAscend || false}
    //     onToggle={(value) => {
    //       this.setState({
    //         moveIsAscend: !value,
    //       })
    //     }} />)
    // }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const locationHistory = this.state.locationHistory;

        // const moves = [];
        const moves = history.map((step, move) => {
            const player = (move % 2) === 0 ? 'O' : 'X';
            const desc = move ?
                'Go to move #' + move + ' col:' + this.calcCol(move, locationHistory)
                    + ' row:' + this.calcRow(move, locationHistory) + ' player:' + player:
                'Go to game start';
            // if (this.state.moveIsAscend) {
                return (
                    <li key={move}>
                        <button className={move === this.state.stepNumber ? "selected" : ""} 
                            onClick={() => this.jumpTo(move)}>
                            {desc}
                        </button>
                    </li>
                );
            // } else {
            //     moves.unshift (
            //         <li key={move}>
            //             <button className={move === this.state.stepNumber ? "selected" : ""}  
            //                 onClick={() => this.jumpTo(move)}>
            //                 {desc}
            //             </button>
            //         </li>
            //     );
            // }
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares = {current.squares}
                    onClick = {(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                {/* <ol>{this.toggle()}</ol> */}
            </div>
        </div>
        );
    }
}

const calculateWinner = (squares: BoardType[]): any => {
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
            return squares[a];
        }
    }
    return null;
}

export default Game;