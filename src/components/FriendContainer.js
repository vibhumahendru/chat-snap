import React, { Component } from 'react';
import {connect} from 'react-redux'
import FriendRequest from './FriendRequest.js'
import Friend from './Friend.js'


class FriendContainer extends Component {



  // notAcceptedRequests=()=>{
  //   let notAcceptedRequestsAr = this.props.currentUser.friendeed_relationships.filter(rel => rel.accepted == false)
  //   return notAcceptedRequestsAr
  // }
  //
  // acceptedRequests=()=>{
  //   let acceptedRequestsAr = this.props.currentUser.friendeed_relationships.filter(rel => rel.accepted == true)
  //   return acceptedRequestsAr
  // }


  render() {
    // console.log('updated- Friend Con -', this.props);
    return (
      <div>

      <h1>Your Friends</h1>
      {this.props.currentUser ?
        this.props.friends.map(request=> <Friend request={request}/>) :null
      }
      <br></br>
      {this.props.friendRequests.length>0 ? <h1>New Requests</h1> :null}
        {this.props.currentUser ?
          this.props.friendRequests.filter(req=> req.accepted === false).map(request=> <FriendRequest request={request}/>) :null
        }

      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    friends: state.friends,
    friendRequests: state.friendRequests,
    usersAr: state.usersAr
  }
}

export default connect(mapStateToProps)(FriendContainer)
