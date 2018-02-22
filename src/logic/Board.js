import getClockwisePositions from "./getClockwisePositions";
import { FLAG_EMPTY, FLAG_BOMB, FLAG_MAYBE } from '../constants';

export default class Board {
  data = null;
  bombCount = null;
  isGameOver = false;
  isWinner = false;

  constructor(data) {
    this.data = data;
  }

  initialize() {
    this.forEachCell((x, y) => this.computeNearByBombs(x, y));
    this.bombCount = this.countBombs();
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
      row.forEach((cell, x) => action(x, y, cell));
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

    const hasBombs = positions
        .filter(({ x, y }) => {
            const cell = this.getCellData(x, y);
            return cell && cell.isBomb;
        }).length > 0;

    if (hasBombs) return;

    positions
      .filter(({ x, y }) => {
        const cell = this.getCellData(x, y);
        return cell && !cell.isDisclosed && !cell.flag;
      })
      .forEach(({ x, y }) => this.discloseCell(x, y));
  }

  discloseCell(x, y) {
    this.mutateCellData(x, y, oldData => {
      if (oldData.isDisclosed) return oldData;

      return {
        ...oldData,
        isDisclosed: true
      };
    });

    this.revealSurroundings(x, y);
    this.evaluateStatus();
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

    this.evaluateStatus();
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

  countBombs() {
      let count = 0;
      this.forEachCell((x, y, cell) => {
          if (cell.isBomb) count += 1;
      });
      return count;
  }

  countCorrectFlags() {
    let count = 0;
    this.forEachCell((x, y, cell) => {
        if (!cell.isDisclosed && cell.flag === FLAG_BOMB && cell.isBomb) count += 1;
    });
    return count;
  }

  countDisclosedBombs() {
    let count = 0;
    this.forEachCell((x, y, cell) => {
        if (cell.isDisclosed  && cell.flag === FLAG_EMPTY && cell.isBomb) count += 1;
    });
    return count;
  }

  evaluateStatus() {
    const disclosedBombs = this.countDisclosedBombs();
    if (disclosedBombs > 0) {
        this.isGameOver = true;
        this.isWinner = false;
        return;
    }

    const correctFlags = this.countCorrectFlags();
    const bombCount = this.countBombs();
    
    if (correctFlags === bombCount) {
        this.isGameOver = true;
        this.isWinner = true;
        return;
    }

    this.isGameOver = false;
    this.isWinner = false;
  }

  clone() {
    const newData = this.data.map(row => row.map(cell => cell));
    return new Board(newData);
  }
}
