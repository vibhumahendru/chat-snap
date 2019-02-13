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

      <h4>Your Friends</h4>
      {this.props.friends.length>0 ?
        <div className="scroll-friends">{this.props.friends.map(request=> <Friend request={request}/>)}</div> :null
      }
      <br></br>
      {this.props.friendRequests.length>0 ? <h5>New Requests</h5> :null}
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
