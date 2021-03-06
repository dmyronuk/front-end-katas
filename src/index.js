import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import "./styles/main.css";
import "./styles/header.css";
import "./styles/landing.css";
import "./styles/carousel.css";
import "./styles/infinite-scroll.css";
import "./styles/loading-animations.css";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
