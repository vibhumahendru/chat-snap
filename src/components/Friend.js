import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../App.css';


class Friend extends Component {

  handleFindFriendName =()=>{
    if (this.props.request.friender_id === this.props.currentUser.id) {
      let foundFriend = this.props.usersAr.find(user=> user.id === this.props.request.friendee_id)
      return foundFriend.name
    }else{
      let foundFriend = this.props.usersAr.find(user=> user.id === this.props.request.friender_id)
      return foundFriend.name
    }
  }

  handleFindHeart=()=>{
    if (this.props.currentUser.sent_snaps.length === 0) {
      return false
    }
    else {
      console.log(this.props.currentUser.sent_snaps);
       let recieverIdAr = this.props.currentUser.sent_snaps.map(snap=> snap.reciever_id)
       console.log('recieverIdAr', recieverIdAr);

       let uniqueRecSnapIdAr = [...new Set(recieverIdAr)];
       console.log('YO',uniqueRecSnapIdAr);
       let mainCounter = {id: null, count:0}
       uniqueRecSnapIdAr.forEach((element)=> {
         let counterAr = recieverIdAr.filter(id => id === element)
         if (counterAr.length > mainCounter.count) {
             mainCounter.count = counterAr.length
             mainCounter.id = element
         }
       })
       console.log('big one',mainCounter);
       let foundBF = this.props.usersAr.find(user=> user.id === mainCounter.id)
       console.log('THE ONE', foundBF);
       return foundBF.name

    }

  }



  render() {
      console.log(this.handleFindHeart());
    return (
      <div className="alert alert-success">
      <img className="friend-bitmoji" src="http://christinagriffis.com/wp-content/uploads/2018/02/Christina-Bitmoji-Circle-01.png"/>
        <h4 className="friend-name">{this.handleFindFriendName()}</h4>
        {this.handleFindFriendName() === this.handleFindHeart() ? <img className="heart-emoji" src="https://cdn.shopify.com/s/files/1/1061/1924/products/Sparkling_Pink_Heart_Emoji_large.png?v=1480481032"/>:null}
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

function mapDispatchToProps(dispatch) {
  return {
    updateFriends: (rel)=> dispatch({type: 'UPDATE_FRIENDS', payload: rel})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
