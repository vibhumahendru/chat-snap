import React, { Component } from 'react';
import Webcam from "react-webcam";
import './App.css';
import {connect} from 'react-redux'
import RecievedSnapContainer from './components/RecievedSnapContainer.js'
import AddFriend from './components/AddFriend.js'
import FriendContainer from './components/FriendContainer.js'



class Snapchat extends Component {

  capture = () => {
      const imageSrc = this.webcam.getScreenshot();

      fetch('http://localhost:3000/snaps', {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({

            sender_id: this.props.currentUser.id,
            reciever_id: 2,
            dataUri: imageSrc,
            timer: this.props.setTimer
          })
      })
    };

  setRef = webcam => {
        this.webcam = webcam;
      };

  setTimer=(event)=>{
    this.props.changeSetTimer(event.target.value)
  }


  render() {
    console.log(this.props);
    return (
      <div >

      {this.props.currentUser ? <h1>HII {this.props.currentUser.name}</h1> :null}
      
        <AddFriend/>
        <FriendContainer/>
        <br></br>
        <Webcam audio={false} className="cam" ref={this.setRef}/>
        <button onClick={this.capture}>TAKE PIC</button>
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
    setTimer: state.setTimer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSetTimer: (time)=> dispatch({type:'CHANGE_TIMER', payload: time})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Snapchat)
