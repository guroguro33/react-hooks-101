import React, { useState } from 'react';

const App = props => {
  // useStateの引数にオブジェクトを入れることも可能
  const [state, setState] = useState(props);
  const { name, price } = state;

  // スプレッド構文のマージ
  console.log({ ...state, price: price + 7777 });
  return (
    <React.Fragment>
      <p>現在の{name}は、{price}円です。</p>
      <button onClick={() => setState({...state, price: price + 1})}>+1</button>
      <button onClick={() => setState({...state, price: price - 1})}>-1</button>
      <button onClick={() => setState(props)}>Reset</button>
      <input value={name} onChange={e => setState({...state, name: e.target.value})}></input>
    </React.Fragment>
  );

};
App.defaultProps = {
  name: '',
  price: 1000
}

export default App;
