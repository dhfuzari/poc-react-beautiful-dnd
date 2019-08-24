import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import InnerTasksList from '../inner-tasks-list';

import './Column.css';

const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

class Column extends Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.column.id}
        index={this.props.index}
      >
        {(provided) => (
          <div
            className="column-container" 
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <h2 {...provided.dragHandleProps}>{this.props.column.title}</h2>
            <Droppable
              droppableId={this.props.column.id}
              isDropDisabled={this.props.isDropDisabled}
              type="task"
            >
              {(provided, snapshot) => (
                <TaskList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                  className="task-list"
                >
                  <InnerTasksList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    )
  }
}

export default Column;
