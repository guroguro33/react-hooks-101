import React, {useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import EventForm from './EventForm';
import Events from './Events';
import reducer from '../reducers';

const App = () => {
  const [state, dispatch] = useReducer(reducer, []); // 第３引数は省略できる

    // stateとdispatchはpropsとして各コンポーネントに渡す
    return (
      <div className='container-fluid'>
        <EventForm state={state} dispatch={dispatch}/>
        <Events state={state} dispatch={dispatch} />
      </div>
    );
};

export default App;
