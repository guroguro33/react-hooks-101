# React 学習メモ

## 基本

- JSX 内では{}内に JS を記述可能
- return のあとは 1 つの要素のみ設置可能

```javascript
<React.fragment></React.fragment>
// もしくは下記を使用
<></>
```

## 構文

### useState()

- const で値とセッターを定義する

```javascript
const [count, setCount] = useState(0);
```

- setCount の引数に関数を入れることもできる

```javascript
const increment = setCount((prevCount = prevCount + 1));
```

### useState の引数にオブジェクト

- 複数の useState を作成しないで済むように useState の引数にオブジェクトを入れることが可能

```javascript
const App = (props) => {
  // useStateの引数にオブジェクトを入れる
  const [state, setState] = useState(props);
  const { name, price } = state;

  // スプレッド構文のマージ
  console.log({ ...state, price: price + 7777 });
  return (
    <React.Fragment>
      <p>
        現在の{name}は、{price}円です。
      </p>
      <button onClick={() => setState({ ...state, price: price + 1 })}>+1</button>
      <button onClick={() => setState({ ...state, price: price - 1 })}>-1</button>
      <button onClick={() => setState(props)}>Reset</button>
      <input value={name} onChange={(e) => setState({ ...state, name: e.target.value })}></input>
    </React.Fragment>
  );
};
App.defaultProps = {
  name: '',
  price: 1000,
};
```

## defaultProps

- 初期値の props を指定できる

```javascript
const App = (props) => {
  // 内部でpropsを使用する
};
// 初期値をdefaultPropsとして設定する
App.defaultProps = {
  name: '',
  price: 1000,
};
```

## useEffect

- 関数コンポーネント内で副作用を実行するための Hook。副作用とは関数コンポーネントの出力（描画）に関係ない処理のこと。つまり useEffect でレンダリングと副作用を切り離すことができる。

```javascript
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
}, [name]);
```

## useReducer
- 処理を加えた複雑な状態管理を行うために使用する
- reducerファイルを作成し、それをAppコンポーネントで呼び出して使用する
```javascript
// src/reducers/index.js
const events = (state = [], action) => {
  switch (action.type) {
    case CREATE_EVENT:
      const event = {title: action.title, body: action.body};
      const length = state.length;
      const id = length === 0 ? 1 : state[length - 1].id + 1;
      return [...state, {id, ...event}]; // id:idの場合、idでまとめられる
    case DELETE_EVENT:
      return state.filter(event => event.id !== action.id);
    case DELETE_ALL_EVENTS:
      return [];
    default:
      return state;
  }
}

export default events;

// src/components/App.js
import reducer from '../reducers';

const App = () => {
  const [state, dispatch] = useReducer(reducer, []); // 第３引数は省略できる
}
```

### combineReducers
- 複数のstateを結合させ、ひとつのstateとして扱うための方法（Redux）
- Reduxパッケージが必要

## コンテキスト（以前のやり方）
- propのバケツリレーをしないための方法
> コンテキストは各階層で手動でプロパティを下に渡すことなく、コンポーネントツリー内でデータを渡す方法を提供します。

### Context.Provider
- 親コンポーネントに記述して、子コンポーネントに渡す
```javascript
<MyContext.Provider value={/* 何らかの値 */}>
```
### Context.Consumer
- 子コンポーネントに記述して、親コンポーネントから受け取る
```javascript
<MyContext.Consumer>
  {value => /* コンテクストの値に基づいて何かをレンダーします */} // コールバック関数でJSXを返す
</MyContext.Consumer>
```

## useContext
- Context.Consumerの代わりにProviderから受け取りが可能
```javascript
// App.js
<AppContext.Provider value={{ state, dispatch }}>
  // JSX
<AppContext.Provider value={{ state, dispatch }}>

// 子コンポーネント
import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

  // 要素内部
  const {state, dispatch} = useContext(AppContext);
```