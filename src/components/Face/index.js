import React, { Component } from "react";

export default class Face extends Component {
  renderContent(icon) {
    return (
      <span className={`fa fa-${icon} fa-4x`} style={{ color: "orange" }} />
    );
  }
  render() {
    const { isWinner, isGameOver } = this.props;
    if (isGameOver && isWinner) {
      return this.renderContent("smile");
    } else if (isGameOver) {
      return this.renderContent("frown");
    } else {
      return this.renderContent("meh");
    }
  }
}
