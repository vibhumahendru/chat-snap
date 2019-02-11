import React, { Component } from 'react';
import Webcam from "react-webcam";
import './App.css';
import {connect} from 'react-redux'
import RecievedSnapContainer from './components/RecievedSnapContainer.js'
import AddFriend from './components/AddFriend.js'
import FriendContainer from './components/FriendContainer.js'
import ChooseFriend from './components/ChooseFriend.js'
import Sticker from './components/Sticker.js'
import Nav from './components/Nav.js'
import './shutter.mp3'
import TextFeature from './components/TextFeature.js'


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

      var audio = new Audio('shutter.mp3');
      audio.play()
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

  getNewRecSnaps=(userId)=>{
    fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(user => {
      // console.log("polling active!!");
      this.handleFriendObjAr()
      return this.props.setCurrentUser(user);
    })
  }

  getUsers = ()=>{
    // console.log('poll users active');
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => this.props.changeUserAr(users))
  }


  pollRecSnapsInterval =null
  pollUsers = null

  handleFriendObjAr = ()=>{
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



  componentDidMount(){
    // console.log('initial friends in sp', this.props.friends, 'USER IS', this.props.currentUser);
    // console.log("all users", this.props.usersAr);

    if (this.props.currentUser === null) {
      console.log("SUP NULL");
      this.handleLogout()
    }


    this.pollUsers = setInterval(()=> this.getUsers(), 2900)
    this.pollRecSnapsInterval = setInterval(()=> this.getNewRecSnaps(this.props.currentUser.id), 3000)

    this.handleFriendObjAr()
    // this.getNewRecSnaps(this.props.currentUser.id)

    // let testAr = []
    // this.props.friends.forEach((rel)=>{
    //   if (rel.friender_id === this.props.currentUser.id) {
    //     let foundFriend = this.props.usersAr.find(user=> user.id === rel.friendee_id)
    //     testAr = [...testAr, foundFriend]
    //   }else{
    //     let foundFriend = this.props.usersAr.find(user=> user.id === rel.friender_id)
    //     testAr = [...testAr, foundFriend]
    //   }
    // })
    // // console.log('friendObjAr', testAr);
    // this.props.setFriendObjAr(testAr)
  }

  componentWillUnmount(){
    console.log("unmounted");

    clearInterval(this.pollRecSnapsInterval)
    clearInterval(this.pollUsers)
  }

  handleReset=()=>{
    this.props.setCurrentPhoto(null)
    this.props.updateSticker(null)
  }

  render() {

    return (
      <div >
          <nav >
              {this.props.currentUser ? <Nav/> :null}
              <button className="btn btn-outline-danger btn-sm" onClick={this.handleLogout} >Logout</button>
          </nav>
        <div className="grid-container">
          <div className="grid-item" >
            <FriendContainer/>
            <AddFriend frObjAr={this.props.friendObjAr}/>
          </div>


          <div className="snap-container" >
            {this.props.currentPhoto ? <div className="image-sticker" ><div className="wrapper-take-photo"><h3 style={ { color: `${ this.props.textColor }` } } className="view-message">{this.props.message}</h3><img id="the-sticker" src={this.props.sticker}/><img id="the-snap" src={this.props.currentPhoto}/></div></div> : <Webcam audio={false} className="cam" ref={this.setRef}/>}

            <br></br>
            <br></br>
            {this.props.currentPhoto ? <button className="btn btn-primary btn-sm" onClick={this.handleReset}>Take Another Pic</button>: <button className="btn btn-primary btn-sm" onClick={this.capture}>TAKE PIC</button>}
            <br></br>
            <div className="editor">
              {this.props.currentPhoto ? null: <h6 className="placeholder-editor">Take picture to edit</h6>}
                <div className="col-one">
                {this.props.currentPhoto ? <div className='timer-box' ><>Timer</><select onChange={(event)=> this.setTimer(event)}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option></select></div> :null}
                  {this.props.currentPhoto ? <Sticker/> :null}
                  {this.props.currentPhoto ? <TextFeature/> :null}
                </div>
            <div className="col-two">


                    {this.props.currentPhoto ? <ChooseFriend className="choose-friend" friendObjAr={this.props.friendObjAr}/> :null}
                    </div>

            </div>
          </div>
        {this.props.currentUser ?
          <div className="grid-item" ><RecievedSnapContainer/></div> :null
        }
        </div>
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
    recievedSnaps: state.recievedSnaps,
    sticker:state.sticker,
    message: state.message,
    textColor: state.textColor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSetTimer: (time)=> dispatch({type:'CHANGE_TIMER', payload: time}),
    setCurrentPhoto: (image)=> dispatch({type: 'SET_CURRENT_PHOTO', payload: image}),
    setFriendObjAr: (friendAr)=> dispatch({type: 'SET_FRIEND_OBJ_AR', payload: friendAr}),
    logout: ()=> dispatch({type: 'LOGOUT'}),
    updateSticker: (stickerUrl)=> dispatch({type: 'UPDATE_STICKER', payload: stickerUrl}),
    pollingRecSnaps: (user) => dispatch({type: 'POLLING_REC_SNAPS', payload:user}),
      setCurrentUser: (user)=> dispatch({type: 'SET_CURRENT_USER', payload:user}),
      changeUserAr: (userAr)=> dispatch({type: 'SET_USER_ARRAY', payload: userAr})

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Snapchat)
