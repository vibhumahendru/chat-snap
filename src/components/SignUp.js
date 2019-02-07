import React, { Component } from 'react';
import {connect} from 'react-redux'

class SignUp extends Component {


  handleChange=(event)=>{
    this.props.changeNewUsernameInput(event.target.value)
  }

  handleSubmit=()=>{

    let foundUser = this.props.usersAr.find(user=> user.name === this.props.newUsernameInput)
    if (foundUser) {
      return alert("Username already take :(")
    }else {

      fetch('http://localhost:3000/users', {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.props.newUsernameInput
          })
      }).then(res => res.json())
      .then(user => this.props.setCurrentUser(user))
      .then(this.props.history.push('/main'))

      alert("Your account is ready!")




    }

  }

  render() {

    return (
      <div>
      <h1> Create Account</h1>
          <div className="form-group">
          Name: <input onChange={(event)=> this.handleChange(event)} type="text"></input><br></br>
          </div>
          <button onClick={this.handleSubmit} class="btn btn-primary">Submit</button>

      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    loginInput: state.loginInput,
    usersAr: state.usersAr,
    currentUser: state.currentUser,
    friends: state.friends,
    friendRequests: state.friendRequests,
    newUsernameInput: state.newUsernameInput
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeNewUsernameInput: (username) => dispatch({type: 'CHANGE_NEW_USERNAME',payload: username}),
    setCurrentUser: (user)=> dispatch({type: 'SET_CURRENT_USER', payload:user})


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
