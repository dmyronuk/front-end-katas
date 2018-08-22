import React, { Component } from "react";

class LoadingAnimations extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedAnimationIndex: 0
    }
    this.animations = ["Vertical Bounce", "Arc Bounce", "C", "D", "E"]
  }

  selectAnimation(i){
    this.setState({
      selectedAnimationIndex: i
    })
  }

  render(){
    const animation = ((animIndex) => {
      switch(this.state.selectedAnimationIndex){
        case 0:
          return(
            <div className="flex-row">
              <div id="bouncing-ball-a" className="ball bouncing-ball" />
              <div id="bouncing-ball-b" className="ball bouncing-ball" />
              <div id="bouncing-ball-c" className="ball bouncing-ball" />
            </div>
          )

        case 1:
          return(
            <div className="flex-row arc-container">
              <div id="arc-ball-a" className="ball arc-ball" />
              <div id="arc-ball-b" className="ball arc-ball" />
              <div id="arc-ball-c" className="ball arc-ball" />
              <div id="arc-ball-d" className="ball arc-ball" />
            </div>
          )

        default:

          return(
              <div></div>
            )
      }
    })(this.state.selectedAnimation)

    return(
      <div className="loading-animations-outer">
        <div className="selector-container">
          {this.animations.map((animation, i) =>
            <button key={i} onClick={ () => this.selectAnimation(i)}>
              {animation}
            </button>
          )}
        </div>
        <div className="animation-container">
          {animation}
        </div>
      </div>
    )
  }
}

export default LoadingAnimations;