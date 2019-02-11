import React, { Component } from 'react';
import {connect} from 'react-redux'


class Sticker extends Component {

  state={
    chooseOwnSticker: false,
    stickerInput: null
  }

  handleChange=(event)=>{
      this.props.updateSticker(event.target.value)
  }

  handleSelectSticker=(event)=>{

    if (event.target.value === "New York") {
        this.props.updateSticker("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/I_Love_New_York.svg/2000px-I_Love_New_York.svg.png")
      }
      else if (event.target.value === "Flatiron School") {
        this.props.updateSticker("https://upload.wikimedia.org/wikipedia/commons/6/61/FS_wiki.png")

      }
      else if (event.target.value === "Poop") {
        this.props.updateSticker("https://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_2_large.png?v=1542436024")
      }
      else if(event.target.value === "Choose Your Own!"){
          this.props.updateSticker(null)
          this.setState({
            chooseOwnSticker:true
          })
      }
      else {
        this.props.updateSticker(null)
      }

  }

  render() {

    return (
      <div className='sticker-box'>
          Add Sticker:
          <select onChange={(event)=>this.handleSelectSticker(event)} className="btn btn-secondary dropdown-toggle">
          <option>Select one:</option>
          <option>New York</option>
          <option>Flatiron School</option>
          <option>Poop</option>
          <option>Choose Your Own!</option>
          </select>
          <br></br>
          {this.state.chooseOwnSticker ? <>Enter Url: <input onChange={(event)=>this.handleChange(event)} type="text"></input></> :null}
      </div>
    );
  }

}

function mapStateToProps(state){
  return {

    sticker: state.sticker
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSticker: (stickerUrl)=> dispatch({type: 'UPDATE_STICKER', payload: stickerUrl})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sticker);
