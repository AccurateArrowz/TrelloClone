import { useCallback, useEffect, useState } from "react";
import Group from "./Group";
import AddNewGroup from "./AddNewGroup";
import type { GroupType } from "./Group";
import type { UUID, HandleAddNewTask, HandleDeleteTask, HandleUpdateTask, HandleTaskDrop, HandleTaskStatusToggle } from "./types";
import type { TaskType } from "./Task";
import { sampleData2 } from "./data/sampleData";

type TaskNewPosition = {
  index: number,
  order: number,
}

export default function Board() {
  const [groups, setGroups] = useState(sampleData2);
  // const [groups, setGroups] = useState(sampleData3);
  const [isAddNewGroupInputOpen, setIsAddNewGroupInputOpen] = useState(false);

  const handleAddNewGroup = (group: GroupType) => {
    setGroups([...groups, group]);
    setIsAddNewGroupInputOpen(false);
  };

  const handleAddNewTask: HandleAddNewTask = useCallback(({ newTask, groupId }) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? { ...group, tasks: [...group.tasks, newTask] }
          : group,
      ),
    );
  }, []);

  const handleTaskDrop: HandleTaskDrop = useCallback(({ task, newGroupId, dropIndicator }) => {
    const currentGroupId = task.groupId;

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        // Case 1: Same group reordering
        if (group.id === currentGroupId && currentGroupId === newGroupId) {
          const tasksWithoutDropped = group.tasks.filter((t: TaskType) => t.id !== task.id);
          let insertIndex = tasksWithoutDropped.length;

          if (dropIndicator && dropIndicator.taskAnchorId) {
            const anchorIndex = tasksWithoutDropped.findIndex(
              (t: TaskType) => t.id === dropIndicator.taskAnchorId
            );
            if (anchorIndex !== -1) {
              insertIndex = dropIndicator.position === "top" ? anchorIndex : anchorIndex + 1;
            }
          }

          const updatedTask = { ...task, groupId: newGroupId };
          const newTasks = [...tasksWithoutDropped];
          newTasks.splice(insertIndex, 0, updatedTask);

          return {
            ...group,
            tasks: newTasks.map((t, idx) => ({ ...t, order: idx })),
          };
        }

        // Case 2: Different group - remove from source group
        if (group.id === currentGroupId) {
          return {
            ...group,
            tasks: group.tasks
              .filter((t: TaskType) => t.id !== task.id)
              .map((t, idx) => ({ ...t, order: idx })),
          };
        }

        // Case 3: Different group - insert into target group
        if (group.id === newGroupId) {
          let insertIndex = group.tasks.length;

          if (dropIndicator && dropIndicator.taskAnchorId) {
            const anchorIndex = group.tasks.findIndex(
              (t: TaskType) => t.id === dropIndicator.taskAnchorId
            );
            if (anchorIndex !== -1) {
              insertIndex = dropIndicator.position === "top" ? anchorIndex : anchorIndex + 1;
            }
          }

          const updatedTask = { ...task, groupId: newGroupId };
          const newTasks = [...group.tasks];
          newTasks.splice(insertIndex, 0, updatedTask);

          return {
            ...group,
            tasks: newTasks.map((t, idx) => ({ ...t, order: idx })),
          };
        }

        return group;
      }),
    );
  }, []);

  const handleTaskStatusToggle: HandleTaskStatusToggle = useCallback((task) => {
    const { id: taskId, groupId } = task;

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          tasks: group.tasks.map((t: TaskType) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t,
          ),
        };
      }),
    );
  }, []);

  const handleDeleteTask: HandleDeleteTask = useCallback(({ task }) => {
    const { id: taskId, groupId } = task;
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          tasks: group.tasks
            .filter((t) => t.id !== taskId)
            .map((t, idx) => ({ ...t, order: idx })),
        };
      }),
    );
  }, []);

  const handleTaskUpdate: HandleUpdateTask = useCallback(({taskId, groupId,  newValue})=> {
      setGroups (prevGroups=> prevGroups.map(group=> {
       if (group.id === groupId ){ 
        return {...group, tasks: group.tasks.map(t=>t.id === taskId? {...t , description: newValue} : t )}}
       return group
      }))
  }, [])

  return (
    <div className="flex flex-col w-full h-screen p-6 bg-gray-50/50 dark:bg-zinc-950">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 text-left border-b border-gray-200 dark:border-zinc-800 pb-3">
        Sprint Board
      </h1>
      <div className="flex gap-4 overflow-x-auto flex-1 pb-4">
        {groups && groups.map((group) => (
          <Group
            key={group.id}
            group={group}
            HandleAddNewTask={handleAddNewTask}
            handleTaskDrop={handleTaskDrop}
            submitTaskStatusToggle={handleTaskStatusToggle}
            onUpdateTask={handleTaskUpdate}
            onDeleteTask={handleDeleteTask}
          ></Group>
        ))}

        <AddNewGroup
          isAddNewGroupInputOpen={isAddNewGroupInputOpen}
          openAddNewGroupInput={() => setIsAddNewGroupInputOpen(true)}
          onCloseNewGroupInput={() => setIsAddNewGroupInputOpen(false)}
          HandleAddNewGroup={handleAddNewGroup}
        ></AddNewGroup>
      </div>
    </div>
  );
}
