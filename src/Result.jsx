import React from 'react';

const Result = props => {
  const { result, times } = props;
  const baseline = result.class.update;
  return (
    <div className="result">
      {Object.keys(result).map(key => {
        const value = result[key].update / (times - 1);
        const percentage = `${Math.round(100 * result[key].update / baseline)}%`;
        return (
          <div className="progress">
            <span className="label">{key}({value.toFixed(1)}, {percentage}):</span>
            <span className="total">
              <span className="percentage" style={{ width: percentage }}/>
            </span>
          </div>
        )
      })}
    </div>
  );
};

export default Result;