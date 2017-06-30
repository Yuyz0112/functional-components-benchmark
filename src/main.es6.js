'use strict';

import React from 'react';
import { render } from 'react-dom';
import Main from './Main';
import Result from './Result';

const result = {
  class: {},
  'pure-class': {},
  'sfc': {},
  'fast-sfc': {},
};

function onCreate(time, kind) {
  result[kind].create = (result[kind].create || 0) + time;
}
function onUpdate(time, kind) {
  result[kind].update = (result[kind].update || 0) + time;
}
function onPartialUpdate(time, kind) {
  result[kind].partialUpdate = (result[kind].partialUpdate || 0) + time;
}

const kinds = ['class', 'pure-class', 'sfc', 'fast-sfc'];
const times = 200;

window.renderDot = function() {
  for (let i = 0; i < times; i++) {
    kinds.forEach(kind => render(React.createElement(Main, {
      onCreate,
      onUpdate,
      onPartialUpdate,
      kind,
      dot: true,
    }), document.getElementById(kind)));
  }
  render(React.createElement(Result, {
    result,
    times,
  }), document.getElementById('result'));
}

window.renderTable = function() {
  for (let i = 0; i < times; i++) {
    kinds.forEach(kind => render(React.createElement(Main, {
      onCreate,
      onUpdate,
      onPartialUpdate,
      kind,
    }), document.getElementById(kind)));
  }
  render(React.createElement(Result, {
    result,
    times,
  }), document.getElementById('result'));
}
