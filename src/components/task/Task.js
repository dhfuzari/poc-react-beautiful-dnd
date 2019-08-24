import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import './Task.css';

//TODO: Replace px units by rem unit
const TaskContainer = styled.div`
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
        ? 'lightgreen'
        : 'white'
  }; 
  margin: ${props => props.axis === 'horizontal' ? '0 .5rem' : '.5rem 0'} 
`;

class Task extends Component {
  render() {
    const { axis } = this.props;
    const isDragDisabled = this.props.task.id === 'task-1'
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <TaskContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
            axis={axis}
            className="task-container"
          >
            <div className="handle-task" {...provided.dragHandleProps} />
            {this.props.task.content}
          </TaskContainer>
        )}
      </Draggable>
    )
  }
}

export default Task;
