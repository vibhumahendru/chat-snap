import React, { Component } from 'react';
import {connect} from 'react-redux'


class RecievedSnap extends Component {

  getSenderName=(snap)=>{
    let foundSender = this.props.usersAr.find(user=> user.id === snap.sender_id)
    return foundSender.name
  }

  handleViewSnap=(snap)=>{
    
    this.props.changeSelectedSnap(snap)
    setTimeout(()=> this.props.changeSelectedSnap(null), snap.timer*1000 )

    fetch(`http://localhost:3000/snaps/${snap.id}`, {
      method:'PATCH',
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          viewed: true

        })
    }).then(console.log('view worked'))

    this.props.removeViewedSnap(snap)

  }

  render() {
    return (
      <div className="recieved-snap" onClick={()=>this.handleViewSnap(this.props.snap)}>
        <img className="friend-bitmoji" src="http://emojipedia-us.s3.amazonaws.com/content/2015/08/26/snapchat-recieved-snap-without-audio.png"/>
        From {this.getSenderName(this.props.snap)}
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    selectedSnap: state.selectedSnap,
    usersAr: state.usersAr,
    recievedSnaps: state.recievedSnaps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSelectedSnap: (snap)=> dispatch({type:'SELECT_SNAP', payload: snap}),
    removeViewedSnap: (snap) => dispatch({type: 'REMOVE_VIEWED_SNAP', payload: snap})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecievedSnap);
