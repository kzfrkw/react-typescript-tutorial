import * as React from "react";
import './Board.css';

interface SquareProps {
    value: string | null;
    onClick: () => void;
    hilight: boolean | null;
}

function Square(props: SquareProps) {
    return (
        <button className={props.hilight ? "hilightSquare" : "square"} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

type BoardType = string | null;
interface BoardProps {
    squares: BoardType[];
    onClick: (i: number) => void;
}
interface State {
    squares: BoardType[];
    xIsNext: boolean;
}

export default class Board extends React.Component<BoardProps, State> {
    renderSquare(i: number) {
        const winLine = calculateWinLine(this.props.squares);
        const hilight = winLine && (winLine.indexOf(i) >= 0);
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                hilight={hilight}
            />
        );
    }

    createBoad() {
        let board = [];
        for (let i = 0; i < 3; i++) {
            board.push(
            <div className="board-row">
                {this.createLine(i)}
            </div>);
        }
        return board;
    }

    createLine(i: number) {
        let line = [];
        for (let j = 0; j < 3; j++) {
            line.push(this.renderSquare(3 * i + j));
        }
        return line;
    }

    render() {
        return (
        <div>
            {this.createBoad()}
        </div>
        );
    }
}

const calculateWinLine = (squares: BoardType[]): any => {
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
            return [a, b, c];
        }
    }
    return null;
}