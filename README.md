# React 学習メモ

## 基本

- JSX 内では{}内に JS を記述可能
- return のあとは 1 つの要素のみ設置可能

```
<React.fragment></React.fragment>
// もしくは下記を使用
<></>
```

## 構文

### useState()

- const で値とセッターを定義する

```
const [count, setCount] = useState(0);
```

- setCount の引数に関数を入れることもできる

```
const increment = setCount(prevCount = prevCount + 1);
```
