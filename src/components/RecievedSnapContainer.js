import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../App.css';
import RecievedSnap from './RecievedSnap.js'
import SeenSnap from './SeenSnap.js'

class RecievedSnapContainer extends Component {


  // handleViewSnap=(snap)=>{
  //   console.log(snap);
  //   this.props.changeSelectedSnap(snap)
  //   setTimeout(()=> this.props.changeSelectedSnap(null), snap.timer*1000 )
  //
  //   fetch(`http://localhost:3000/snaps/${snap.id}`, {
  //     method:'PATCH',
  //     headers:{
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         viewed: true
  //
  //       })
  //   }).then(console.log('view worked'))
  //
  //   this.props.removeViewedSnap(snap)
  //
  // }

  // {this.props.currentUser ?
  //   <h1>New Snaps {this.props.recievedSnaps.filter(snap=> snap.viewed === false).map(snap=> <li onClick={()=>this.handleViewSnap(snap)} >View snap from {this.getSenderName(snap)}</li>)}</h1> :null
  // }

  // getSenderName=(snap)=>{
  //   let foundSender = this.props.usersAr.find(user=> user.id === snap.sender_id)
  //   return foundSender.name
  // }

  // componentDidMount(){
  //   this.setState({
  //     testColor: "red"
  //   })
  // }
  //
  // state = {
  //   testColor: "red"
  // }


  render() {

    return (
      <div>
          <h4>New Snaps</h4>
            <div className="rec-snap-container">
            {this.props.recievedSnaps.filter(snap=> snap.viewed === false).length === 0 ? <h4 id="no-new-snaps">No New Snaps</h4> :null}
          {
            this.props.recievedSnaps.filter(snap=> snap.viewed === false).map(snap=> <RecievedSnap snap={snap}/>)
          }
          </div>
          {
            this.props.selectedSnap ? <div id="snap-back"><div className="wrapper-take-photo"><h3 style={ { color: `${ this.props.selectedSnap.textColor }` } } className="view-message">{this.props.selectedSnap.message}</h3><img id="the-snap" src={this.props.selectedSnap.dataUri}/><img id="the-sticker-viewing" src={this.props.selectedSnap.stickerUrl}/></div></div> :null
          }



          <div className="seen-snaps" >
            <h4 id="opened">Opened</h4>
            {this.props.recievedSnaps.filter(snap=> snap.viewed === true).length === 0 ? <h4 id="no-new-snaps">No received Snaps yet</h4> :null}
            {this.props.recievedSnaps.filter(snap=> snap.viewed === true).map(snap=> <SeenSnap snap={snap}/>).reverse()}
          </div>
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
