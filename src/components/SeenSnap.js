import React, { Component } from 'react';
import {connect} from 'react-redux'

class SeenSnap extends Component {

  getSenderName=(snap)=>{
    let foundSender = this.props.usersAr.find(user=> user.id === snap.sender_id)
    return foundSender.name
  }

  render() {
    return (
      <div className="recieved-seen-snap" >
      <img className="friend-bitmoji" src="https://appstipsandtricks.com/wp-content/uploads/2016/11/snapchat-red-viewed.png"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeenSnap);
