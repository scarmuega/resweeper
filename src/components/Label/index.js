import React, { Component } from "react";

import * as styles from './styles';

export default class Label extends Component {
  render() {
    const { text } = this.props;
    return <div style={styles.WRAPPER}>{text}</div>;
  }
}
