import React, { Component } from 'react';
import {connect} from 'react-redux'

class Nav extends Component {

  render() {
    return (
      <div>
        <h1 className="main-welcome">Welcome: {this.props.currentUser.name}</h1>
        <div className="stats">
          Total recieved snaps: {this.props.currentUser.recieved_snaps.length}<br></br>
          Total sent snaps: {this.props.currentUser.sent_snaps.length}
        </div>
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
