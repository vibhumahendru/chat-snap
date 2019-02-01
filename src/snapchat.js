import React, { Component } from 'react';
import Webcam from "react-webcam";
import './App.css';
import {connect} from 'react-redux'
import RecievedSnapContainer from './components/RecievedSnapContainer.js'
import AddFriend from './components/AddFriend.js'
import FriendContainer from './components/FriendContainer.js'
import ChooseFriend from './components/ChooseFriend.js'



class Snapchat extends Component {

  capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      this.props.setCurrentPhoto(imageSrc)
      // fetch('http://localhost:3000/snaps', {
      //   method:'POST',
      //   headers:{
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //
      //       sender_id: this.props.currentUser.id,
      //       reciever_id: 2,
      //       dataUri: imageSrc,
      //       timer: this.props.setTimer
      //     })
      // })
    }

  setRef = webcam => {
        this.webcam = webcam;
      };

  setTimer=(event)=>{
    this.props.changeSetTimer(event.target.value)
  }

  handleLogout=()=> {
    this.props.logout()
    this.props.history.push('/login')
  }

  componentDidMount(){
    // console.log('initial friends in sp', this.props.friends, 'USER IS', this.props.currentUser);
    // console.log("all users", this.props.usersAr);

    let testAr = []
    this.props.friends.forEach((rel)=>{
      if (rel.friender_id === this.props.currentUser.id) {
        let foundFriend = this.props.usersAr.find(user=> user.id === rel.friendee_id)
        testAr = [...testAr, foundFriend]
      }else{
        let foundFriend = this.props.usersAr.find(user=> user.id === rel.friender_id)
        testAr = [...testAr, foundFriend]
      }
    })
    // console.log('friendObjAr', testAr);
    this.props.setFriendObjAr(testAr)
  }

  render() {
    console.log('in snapchat', this.props);
    return (
      <div >

      {this.props.currentUser ? <h1>HII {this.props.currentUser.name}</h1> :null}
        <button onClick={this.handleLogout} >Logout</button>
        <AddFriend/>
        <FriendContainer/>
        <br></br>
        {this.props.currentPhoto ? <img id="the-snap" src={this.props.currentPhoto}/> : <Webcam audio={false} className="cam" ref={this.setRef}/>}
        {this.props.currentPhoto ? <button onClick={()=> this.props.setCurrentPhoto(null)}>Take Another Pic</button>: <button onClick={this.capture}>TAKE PIC</button>}
      Timer  <select onChange={(event)=> this.setTimer(event)}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        </select>
        {this.props.currentPhoto ? <><h2>Who do you want to send this to?</h2><ChooseFriend friendObjAr={this.props.friendObjAr}/></> :null}
        {this.props.currentUser ?
          <RecievedSnapContainer/> :null
        }
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    setTimer: state.setTimer,
    currentPhoto: state.currentPhoto,
    friends: state.friends,
    usersAr: state.usersAr,
    friendObjAr: state.friendObjAr,
    recievedSnaps: state.recievedSnaps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSetTimer: (time)=> dispatch({type:'CHANGE_TIMER', payload: time}),
    setCurrentPhoto: (image)=> dispatch({type: 'SET_CURRENT_PHOTO', payload: image}),
    setFriendObjAr: (friendAr)=> dispatch({type: 'SET_FRIEND_OBJ_AR', payload: friendAr}),
    logout: ()=> dispatch({type: 'LOGOUT'})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Snapchat)
