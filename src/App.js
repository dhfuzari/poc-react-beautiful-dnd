import React, { Component } from 'react';
import initialData from './initial-data';
import Column from './column';

import './App.css';

class App extends Component {
  state = initialData;

  render() {
    return this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const tasks = column.tasksIds.map(taskId => this.state.tasks[taskId]);

      return <Column key={column.id} column={column} tasks={tasks} />
    })
  }
}

export default App;
