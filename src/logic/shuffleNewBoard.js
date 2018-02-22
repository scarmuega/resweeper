import { FLAG_EMPTY } from "../constants";
import Board from "./Board";

const E = {
  isDisclosed: false,
  isBomb: false,
  nearByBombs: undefined,
  flag: FLAG_EMPTY
};

const B = {
  isDisclosed: false,
  isBomb: true,
  nearByBombs: undefined,
  flag: FLAG_EMPTY
};

function buildRandomCell(bombRatio) {
  const rnd = Math.random();
  return rnd > bombRatio ? E : B;
}

function buildRow(cols, bombRatio) {
  const row = [];
  for (let i = 0; i < cols; i++) {
    const cell = buildRandomCell(bombRatio);
    row.push(cell);
  }
  return row;
}

export function buildBoard(rows, cols, bombRatio) {
  const data = [];

  for (let i = 0; i < rows; i++) {
    const row = buildRow(cols, bombRatio);
    data.push(row);
  }

  const board = new Board(data);
  board.initialize();

  return board;
}

export default function(level) {
  switch (level) {
    case "hard":
      return buildBoard(20, 20, 0.1);
    case "medium":
      return buildBoard(15, 15, 0.1);
    default:
      return buildBoard(12, 12, 0.1);
  }
}
