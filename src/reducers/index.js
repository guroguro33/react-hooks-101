// 送られてくるaction
// action = {
//   type: 'CREATE_EVENT', 
//   title: '2020年東京オリンピックのお知らせ', 
//   body: '2020年に東京でオリンピックを開催します！つきましては、、、、', 
//}
//

const events = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_EVENT':
      const event = {title: action.title, body: action.body};
      const length = state.length;
      const id = length === 0 ? 1 : state[length - 1].id + 1;
      return [...state, {id, ...event}]; // id:idの場合、idでまとめられる
    case 'DELETE_EVENT':
      return state;
    case 'DELETE_ALL_EVENTS':
      return [];
    default:
      return state;
  }
}

export default events;