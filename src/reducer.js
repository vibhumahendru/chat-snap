let initialState = {
  loginInput: null,
  usersAr:[],
  currentUser:null,
  selectedSnap:null,
  addFriendInput: null,
  setTimer:1
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case 'CHANGE_USER':
        return {...state, loginInput: action.payload}
    case 'SET_USER_ARRAY':
      return {...state, usersAr: action.payload}
    case 'SET_CURRENT_USER':
      return {...state, currentUser: action.payload}
    case 'SELECT_SNAP':
    return {...state, selectedSnap: action.payload}
    case 'CHANGE_FRIEND_INPUT':
    return {...state, addFriendInput: action.payload}
    case 'CHANGE_TIMER':
    return {...state, setTimer: action.payload}

    default: return state

  }
}

export default reducer
