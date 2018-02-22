import React, { Component } from "react";

import { Cell } from "../../components";

import * as styles from "./styles";
import { Board } from "../../logic";

const BOARD = new Board();
BOARD.initialize();

export default class GameBoard extends Component {
  state = {
    board: BOARD
  };

  handleEndGame() {
    alert("ended");
  }

  handleShouldDisclose = async (cellData, x, y) => {
    const { board } = this.state;

    //CODE REVIEW: it's important that all of our state is inmutable, so we
    //need to clone the board instead of manipulating the existig one
    const newBoard = board.clone();

    newBoard.discloseCell(x, y);

    await this.setState({ board: newBoard });
  };

  renderGameStatus() {
    const { board } = this.state;
    return <div>{board.gameOver ? "game over" : "[timer running]"}</div>;
  }

  renderCell(cellData, rowIndex, cellIndex) {
    const { isDisclosed, isBomb, nearByBombs } = cellData;

    //CODE REVIEW: we could use <Cell {...cellData} /> syntax to make it shorter,
    //but it ends up harder for debugging
    return (
      <Cell
        key={`cell-${rowIndex}-${cellIndex}`}
        isBomb={isBomb}
        isDisclosed={isDisclosed}
        nearByBombs={nearByBombs}
        onShouldDisclose={() =>
          this.handleShouldDisclose(cellData, cellIndex, rowIndex)
        }
      />
    );
  }

  renderCellRow(rowData, rowIndex) {
    return (
      <div style={styles.ROW} key={`row-${rowIndex}`}>
        {rowData.map((cell, cellIndex) =>
          this.renderCell(cell, rowIndex, cellIndex)
        )}
      </div>
    );
  }

  renderCellGrid() {
    const { board } = this.state;
    return (
      <div style={styles.GRID}>
        {board.getRows().map((row, index) => this.renderCellRow(row, index))}
      </div>
    );
  }

  render() {
    return (
      <div style={styles.BOARD}>
        {this.renderGameStatus()}
        {this.renderCellGrid()}
      </div>
    );
  }
}
