import type { GroupType } from './Group';
import type { TaskType } from './Task';

export type UUID = string & { readonly __brand: 'UUID' };

// Callback types for passing through component hierarchy
export type OnAddNewTask = (payload: { newTask: TaskType; groupId: UUID }) => void;

export type OnTaskDrop = (payload: { groupId: UUID; taskId: UUID }) => void;

export type OnAddNewGroup = (group: GroupType) => void; 
