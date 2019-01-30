import React, { Component } from 'react';

class FriendRequest extends Component {

  handleSendFR=()=>{
    console.log(this.props.request.id);
    fetch(`http://localhost:3000/relationships/${this.props.request.id}`, {
      method:'PATCH',
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accepted: true

        })
    })
  }

  render() {
    return (
      <div>Your Friend!!{this.props.request.id}
        <button onClick={this.handleSendFR}>Accept</button>
      </div>
    );
  }

}

export default FriendRequest;
