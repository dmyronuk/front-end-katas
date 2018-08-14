import React, { Component } from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Carousel from "./components/Carousel";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main-flex-column-container">
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/carousel" component={Carousel} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
