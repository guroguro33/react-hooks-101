import React, {useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import EventForm from './EventForm';

import Event from './Event';
import reducer from '../reducers';

const App = () => {
  const [state, dispatch] = useReducer(reducer, []); // 第３引数は省略できる

    return (
      <div className='container-fluid'>
        <EventForm/>
          <h4>イベント一覧</h4>
          <table className='table table-hover'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>タイトル</th>
                  <th>ボディ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {state.map((event, index) => (<Event key={index} event={event} dispatch={dispatch} />))}
              </tbody>
          </table>
      </div>
    );
};

export default App;
