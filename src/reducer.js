let initialState = {
  loginInput: null,
  usersAr:[],
  currentUser:null,
  selectedSnap:null,
  addFriendInput: null,
  setTimer:1,
  friends:[],
  friendRequests:[]
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case 'CHANGE_USER':
        return {...state, loginInput: action.payload}
    case 'SET_USER_ARRAY':
      return {...state, usersAr: action.payload}
    case 'SET_CURRENT_USER':
    let friendRequestsAr = action.payload.friendeed_relationships.filter(rel => rel.accepted === false)
    let friendAr = action.payload.friendeed_relationships.filter(rel=> rel.accepted === true)
    let friendArDos = action.payload.friendered_relationships.filter(rel=> rel.accepted === true)
    let friends = friendAr.concat(friendArDos)

      return {...state, currentUser: action.payload, friends: friends, friendRequests:friendRequestsAr}
    case 'SELECT_SNAP':
    return {...state, selectedSnap: action.payload}
    case 'CHANGE_FRIEND_INPUT':
    return {...state, addFriendInput: action.payload}
    case 'CHANGE_TIMER':
    return {...state, setTimer: action.payload}
    case 'UPDATE_FRIENDS':
    return{...state, friends: action.payload.addAccepted, friendRequests: action.payload.removedAccepted}

    default: return state

  }
}

export default reducer
