import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import multiColumnsKanbanData from '../../data/multi-columns-kanban-data';
import InnerColumnsList from '../inner-columns-list';

import './MultiColumnsKanban.css';

class MultiColumnsKanban extends Component {
  state = multiColumnsKanbanData;

  onDragStart = (start) => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({ homeIndex });
  }

  onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.tasks).length
      : 0
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  }

  onDragEnd = (result) => {
    this.setState({ homeIndex: null });
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if ((destination.droppableId === source.droppableId) && (destination.index === source.index)) return;

    // Check if a column is being reordered
    if(type === 'column') {
      const newColumOrder = Array.from(this.state.columnOrder);
      newColumOrder.splice(source.index, 1);
      newColumOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumOrder
      }

      this.setState(newState);
      return;
    }

    // Start and finish columns
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    // If source and destination are the same column
    if (start === finish) {
      const newTasksIds = Array.from(start.tasksIds);
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, tasksIds: newTasksIds };

      const newState = {
        ...this.state,
        columns: { ...this.state.columns, [newColumn.id]: newColumn }
      }

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTasksIds = Array.from(start.tasksIds);
    startTasksIds.splice(source.index, 1);
    const newStart = {
      ...start,
      tasksIds: startTasksIds
    };

    const finishTasksIds = Array.from(finish.tasksIds);
    finishTasksIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      tasksIds: finishTasksIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.setState(newState);
  }
  render() {
    console.log('render MultiColumnsKanban');
    const { axis } = this.state;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Droppable 
          droppableId="all-columns" 
          direction="horizontal" 
          type="column"
        >
          {(provided) => (
            <div 
              className="wrapper-columns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                const isDropDisabled = index < this.state.homeIndex;
                return <InnerColumnsList key={column.id} column={column} tasksMap={this.state.tasks} axis={axis} index={index} isDropDisabled={isDropDisabled}/>
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default MultiColumnsKanban;
