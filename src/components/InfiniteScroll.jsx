import React, { Component } from "react";
import NoImg from "../images/infinite-scroll/no_img.png";

class InfiniteScroll extends Component{
  constructor(props){
    super(props);

    //using the reddit search api, adding the after query param will fetch the next set of results
    //after an initial search query -- used for pagination etc
    this.state = {
      searchTerm: "",
      baseEndpoint: "",
      nextEndpoint: "",
      isLoading: false,
      images: [],
    }
  }

  handleInputChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true
    })
    const url = `https://www.reddit.com/search.json?limit=30&q=${this.state.searchTerm}`;
    fetch(url)
    .then(response => {
      return response.json()})
    .then(parsed => {
      const images = parsed.data.children.filter(child => {
        const preview = child.data.preview
        return preview && preview.images && preview.images[0].resolutions.length > 0 })
      .map(child => {
        const finalRes = child.data.preview.images[0].resolutions.length - 1;
        //reddit stores its image urls with character-escaped ampersands so
        //need to use regex to unescape them
        return child.data.preview.images[0].resolutions[finalRes].url.replace(/&amp;/g, "&");
      })
      this.setState({
        images,
        baseEndpoint: url,
        nextEndpoint: `${url}&after=${parsed.data.after}`,
        isLoading: false,
      })
    })
  }

  loadImagesOnscroll = () => {
    this.setState({
      isLoading: true
    })
    fetch(this.state.nextEndpoint)
    .then(response => {
      return response.json()})
    .then(parsed => {
      const newImages = parsed.data.children.filter(child => {
        const preview = child.data.preview
        return preview && preview.images && preview.images[0].resolutions.length > 0 })
      .map(child => {
        const finalRes = child.data.preview.images[0].resolutions.length - 1;
        return child.data.preview.images[0].resolutions[finalRes].url.replace(/&amp;/g, "&");
      })
      this.setState({
        images: this.state.images.concat(newImages),
        nextEndpoint: `${this.state.baseEndpoint}&after=${parsed.data.after}`,
        isLoading: false,
      })
    })
  }

  handleImgError = (e) => {
    e.target.src = NoImg;
  }

  componentShouldLoadImages = () => {
    return (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 20) && !this.state.isLoading
  }

  componentDidMount(){
    window.onscroll = () => {
      if(this.componentShouldLoadImages()){
        this.loadImagesOnscroll();
      }
    }
  }

  render(){
    return (
      <div className="outer-scoll-container">
        <form className="reddit-search-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={this.state.searchTerm}
          />
          <button
            type="submit"
            onSubmit={this.handleSubmit}
          >
            Search
          </button>
        </form>
        <div className="scroll-grid-container">
          {this.state.images.map((image, i) =>
            <div key={i}>
              <a href={image}>
                <img
                  alt="Reddit Pic"
                  src={image}
                  onError={this.handleImgError}
                />
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default InfiniteScroll;