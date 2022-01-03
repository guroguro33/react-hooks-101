import React, { useState, useEffect } from 'react';

const App = props => {
  // useStateの引数にオブジェクトを入れることも可能
  const [state, setState] = useState(props);
  const { name, price } = state;

  useEffect(() => {
    console.log('This is like componentDidMound or componentDidUpdate.');
  });

  // 第２引数に空配列[]を渡すと最初のレンダリングのみで実行される
  useEffect(() => {
    console.log('This is like componentDidMound');
  }, []);

  // 第２引数の配列に着目したい要素を入力すると、その要素に変更があったときのみ再実行される
  useEffect(() => {
    console.log('This callback is for name only');
  }, [name])

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
