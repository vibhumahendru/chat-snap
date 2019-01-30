import React, { Component } from 'react';
import {connect} from 'react-redux'
import FriendRequest from './FriendRequest.js'


class FriendContainer extends Component {


  notAcceptedRequests=()=>{
    let notAcceptedRequestsAr = this.props.currentUser.friendeed_relationships.filter(rel => rel.accepted == false)
    console.log(notAcceptedRequestsAr);
    return notAcceptedRequestsAr
  }

  acceptedRequests=()=>{
    let acceptedRequestsAr = this.props.currentUser.friendeed_relationships.filter(rel => rel.accepted == true)
    console.log(acceptedRequestsAr);
    return acceptedRequestsAr
  }


  render() {
    console.log('inside friend con', this.props);
    return (
      <div>
      <h1>Your Friends</h1>
      {this.props.currentUser ?
        this.acceptedRequests().map(request=> <FriendRequest request={request}/>) :null
      }
      <br></br>
      <h1>New Requests</h1>
        {this.props.currentUser ?
          this.notAcceptedRequests().map(request=> <FriendRequest request={request}/>) :null
        }
        <button onClick={()=> this.notAcceptedRequests()} ></button>
      </div>
    );
  } 

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(FriendContainer)
