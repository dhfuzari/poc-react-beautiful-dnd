import React, { Component, Fragment } from 'react';
import MultiColumnsKanban from '../multi-columns-kanban/'

import '@atlaskit/css-reset';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h2>Multiple columns kanban layout - <small>vertical lists</small></h2><br />
        <MultiColumnsKanban />
      </Fragment>
    )
  }
}

export default App;
