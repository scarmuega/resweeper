import getClockwisePositions from "./getClockwisePositions";
import { FLAG_EMPTY, FLAG_BOMB, FLAG_MAYBE } from '../constants';

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

const HARDCODED_SHUFFLE = [
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, B, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, B, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, B, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, B, E, E, E, E, B, E, E, E, E],
  [E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, B, E, E, E, E]
];

export default class Board {
  data = null;
  gameOver = false;

  constructor(data) {
    this.data = data || HARDCODED_SHUFFLE;
  }

  initialize() {
    this.forEachCell((x, y) => this.computeNearByBombs(x, y));
  }

  computeNearByBombs(x, y) {
    const bombCount = getClockwisePositions(this, x, y).filter(({ x, y }) => {
      const cell = this.getCellData(x, y);
      return cell && cell.isBomb;
    }).length;

    this.mutateCellData(x, y, oldData => ({
      ...oldData,
      nearByBombs: bombCount
    }));
  }

  getRows() {
    return this.data;
  }

  forEachCell(action) {
    this.data.forEach((row, y) => {
      row.forEach((cell, x) => action(x, y));
    });
  }

  mutateCellData(x, y, mutation) {
    const oldData = this.getCellData(x, y);
    if (!oldData) return;
    this.data[y][x] = mutation(oldData);
  }

  getCellData(x, y) {
    if (!this.isInside(x, y)) return undefined;
    return this.data[y][x];
  }

  revealSurroundings(x, y) {
    const positions = getClockwisePositions(this, x, y);

    positions
      .filter(({ x, y }) => {
        const cell = this.getCellData(x, y);
        return cell && !cell.isBomb && !cell.isDisclosed && !cell.nearByBombs && !cell.flag;
      })
      .forEach(({ x, y }) => this.discloseCell(x, y));
  }

  discloseCell(x, y) {
    this.mutateCellData(x, y, oldData => {
      if (oldData.isDisclosed) return oldData;

      if (oldData.isBomb) {
        this.gameOver = true;
      }

      return {
        ...oldData,
        isDisclosed: true
      };
    });

    this.revealSurroundings(x, y);
  }

  flagCell(x, y) {
    this.mutateCellData(x, y, oldData => {
      if (oldData.isDisclosed) return oldData;

      switch (oldData.flag) {
        case FLAG_BOMB:
          return { ...oldData, flag: FLAG_MAYBE };
        case FLAG_MAYBE:
          return { ...oldData, flag: FLAG_EMPTY };
        default:
          return { ...oldData, flag: FLAG_BOMB };
      }
    });
  }

  isInside(x, y) {
    const size = this.getSize();
    if (x < 0) return false;
    if (y < 0) return false;
    if (x >= size.width) return false;
    if (y >= size.height) return false;
    return true;
  }

  getSize(board) {
    return { width: this.data[0].length, height: this.data.length };
  }

  clone() {
    const newData = this.data.map(row => row.map(cell => cell));
    return new Board(newData);
  }
}
