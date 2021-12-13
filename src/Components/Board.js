import React from "react";
import Square from "./Square";

export default class Board extends React.Component{


	renderSquare(i){
		return (<Square
			value = {	this.props.squares[i]}
			onClick = {() => this.props.onClick(i)}
			/>
		);
	}

	 render(){

		 var column = [];
		 var row = [];
		 var boxId = 0;
		 for (let i = 0; i < 3; i++){
			 for(let z = 0; z< 3; z++){
	 				column.push(this.renderSquare(boxId))
					console.log(boxId)
					boxId++
			 }
				 row.push(<div className="board-row">{column}</div>)
				 column = [];
			}

			return(
				<div>
					{row}
				</div>
			);
	 }
}

