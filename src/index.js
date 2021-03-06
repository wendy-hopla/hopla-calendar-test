import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import Calendar from './component/calendar/Calendar'
import WidgetContainer from './component/calendar/WidgetContainer'

function App() {
  return (
    <div className="calendar-container">
      <div className="Calendar">
        <WidgetContainer />
    </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
