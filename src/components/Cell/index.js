import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

import { FLAG_BOMB, FLAG_MAYBE, RANDOM_COLORS } from "../../constants";

import * as styles from "./styles";

export default class Cell extends Component {
  handleClick = () => {
    const { isDisclosed, isGameOver, flag, onShouldDisclose } = this.props;

    //if it's already disclosed or flagged, do nothing
    if (isDisclosed || isGameOver || flag || !onShouldDisclose) return;

    onShouldDisclose();
  };

  handleContextMenu = ev => {
    ev.preventDefault();
    const { isDisclosed, isGameOver, onShouldFlag } = this.props;

    //if it's disclosed, do nothing
    if (isDisclosed || isGameOver || !onShouldFlag) return;

    onShouldFlag();
    return false;
  };

  renderNumber(value) {
    const color =
      value < RANDOM_COLORS.length ? RANDOM_COLORS[value - 1] : "#000";
    return <span style={{ color }}>{value}</span>;
  }

  renderIcon(icon, color) {
    return <FontAwesome name={icon} style={{ color }} />;
  }

  renderHidden() {
    const { flag } = this.props;
    switch (flag) {
      case FLAG_MAYBE:
        return this.renderIcon("question", "yellow");
      case FLAG_BOMB:
        return this.renderIcon("flag", "#CD3025");
      default:
        return "";
    }
  }

  renderDisclosed() {
    const { isBomb, nearByBombs } = this.props;
    if (isBomb) return this.renderIcon("bomb", "#000");
    if (nearByBombs > 0) return this.renderNumber(nearByBombs);
    return "";
  }

  getWrapperStyle() {
    const { isBomb, isDisclosed } = this.props;
    return {
      ...styles.WRAPPER,
      ...(isDisclosed ? styles.WITHOUT_BEVEL : styles.WITH_BEVEL),
      backgroundColor: isBomb && isDisclosed ? "#CD3025" : "#BDBDBD"
    };
  }

  render() {
    const { isDisclosed, isGameOver } = this.props;
    return (
      <div
        style={this.getWrapperStyle()}
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
      >
        {(isDisclosed || isGameOver) ? this.renderDisclosed() : this.renderHidden()}
      </div>
    );
  }
}
