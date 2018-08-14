import React, { Component } from "react";
import LeftArrow from "../images/carousel/left_arrow.png";
import RightArrow from "../images/carousel/right_arrow.png";
import CatA from "../images/carousel/cat_a.jpg";
import CatB from "../images/carousel/cat_b.jpg";
import CatC from "../images/carousel/cat_c.jpg";
import CatD from "../images/carousel/cat_d.jpg";
import CatE from "../images/carousel/cat_e.jpg";

class Carousel extends Component {
  constructor(props){
    super(props);
    this.state = {
      carouselOuterWidth: 550,
      carouselOuterHeight: 550,
    }
  }

  handleLeftArrowClick = () => {
    if(this.state.leftOffset < 0){
      this.setState({
        leftOffset: this.state.leftOffset + this.state.carouselOuterWidth
      })
    }
  }

  handleRightArrowClick = () => {
    if(this.state.leftOffset > this.state.minLeftOffset ){
      this.setState({
        leftOffset: this.state.leftOffset - this.state.carouselOuterWidth
      })
    }
  }

  componentDidMount(){
    const carouselImages = [ CatA, CatB, CatC, CatD, CatE ];
    const carouselInnerWidth = this.state.carouselOuterWidth * carouselImages.length;
    //when the carousel-inner is given a negative left property, the images are pushed
    //left of the container, making it appear as if the carousel is scrolling right
    const minLeftOffset = this.state.carouselOuterWidth * (carouselImages.length - 1) * -1;

    this.setState({
      carouselImages,
      carouselInnerWidth,
      minLeftOffset,
      leftOffset: 0,
    })
  }

  render(){
    return (
      <div
        className="carousel-outer"
        style={{ width: this.state.carouselOuterWidth, height: this.state.carouselOuterHeight }}
      >
        <img
          alt="Left Arrow"
          src={LeftArrow}
          className="arrow left-arrow"
          onClick={this.handleLeftArrowClick}
        />
        <img
          alt="Right Arrow"
          src={RightArrow}
          className="arrow right-arrow"
          onClick={this.handleRightArrowClick}
        />
        <div
          className="carousel-inner"
          style={{ width: this.state.carouselInnerWidth, left: this.state.leftOffset }}
        >
          { this.state.carouselImages && this.state.carouselImages.map((elem, i) =>
              <div key={i} className="carousel-img-container">
                <img
                  alt="Cute Cat"
                  src={elem}
                  style={{
                    width: this.state.carouselOuterWidth,
                    height: this.state.carouselOuterHeight
                  }}
                />
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default Carousel;