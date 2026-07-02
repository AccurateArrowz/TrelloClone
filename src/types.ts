import type { DropIndicator, GroupType } from './Group';
import type { TaskType } from './Task';

export type UUID = string & { readonly __brand: 'UUID' };

// Callback types for passing through component hierarchy
export type HandleAddNewGroup = (group: GroupType) => void; 
export type HandleAddNewTask = (payload: { newTask: TaskType; groupId: UUID }) => void;

export type HandleTaskDrop = ({
  newGroupId,
  task,
  dropIndicator
}: {
  newGroupId: UUID;
  task: TaskType;
  dropIndicator: DropIndicator
}) => void;

export type HandleTaskStatusToggle = (task: TaskType) => void;

export type HandleDeleteTask = ({task}: {task: TaskType})=> void;

export type HandleUpdateTask = ({taskId , groupId, newValue}: {taskId: UUID , groupId: UUID, newValue: string})=> void