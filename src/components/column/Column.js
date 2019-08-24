import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import InnerTasksList from '../inner-tasks-list';

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
    console.log('render Column');
    const { axis } = this.props;
    return (
      <Draggable
        draggableId={this.props.column.id}
        index={this.props.index}
      >
        {(provided) => (
          <ColumnContainer
            className="column-container" 
            {...provided.draggableProps}
            ref={provided.innerRef}
            axis={axis}
          >
            <h2 {...provided.dragHandleProps}>{this.props.column.title}</h2>
            <Droppable
              droppableId={this.props.column.id}
              isDropDisabled={this.props.isDropDisabled}
              direction={axis === 'horizontal' ? 'horizontal' : 'vertical'}
              type="task"
            >
              {(provided, snapshot) => (
                <TaskList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                  className="task-list"
                  axis={axis}
                >
                  <InnerTasksList tasks={this.props.tasks} axis={axis} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </ColumnContainer>
        )}
      </Draggable>
    )
  }
}

export default Column;
