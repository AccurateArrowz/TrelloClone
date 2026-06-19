import React from 'react'
import type { UUID } from './types';
import type { HandleTaskStatusToggle } from "./Board";


export type TaskType = {
  id: UUID;
  groupId: UUID
  description: string;
  completed: boolean;
};

export type TaskProp = {
  task: TaskType;
  onTaskStatusToggle: HandleTaskStatusToggle;
};

export default function Task({ task, onTaskStatusToggle }: TaskProp) {
    const { description, completed } = task;

    // function checkValidDataAttachment<T> = (data:T )

  const onDragStart:  React.DragEventHandler<HTMLLIElement> = (e)=> {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  }

  return (
    <li className='flex gap-1'
    draggable
    onDragStart={onDragStart}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onTaskStatusToggle(task)}
      />
      <span>{description}</span>
    </li>
  );
}