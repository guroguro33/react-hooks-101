import React, {useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import EventForm from './EventForm';
import Events from './Events';
import AppContext from '../contexts/AppContext';
import reducer from '../reducers';


const App = () => {
  const [state, dispatch] = useReducer(reducer, []); // 第３引数は省略できる
    console.log({state, dispatch})

    // stateとdispatchはコンテキストのproviderとして各コンポーネントに渡す
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        <div className='container-fluid'>
          <EventForm />
          <Events />
        </div>
      </AppContext.Provider>
    );
};

export default App;
