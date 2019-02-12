import React, { Component } from 'react';
import {connect} from 'react-redux'

class SignUp extends Component {

  state={
    animalAvatar: null
  }

  handleChange=(event)=>{
    this.props.changeNewUsernameInput(event.target.value)
  }

  handleSubmit=()=>{

    let foundUser = this.props.usersAr.find(user=> user.name === this.props.newUsernameInput)
    if (foundUser) {
      return alert("Username already take :(")
    }
    else if (this.props.newUsernameInput === null || this.props.newUsernameInput.length === 0) {
      return alert("Username must be atleast 4 characters long")
    }
    else {

      fetch('http://localhost:3000/users', {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.props.newUsernameInput,
            avatarUrl: this.state.animalAvatar
          })
      }).then(res => res.json())
      .then(user => this.props.setCurrentUser(user))


      alert("Your account is ready!")

      setTimeout(()=>this.props.history.push('/main'), 500)


    }

  }

  handleAvatarSelect=(event)=>{
    console.log(event.target.src);
    this.setState({
      animalAvatar:event.target.src
    })
  }

  render() {

    return (
      <div>
      <h1> Create Account</h1>
          <div className="form-group">
            <div className="signup-inputs">
              <input placeholder="Name" onChange={(event)=> this.handleChange(event)} type="text"></input><br></br>
              <input placeholder="Password" type="password"></input><br></br>
              {this.state.animalAvatar ? <img className="selected-animal" src={this.state.animalAvatar}/>: null}
              {this.state.animalAvatar ? <button onClick={this.handleSubmit} class="btn btn-primary">Submit</button>: null}

            </div>
          </div>
            <div className="avatar-container">
                <div>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="https://cdn3.iconfinder.com/data/icons/supericon-animals-1/512/Monkey_Square_Clear.png"/>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/1024/22259-bear-face-icon.png"/>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="https://cdn.iconscout.com/icon/free/png-256/pig-face-sus-wild-animal-food-33928.png"/>
                </div>
                <div>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="https://www.directlink.coop/img/icons/avatars/235348-animals/png/lion.png"/>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="https://www.directlink.coop/img/icons/avatars/235348-animals/png/tiger.png"/>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/1024/22252-hamster-face-icon.png"/>
                </div>
                <div>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="https://cdn1.iconfinder.com/data/icons/owl-face/1000/owl_face_emoticon-12-512.png"/>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/1024/22261-panda-face-icon.png"/>
                <img onClick={(event)=>this.handleAvatarSelect(event)} className="animal-bitmoji" src="https://cdn3.iconfinder.com/data/icons/supericon-animals-1/512/Hippo_Square_Clear.png"/>
                </div>
            </div>

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
