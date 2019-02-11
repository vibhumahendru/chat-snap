import React, { Component } from 'react';
import {connect} from 'react-redux'
import { GithubPicker } from 'react-color';

class TextFeature extends Component {

  handleMessageChange=(event)=>{
    // console.log(event.target.value);
    this.props.changeMessage(event.target.value)
  }

  handleColorChange=(color)=>{
    console.log(color.hex)
    this.props.changeTextColor(color.hex)
  }


  render() {

    return (
      <div className="color-box">
        Text: <input onChange={(event)=>this.handleMessageChange(event)} type="text" ></input>
        <br></br>
        <GithubPicker className="color-picker" onChange={this.handleColorChange} />
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
    changeMessage :(message)=> dispatch({type: 'CHANGE_MESSAGE', payload: message}),
    changeTextColor: (color)=> dispatch({type: 'CHANGE_TEXT_COLOR', payload: color})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextFeature);
