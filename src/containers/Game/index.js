import React, { Component } from "react";

import { Cell, Face, Timer, Label } from "../../components";
import { Board, shuffleNewBoard } from "../../logic";

import * as styles from "./styles";

export default class Game extends Component {
  state = {
    level: "easy",
    board: null,
    startedOn: null
  };

  startNewGame() {
    const { level } = this.state;
    const board = shuffleNewBoard(level);
    this.setState({ board, bombs: board.countBombs(), startedOn: Date.now() });
  }

  componentDidMount() {
    this.startNewGame();
  }

  handleShouldDisclose = async (x, y) => {
    const { board } = this.state;

    //CODE REVIEW: it's important that all of our state is inmutable, so we
    //need to clone the board instead of manipulating the existig one
    const newBoard = board.clone();
    newBoard.discloseCell(x, y);
    await this.setState({ board: newBoard });
  };

  handleShouldFlag = async (x, y) => {
    const { board } = this.state;

    //CODE REVIEW: it's important that all of our state is inmutable, so we
    //need to clone the board instead of manipulating the existig one
    const newBoard = board.clone();
    newBoard.flagCell(x, y);
    await this.setState({ board: newBoard });
  };

  renderHeader() {
    const { board, bombs, startedOn } = this.state;
    return (
      <div style={styles.HEADER}>
        <Label text={bombs} />
        <Face isGameOver={board.isGameOver} isWinner={board.isWinner} />
        <Timer since={startedOn} stopped={board.isGameOver} />
      </div>
    );
  }

  renderCell(cellData, rowIndex, cellIndex) {
    const { board } = this.state;
    const { isDisclosed, isBomb, nearByBombs, flag } = cellData;

    //CODE REVIEW: we could use <Cell {...cellData} /> syntax to make it shorter,
    //but it ends up harder for debugging
    return (
      <Cell
        key={`cell-${rowIndex}-${cellIndex}`}
        isBomb={isBomb}
        isDisclosed={isDisclosed}
        nearByBombs={nearByBombs}
        flag={flag}
        isGameOver={board.isGameOver}
        onShouldDisclose={() => this.handleShouldDisclose(cellIndex, rowIndex)}
        onShouldFlag={() => this.handleShouldFlag(cellIndex, rowIndex)}
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

  renderFooter() {
    return (
      <div style={styles.FOOTER}>
        <select
          style={styles.SELECT}
          onChange={ev => this.setState({ level: ev.target.value })}
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <button style={styles.BUTTON} onClick={() => this.startNewGame()}>
          shuffle again
        </button>
      </div>
    );
  }

  render() {
    const { board } = this.state;
    if (!board) return null;
    return (
      <div style={styles.WRAPPER}>
        {this.renderHeader()}
        {this.renderCellGrid()}
        {this.renderFooter()}
      </div>
    );
  }
}
