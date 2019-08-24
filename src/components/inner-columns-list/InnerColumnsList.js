import React, { Component } from 'react';
import Column from '../column';

class InnerColumnsList extends Component {
    shouldComponentUpdate(nextProps) {
        if(nextProps.column === this.props.column &&
           nextProps.tasksMap === this.props.tasksMap &&
           nextProps.index === this.props.index) return false;
        return true;
    }
    render() {
        const { column, tasksMap, axis, index, isDropDisabled } = this.props;
        const tasks = column.tasksIds.map(taskId => tasksMap[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} axis={axis} index={index}/>
    }
}

export default InnerColumnsList;