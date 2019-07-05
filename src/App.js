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
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if ((destination.droppableId === source.droppableId) && (destination.index === source.index)) return;

    const column = this.state.columns[source.droppableId];
    const newTasksIds = Array.from(column.tasksIds);
    newTasksIds.splice(source.index, 1);
    newTasksIds.splice(destination.index, 0, draggableId);

    const newColumn = { ...column, tasksIds: newTasksIds };

    const newState = {
      ...this.state,
      columns: { ...this.state.columns, [newColumn.id]: newColumn }
    }

    this.setState(newState);
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
