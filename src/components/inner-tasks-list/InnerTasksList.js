import React, { PureComponent } from 'react';
import Task from '../task/';

class InnerTasksList extends PureComponent {
    render() {
      return this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)
    }
}

export default InnerTasksList;