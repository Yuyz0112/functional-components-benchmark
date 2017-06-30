import React from 'react';

function onClick() {
  return;
}

const SFCRow = props => {
  const { data, _key, dot } = props;
  if (dot) {
    return <span key={_key}>.</span>;
  }
  return (
    <tr key={_key}>
      <td>{data.id}</td>
      <td style={{ backgroundColor: data.label }}>label</td>
      <td style={{ color: data.label }}>{data.label}</td>
      <td>
        <a onClick={onClick}>click event</a>
      </td>
    </tr>
  );
};

export default SFCRow;
