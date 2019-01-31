import React, { Component } from 'react';
import {connect} from 'react-redux'

class FriendRequest extends Component {

  handleAcceptFR=()=>{
    // console.log('inside accpet',this.props.request);
    fetch(`http://localhost:3000/relationships/${this.props.request.id}`, {
      method:'PATCH',
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accepted: true

        })
    })


    let copyFriendRequests = [...this.props.friendRequests]
    let removedAccepted = copyFriendRequests.filter(req=> req.id !== this.props.request.id)

    let copyFriends = [...this.props.friends]
    let addAccepted = [...copyFriends, this.props.request]

    this.props.updateFriends({
      removedAccepted: removedAccepted,
      addAccepted: addAccepted
    })
    alert(`You are now friends with ${this.handleFindSenderReq()}!`)
  }

  handleFindSenderReq =()=>{
    let foundSender = this.props.usersAr.find(user=> user.id === this.props.request.friender_id)
    return foundSender.name
  }

  render() {

    return (
      <div>New Friend request from {this.handleFindSenderReq()}
        <button onClick={this.handleAcceptFR}>Accept</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);
