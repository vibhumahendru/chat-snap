import React, { Component } from 'react';
import {connect} from 'react-redux'

class AddFriend extends Component {



  handleChange=(event)=>{
    this.props.changeFriendInput(event.target.value)
  }

  handleClick=()=>{

    let alreadyFriend = this.props.friendObjAr.find(user=> user.name === this.props.addFriendInput)
    if (alreadyFriend) {
      alert(`You are already friends with ${alreadyFriend.name}`)
      return null
    }
    let foundUser= this.props.usersAr.find(user=> user.name === this.props.addFriendInput)
      if (foundUser) {
        console.log(foundUser.name, foundUser.id)
        fetch('http://localhost:3000/relationships', {
          method:'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({

              friender_id: this.props.currentUser.id,
              friendee_id: foundUser.id

            })
        })

        // fetch('http://localhost:3000/email', {
        //   method:'POST',
        //   headers:{
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       recieverId: foundUser.id,
        //       senderId: this.props.currentUser.id
        //     })
        // })

        alert(`You sent a friend request to ${foundUser.name}` )

      }else{
        alert("No Such User");
      }
  }


  handleFindNonFriends=()=>{
    let nonFriendAr = []
    if (this.props.currentUser) {
      this.props.usersAr.forEach(user=>{
        if (this.props.frObjAr.includes(user) || user.name === this.props.currentUser.name) {
          return null
        }else{
          nonFriendAr = [...nonFriendAr, user]
        }
      })
      return nonFriendAr
    }
    return nonFriendAr

  }







  render() {

    return (
      <div>
      <h1>Add Friend</h1>
      <input list="friends-com" onChange={this.handleChange} type="text" placeholder="add friend"></input>
        <datalist id="friends-com">
        {this.handleFindNonFriends().map(friend => <option value={friend.name}></option> )}
        </datalist>
      <button onClick={this.handleClick} >Submit</button>

      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    usersAr: state.usersAr,
    currentUser: state.currentUser,
    addFriendInput: state.addFriendInput,
    friendObjAr: state.friendObjAr,
    friends: state.friends
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFriendInput: (friendInput) => dispatch({type: 'CHANGE_FRIEND_INPUT',payload: friendInput})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
