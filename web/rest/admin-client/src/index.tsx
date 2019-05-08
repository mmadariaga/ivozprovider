import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBuilder from './App';
import * as serviceWorker from './serviceWorker';
import specOverwrite from './config';

const App = AppBuilder(
    'api/platform',
    specOverwrite
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


/**
 * TODO
 * https://medium.com/capriza-engineering/sharing-source-code-and-libraries-in-react-bd30926df312
 *
 */
