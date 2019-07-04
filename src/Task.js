import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

//TODO: Replace px units by rem unit
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

class Column extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {provided => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}

          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    )
  }
}

export default Column;
