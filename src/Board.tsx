

interface SquareProps {
    value: string | null;
    onClick: () => void;
    hilight: boolean;
}

function Square(props: SquareProps) {
    return (
        <button className={props.hilight ? "hilightSquare" : "square"} onClick={props.onClick}>
            {props.value}
        </button>
    );
  }