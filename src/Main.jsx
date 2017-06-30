import React, { Component } from 'react';
import { Row, PureRow } from './Row';
import SFCRow from './SFCRow';

const COLORS = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
function random(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
function getData() {
  let count = 0;
  const data = [];
  while(count < 1000) {
    count++;
    data.push({ id: count, label: random(COLORS) });
  }
  return data;
}
function updateData(data) {
  let count = 0;
  while(count < 10) {
    count++;
    data[count - 1] = Object.assign(
      {},
      data[count - 1],
      { label: random(COLORS) }
    );
  }
  return data;
}

let startTime;
function startMeasure() {
  startTime = performance.now();
}
function stopMeasure() {
  const stopTime = performance.now();
  if (startTime) {
    const duration = stopTime - startTime;
    return duration;
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
    };
    this.run = this.run.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.run();
  }

  componentWillUpdate(nextProps, nextState) {
    startMeasure();
  }

  componentDidUpdate() {
    const { onCreate, onUpdate, onPartialUpdate, kind } = this.props;
    const result = stopMeasure();
    if (this.case === 'run' && !this.created) {
      onCreate(result, kind);
      this.created = true;
    } else if (this.case === 'run') {
      onUpdate(result, kind);
    } else {
      onPartialUpdate(result, kind);
    }
  }

  run() {
    this.case = 'run';
    this.setState({
      store: getData(),
    });
  }

  update() {
    this.case = 'update';
    this.setState(prevState => ({
      store: updateData(prevState.store),
    }));
  }

  render() {
    const { kind, dot } = this.props;
    const { store } = this.state;

    return (
      <div>
        {/*
        <button onClick={this.run}>Create</button>
        <button onClick={this.update}>Update</button>
        */}
        <table className="pure-table">
          <tbody>
            {kind === 'class' && store.map(data =>
              <Row key={data.id} data={data} dot={dot}/>
            )}
            {kind === 'pure-class' && store.map(data =>
              <PureRow key={data.id} data={data} dot={dot}/>
            )}
            {kind === 'sfc' && store.map(data =>
              <SFCRow key={data.id} data={data} dot={dot}/>
            )}
            {kind === 'fast-sfc' && store.map(data =>
              SFCRow({ data, dot, _key: data.id })
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
