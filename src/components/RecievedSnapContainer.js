import React, { Component } from 'react';
import {connect} from 'react-redux'

class RecievedSnapContainer extends Component {


  handleViewSnap=(snap)=>{
    console.log(snap.timer);
    this.props.changeSelectedSnap(snap)

    setTimeout(()=> this.props.changeSelectedSnap(null), snap.timer*1000 )

  }



  render() {
    return (
      <div>
      {this.props.currentUser ?
        <h1>{this.props.currentUser.name}'s New Snap Container {this.props.currentUser.recieved_snaps.map(snap=> <li onClick={()=>this.handleViewSnap(snap)} >{snap.id}</li>)}</h1> :null
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
    selectedSnap: state.selectedSnap
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSelectedSnap: (snap)=> dispatch({type:'SELECT_SNAP', payload: snap})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecievedSnapContainer);
