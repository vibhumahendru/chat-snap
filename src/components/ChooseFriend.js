import React, { Component } from 'react';
import {connect} from 'react-redux'


class ChooseFreind extends Component {

  handleSelectSender=(event)=>{
    let recipient = JSON.parse(event.target.value)
    this.props.setRecipient(recipient)
  }

  sendSnap=()=>{
    fetch('http://localhost:3000/snaps', {
      method:'POST',
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          sender_id: this.props.currentUser.id,
          reciever_id: this.props.recipientOfSnap.id,
          dataUri: this.props.currentPhoto,
          timer: this.props.setTimer,
          stickerUrl: this.props.sticker
        })
    })
    alert(`You sent a snap to ${this.props.recipientOfSnap.name}`)

    this.props.setRecipient(null)
    this.props.changeSetTimer(1)
    this.props.setCurrentPhoto(null)
    this.props.updateSticker(null)
  }

  render() {

    return (
      <div>
      Send to...
      <select className="btn btn-info dropdown-toggle" onChange={(event)=>this.handleSelectSender(event)}>
      <option>Select one:</option>
        {this.props.friendObjAr.map(friend=> <option value={JSON.stringify(friend)} >{friend.name}</option>)}
      </select>
      <br></br>
      <br></br>
      {this.props.recipientOfSnap ? <button className="btn btn-success" onClick={this.sendSnap} >SEND SNAP!!</button> :null}
      </div>
    );
  }

}


function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    currentPhoto: state.currentPhoto,
    recipientOfSnap: state.recipientOfSnap,
    setTimer: state.setTimer,
    currentPhoto: state.currentPhoto,
    sticker:state.sticker

  }
}

function mapDispatchToProps(dispatch) {
  return {
    setRecipient: (recipient)=> dispatch({type: 'SET_RECIPIENT', payload: recipient}),
    changeSetTimer: (time)=> dispatch({type:'CHANGE_TIMER', payload: time}),
    setCurrentPhoto: (image)=> dispatch({type: 'SET_CURRENT_PHOTO', payload: image}),
    updateSticker: (stickerUrl)=> dispatch({type: 'UPDATE_STICKER', payload: stickerUrl})

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseFreind);
