import React, { Component } from 'react';
import {connect} from 'react-redux'

class Nav extends Component {

  render() {
    return (
      <div>
      <h1>Welcome: {this.props.currentUser.name}</h1>

      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    setTimer: state.setTimer,
    currentPhoto: state.currentPhoto,
    friends: state.friends,
    usersAr: state.usersAr,
    friendObjAr: state.friendObjAr,
    recievedSnaps: state.recievedSnaps,
    sticker:state.sticker
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSetTimer: (time)=> dispatch({type:'CHANGE_TIMER', payload: time}),
    setCurrentPhoto: (image)=> dispatch({type: 'SET_CURRENT_PHOTO', payload: image}),
    setFriendObjAr: (friendAr)=> dispatch({type: 'SET_FRIEND_OBJ_AR', payload: friendAr}),
    logout: ()=> dispatch({type: 'LOGOUT'}),
    updateSticker: (stickerUrl)=> dispatch({type: 'UPDATE_STICKER', payload: stickerUrl})

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
