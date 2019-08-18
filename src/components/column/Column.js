import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../task/';

import './Column.css';

const ColumnContainer = styled.div`
  width: ${props => (props.axis === 'horizontal' ? 'auto' : '220px')}  
`;

const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  display: ${props => (props.axis === 'horizontal' ? 'flex' : 'initial')}  
  min-height: ${props => (props.axis === 'horizontal' ? 'initial' : '25vh')}  
`;

class Column extends Component {
  render() {
    const { axis } = this.props;
    return (
      <ColumnContainer className="column-container" axis={axis}>
        <h2>{this.props.column.title}</h2>
        <Droppable
          droppableId={this.props.column.id}
          isDropDisabled={this.props.isDropDisabled}
          direction={axis === 'horizontal' ? 'horizontal' : 'vertical'}
        >
          {(provided, snapshot) => (
            <TaskList
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              className="task-list"
              axis={axis}
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} axis={axis} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </ColumnContainer>
    )
  }
}

export default Column;
