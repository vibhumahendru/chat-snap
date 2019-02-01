import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../App.css';

class RecievedSnapContainer extends Component {


  handleViewSnap=(snap)=>{
    console.log(snap);
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

  getSenderName=(snap)=>{
    let foundSender = this.props.usersAr.find(user=> user.id === snap.sender_id)
    return foundSender.name
  }


  render() {
    return (
      <div>
      {this.props.currentUser ?
        <h1>{this.props.currentUser.name}'s New Snap Container {this.props.recievedSnaps.filter(snap=> snap.viewed === false).map(snap=> <li onClick={()=>this.handleViewSnap(snap)} >View snap from {this.getSenderName(snap)}</li>)}</h1> :null
      }
      {
        this.props.selectedSnap ? <div id="snap-back"><img id="the-snap" src={this.props.selectedSnap.dataUri}/></div> :null
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(RecievedSnapContainer);
