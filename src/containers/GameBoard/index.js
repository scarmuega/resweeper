import React, { Component } from "react";

import { Cell } from "../../components";

import * as styles from "./styles";

const E = { isDisclosed: false, isBomb: false, nearByBombs: 0, flag: null };
const B = { isDisclosed: false, isBomb: true, nearByBombs: 0, flag: null };

const HARDCODED_SHUFFLE = [
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, B, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E]
];

export default class GameBoard extends Component {
  renderCell(cellData, rowIndex, cellIndex) {
    const { isDisclosed, isBomb, nearByBombs } = cellData;

    //CODE REVIEW: we could use <Cell {...cellData} /> syntax to make it shorter,
    //but it ends up harder for debugging
    return (
      <Cell
        isBomb={isBomb}
        isDisclosed={isDisclosed}
        nearByBombs={nearByBombs}
      />
    );
  }

  renderCellRow(rowData, rowIndex) {
    return (
      <div style={styles.ROW}>
        {rowData.map((cell, cellIndex) =>
          this.renderCell(cell, rowIndex, cellIndex)
        )}
      </div>
    );
  }

  renderCellGrid() {
    return (
      <div style={styles.GRID}>
        {HARDCODED_SHUFFLE.map((row, index) => this.renderCellRow(row, index))}
      </div>
    );
  }

  render() {
    return <div style={styles.BOARD}>{this.renderCellGrid()}</div>;
  }
}
