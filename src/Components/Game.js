import React from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';

export default class Game extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xIsNext: true,
			stepNumber: 0,
			clickedBox: null,
		};
	}


	handleClick(i){
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length -  1];
		const squares = current.squares.slice();



		if(calculateWinner(squares) || squares[i]){
			return;
		}


		squares[i] = this.state.xIsNext ? 'X': 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
			clickedBox: String(i + 1),
		});

		console.log(this.state.clickedBox);
	}

	jumpTo(step){
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}


	render(){
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const clickedBox = this.state.clickedBox;

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move :
				'Go to game start' ;



			if((history.length - 1)===move){
				return (
					<li key={move}>
						<button style = {{backgroundColor:"green"}} onClick = {() => this.jumpTo(move)}>{desc}</button>
					</li>
			);
			}
		    return (
				<li key={move}>
					<button style = {{backgroundColor:this.state.bgColor}} onClick = {() => this.jumpTo(move)}>{desc}</button>
				</li>
		    );


		});

		let status;
		if(winner){
			status = 'Winner is ' + winner;
		} else {
			status = 'Next Player: ' + (this.state.xIsNext ? 'X': 'O');
		}
		if(clickedBox != null){
			status = status + ", previous player clicked box number " + clickedBox;
		}
		return(
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
				</div>
			</div>
		);
	}
}