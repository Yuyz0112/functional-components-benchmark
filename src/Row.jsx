import React, { Component, PureComponent } from 'react';

export class Row extends Component {
  onClick() {
    return;
  }

  render() {
    const { data, dot } = this.props;
    if (dot) {
      return <span>.</span>;
    }
    return (
      <tr>
        <td>{data.id}</td>
        <td style={{ backgroundColor: data.label }}>label</td>
        <td style={{ color: data.label }}>{data.label}</td>
        <td>
          <a onClick={this.onClick}>click event</a>
        </td>
      </tr>
    );
  }
}

export class PureRow extends PureComponent {
  onClick() {
    return;
  }

  render() {
    const { data, dot } = this.props;
    if (dot) {
      return <span>.</span>;
    }
    return (
      <tr>
        <td>{data.id}</td>
        <td style={{ backgroundColor: data.label }}>label</td>
        <td style={{ color: data.label }}>{data.label}</td>
        <td>
          <a onClick={this.onClick}>click event</a>
        </td>
      </tr>
    );
  }
}
