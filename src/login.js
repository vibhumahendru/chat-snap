import React, { Component } from 'react';
import {connect} from 'react-redux'

class Login extends Component {

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
      return this.props.changeUserAr(users)})
  }

  handleClick=()=>{
    let foundUser= this.props.usersAr.find(user=> user.name === this.props.loginInput)
    if (foundUser) {
      console.log("FOUND");
      this.props.setCurrentUser(foundUser)
      setTimeout(()=>this.props.history.push('/main'), 500)

      let friendRequestsAr = foundUser.friendeed_relationships.filter(rel => rel.accepted === false)
      // console.log('FR REQ',friendRequestsAr);
      //
      // let friendAr = foundUser.friendeed_relationships.filter(rel=> rel.accepted === true)
      // let friendArDos = foundUser.friendered_relationships.filter(rel=> rel.accepted === true)
      // let friends = friendAr.concat(friendArDos)
      //
      // console.log('friends', friends);
    }else{
      console.log("not found");
    }
  }

  handleChange=(event)=>{
    this.props.changeLoginInput(event.target.value)
  }

    render() {

      return (
        <div>
        <h1>Welcome</h1>
        <img id="the-snap" src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c536.png"/>
        <h3>Please enter username</h3>
        <input onChange={this.handleChange} type="text" placeholder="sup"></input>
        <button onClick={this.handleClick} >Submit</button>
        <br></br>
        {this.props.currentUser ? <h2>Welcome Back!!</h2> :null}

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
      friendRequests: state.friendRequests
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      changeLoginInput: (user) => dispatch({type: 'CHANGE_USER',payload: user}),
      changeUserAr: (userAr)=> dispatch({
        type: 'SET_USER_ARRAY',
        payload: userAr
      }),
      setCurrentUser: (user)=> dispatch({type: 'SET_CURRENT_USER', payload:user})
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Login);
