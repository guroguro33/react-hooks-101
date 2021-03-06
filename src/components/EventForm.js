import React, { useContext, useState } from 'react';
import {
  CREATE_EVENT, 
  DELETE_ALL_EVENTS,
  ADD_OPERATION_LOG,
  DELETE_ALL_OPERATION_LOGS,
} from '../actions';
import AppContext from '../contexts/AppContext';
import { timeCurrentIso8601 } from '../utils';

const EventForm = () => {
  const {state, dispatch} = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addEvent = e => {
    e.preventDefault();
    // イベント登録をdispatchで呼ぶ
    dispatch({
      type: CREATE_EVENT,
      title,
      body
    })
    // 操作ログ登録をdispatchで呼ぶ
    dispatch({
      type: ADD_OPERATION_LOG,
      description: 'イベントを追加しました',
      operatedAt: timeCurrentIso8601()
    })
    setTitle('');
    setBody('');
  }

  const deleteAllEvents = e => {
    e.preventDefault();
    const result = window.confirm('本当に全て削除してよろしいですか？')
    if (result) {
      // イベントの削除
      dispatch({ type: DELETE_ALL_EVENTS });
      // 操作ログの追加
      dispatch({
        type: ADD_OPERATION_LOG,
        description: '全てのイベントを削除しました',
        operatedAt: timeCurrentIso8601()
      })

    }
  }

  const deleteAllOperationLogs = e => {
    e.preventDefault();
    const result = window.confirm('本当に全ての操作ログを削除してよろしいですか？');
    if (result) {
      dispatch({
        type: DELETE_ALL_OPERATION_LOGS
      })
    }
  }

  const unCreatable = title === '' || body === '';

  return (
    <>
      <h4>イベント作成フォーム</h4>
      <form>
        <div className='form-group'>
          <label htmlFor="formEventTitle">タイトル</label>
          <input className="form-control" id="formEventTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor="formEventBody">ボディ</label>
          <textarea className="form-control" id="formEventBody" value={body} onChange={e => setBody(e.target.value)} />
        </div>
        <button className='btn btn-primary mr-2' onClick={addEvent} disabled={unCreatable}>イベントを作成する</button>
        <button className='btn btn-danger mr-2' onClick={deleteAllEvents} disabled={state.events.length === 0}>全てのイベントを削除する</button>
        <button className='btn btn-danger' onClick={deleteAllOperationLogs} disabled={state.operationLogs.length === 0}>全ての操作ログを削除する</button>
      </form>
    </>
  );
}

export default EventForm;