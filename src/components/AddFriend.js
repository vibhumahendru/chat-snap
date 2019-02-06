import React, { Component } from 'react';
import {connect} from 'react-redux'

class AddFriend extends Component {



  handleChange=(event)=>{
    this.props.changeFriendInput(event.target.value)
  }

  handleClick=()=>{
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
        console.log("No Such User");
      }
  }


  render() {
    return (
      <div>
      <h1>Add Friend</h1>
      <input onChange={this.handleChange} type="text" placeholder="add friend"></input>
      <button onClick={this.handleClick} >Submit</button>

      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    usersAr: state.usersAr,
    currentUser: state.currentUser,
    addFriendInput: state.addFriendInput
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFriendInput: (friendInput) => dispatch({type: 'CHANGE_FRIEND_INPUT',payload: friendInput})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
