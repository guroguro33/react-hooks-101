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
