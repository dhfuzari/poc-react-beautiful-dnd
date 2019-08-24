import React, { PureComponent } from 'react';
import Column from '../column';

class InnerColumnsList extends PureComponent {
    render() {
        const { column, tasksMap, index, isDropDisabled } = this.props;
        const tasks = column.tasksIds.map(taskId => tasksMap[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} index={index}/>
    }
}

export default InnerColumnsList;