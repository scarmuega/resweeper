import React, { Component } from "react";

import * as styles from "./styles";

export default class Cell extends Component {
  handleClick = () => {
    const { isDisclosed, flag, onShouldDisclose } = this.props;

    //if it's already disclosed or flagged, do nothing
    if (isDisclosed || flag || !onShouldDisclose) return;

    onShouldDisclose();
  };

  handleContextMenu = ev => {  
    ev.preventDefault();
    const { isDisclosed, onShouldFlag } = this.props;
    
    //if it's disclosed, do nothing
    if (isDisclosed || !onShouldFlag) return;

    onShouldFlag();
    return false;
  };

  renderHidden() {
    const { flag } = this.props;
    switch (flag) {
      case "?":
        return "?";
      case "*":
        return "*";
      default:
        return "H";
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
      <div
        style={styles.WRAPPER}
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
      >
        {isDisclosed ? this.renderDisclosed() : this.renderHidden()}
      </div>
    );
  }
}
