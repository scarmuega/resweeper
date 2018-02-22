import React, { Component } from "react";

import * as styles from "./styles";

export default class Cell extends Component {
  handleClick = () => {
    const { isDisclosed, onShouldDisclose } = this.props;

    //if it's already disclosed, do nothing
    if (isDisclosed || !onShouldDisclose) return;

    onShouldDisclose();
  };

  renderHidden() {
    const { flag } = this.props;
    switch (flag) {
      case "W":
        return "W";
      case "B":
        return "*";
      default:
        return "?";
    }
  }

  renderDisclosed() {
    const { isBomb, nearByBombs } = this.props;
    if (isBomb) return "B";
    if (nearByBombs > 0) return nearByBombs;
    return "";
  }

  render() {
    const { isDisclosed } = this.props;
    return (
      <div style={styles.WRAPPER} onClick={this.handleClick}>
        {isDisclosed ? this.renderDisclosed() : this.renderHidden()}
      </div>
    );
  }
}
