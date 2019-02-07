import React, { Component } from 'react';
import {connect} from 'react-redux'

class TextFeature extends Component {

  handleMessageChange=(event)=>{
    // console.log(event.target.value);
    this.props.changeMessage(event.target.value)
  }


  render() {
    console.log('message =',this.props.message);
    return (
      <div>
        Text: <input onChange={(event)=>this.handleMessageChange(event)} type="text" ></input>
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
    friends: state.friends,
    message: state.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFriendInput: (friendInput) => dispatch({type: 'CHANGE_FRIEND_INPUT',payload: friendInput}),
    changeMessage :(message)=> dispatch({type: 'CHANGE_MESSAGE', payload: message})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextFeature);
