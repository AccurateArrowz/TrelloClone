import { useCallback, useEffect, useState } from "react";
import type { GroupType } from "./Group";
import Group from "./Group";
import AddNewGroup from "./AddNewGroup";
import type { UUID, OnAddNewTask } from "./types";
import type { TaskType } from "./Task";
import { sampleData2 } from "./rough_sampleData";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export type HandleTaskDrop = ({
  newGroupId,
  task,
}: {
  newGroupId: UUID;
  task: TaskType;
}) => void;

export type HandleTaskStatusToggle = (task: TaskType) => void;

export default function Board() {
  const [groups, setGroups] = useState(sampleData2);

  // const [groups, setGroups] = useState(sampleData3);
  const [isAddNewGroupInputOpen, setIsAddNewGroupInputOpen] = useState(false);

  const handleAddNewGroup = (group: GroupType) => {
    setGroups([...groups, group]);
    setIsAddNewGroupInputOpen(false);
  };

  const handleAddNewTask: OnAddNewTask = useCallback(({ newTask, groupId }) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? { ...group, tasks: [...group.tasks, newTask] }
          : group,
      ),
    );
  }, []);

  const handleTaskDrop: HandleTaskDrop = useCallback(({ task, newGroupId }) => {
    const currentGroupId = task.groupId;
    if (newGroupId === currentGroupId) return;

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === currentGroupId) {
          return {
            ...group,
            tasks: group.tasks.filter((t) => t.id !== task.id),
          };
        }
        if (group.id === newGroupId) {
          return {
            ...group,
            tasks: [...group.tasks, { ...task, groupId: newGroupId }],
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
          tasks: group.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t,
          ),
        };
      }),
    );
  }, []);

  return (
    <div className="flex gap-4 overflow-x-auto p-4 h-screen">
      {groups.map((group) => (
        <Group
          key={group.id}
          group={group}
          onAddNewTask={handleAddNewTask}
          handleTaskDrop={handleTaskDrop}
          submitTaskStatusToggle={handleTaskStatusToggle}
        ></Group>
      ))}

      <AddNewGroup
        isAddNewGroupInputOpen={isAddNewGroupInputOpen}
        openAddNewGroupInput={() => setIsAddNewGroupInputOpen(true)}
        onCloseNewGroupInput={() => setIsAddNewGroupInputOpen(false)}
        onAddNewGroup={handleAddNewGroup}
      ></AddNewGroup>
    </div>
  );
}
