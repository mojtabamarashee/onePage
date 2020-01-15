import React from 'react';
import ReactDOM from 'react-dom';
class Swing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let minP, maxP, min, max, name;
    ({minP, maxP, min, max, name} = this.props.data);
    minP < (max + min) / 2
      ? (console.log('name = ', name),
        console.log('minP = ', minP),
        console.log('maxP = ', maxP),
        console.log('max = ', max),
        console.log('min = ', min))
      : null;
    return (
      <div style={{width: '100%', height: '10px'}}>
        <div
          style={{
            margin:
              minP < (max + min) / 2
                ? ((minP - min) / (max - min)) * 100 + '%'
                : null,
            backgroundColor: 'red',
              minP < (max + min) / 2
                ? width: ((maxP - minP) / (max - min)) * 100 + '%'
                : (width:'0px'),
            height: '5px',
          }}
        />
      </div>
    );
  }
}

export {Swing};
