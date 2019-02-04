import React, { Component } from 'react';
import {connect} from 'react-redux'


class Sticker extends Component {

  handleSelectSticker=(event)=>{
    console.log(event.target.value);
    if (event.target.value === "New York") {
        this.props.updateSticker("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/I_Love_New_York.svg/2000px-I_Love_New_York.svg.png")
      }
      else if (event.target.value === "Flatiron School") {
        this.props.updateSticker("https://upload.wikimedia.org/wikipedia/commons/6/61/FS_wiki.png")

      } else {
        this.props.updateSticker(null)
      }

  }

  render() {
    console.log(this.props.sticker);
    return (
      <div>
          Add Sticker:
          <select onChange={(event)=>this.handleSelectSticker(event)} className="btn btn-secondary dropdown-toggle">
          <option>Select one:</option>
          <option>New York</option>
          <option>Flatiron School</option>
          </select>
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
