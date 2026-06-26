import type { NormalizedGroup } from './Group';
import type { RawTaskType } from './Task';

export type UUID = string & { readonly __brand: 'UUID' };

// Callback types for passing through component hierarchy
export type OnAddNewTask = (payload: { newTask: RawTaskType; groupId: UUID }) => void;

export type OnTaskDrop = (payload: { groupId: UUID; taskId: UUID }) => void;

export type OnAddNewGroup = (group: NormalizedGroup) => void; 

export type DeleteTask = ({task}: {task: RawTaskType})=> void;

export type UpdateTask = ({taskId , groupId, newValue}: {taskId: UUID , groupId: UUID, newValue: string})=> void