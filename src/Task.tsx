import React from 'react'
import type { UUID } from './types';


export type TaskType = {
  id: UUID;
  description: string;
  completed: boolean;
};

export type TaskProp = TaskType & {
  toggleTaskStatus: (id: UUID) => void;
};

export default function Task({ id, description, completed, toggleTaskStatus }: TaskProp) {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTaskStatus(id)}
      />
      <span>{description}</span>
    </li>
  );
}