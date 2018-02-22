import React, { Component } from "react";
import { Label } from '../';

export default class Timer extends Component {
  state = {
    elapsed: 0
  };

  componentDidMount() {
    setInterval(() => {
      const { since, stopped } = this.props;
      if (since && !stopped) {
        const now = Date.now();
        this.setState({ elapsed: now - since });
      }
    }, 1000);
  }

  render() {
    const { elapsed } = this.state;
    return <Label text={Math.round(elapsed/1000)} />;
  }
}
