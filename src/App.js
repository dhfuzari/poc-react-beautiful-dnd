import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';

import '@atlaskit/css-reset';
import './App.css';

class App extends Component {
  state = initialData;

  onDragStart = () => {
    console.log('onDragStart')
  }

  onDragUpdate = () => {
    console.log('onDragUpdate')
  }

  onDragEnd = (result) => {
    // TODO: reorder our column
    console.log('onDragEnd')
  }


  render() {

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
      >
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.tasksIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </DragDropContext>
    )







  }
}

export default App;
