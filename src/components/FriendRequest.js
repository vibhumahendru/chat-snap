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

    console.log('inside accept req', this.props.request.friender_id);

    let foundSenderOfReq = this.props.usersAr.find(user=> user.id === this.props.request.friender_id)

    console.log(foundSenderOfReq);

    this.props.addFriendToFriendObjAr(foundSenderOfReq)


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
    console.log('inside FR !!', this.props);
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
    usersAr: state.usersAr,
    friendObjAr: state.friendObjAr
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateFriends: (rel)=> dispatch({type: 'UPDATE_FRIENDS', payload: rel}),
    addFriendToFriendObjAr:(user)=> dispatch({type: 'ADD_FRIEND_TO_FRIEND_OBJ_AR', payload:user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);