import React, { Component } from 'react';
import {connect} from 'react-redux'

class Friend extends Component {

  handleFindFriendName =()=>{
    if (this.props.request.friender_id === this.props.currentUser.id) {
      let foundFriend = this.props.usersAr.find(user=> user.id === this.props.request.friendee_id)
      return foundFriend.name
    }else{
      let foundFriend = this.props.usersAr.find(user=> user.id === this.props.request.friender_id)
      return foundFriend.name
    }
  }



  render() {

    return (
      <div>
        You are friends with {this.handleFindFriendName()}
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    friends: state.friends,
    friendRequests: state.friendRequests,
    usersAr: state.usersAr
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateFriends: (rel)=> dispatch({type: 'UPDATE_FRIENDS', payload: rel})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
