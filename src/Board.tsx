import { useEffect, useState } from "react";
import type { RawGroupType  } from "./Group";
import Group from "./Group";
import AddNewGroup from "./AddNewGroup";
import type { UUID, OnAddNewTask, DeleteTask, UpdateTask } from "./types";
import type { RawTaskType, TaskType } from "./Task";
import type { NormalizedGroup } from "./Group";


export type HandleTaskDrop = ({
  newGroupId,
  task,
}: {
  newGroupId: UUID;
  task: RawTaskType;
}) => void;

export type HandleTaskStatusToggle = (task: RawTaskType) => void;

export default function Board() {
  const [groups, setGroups] = useState<RawGroupType [] | undefined>();
  const [tasksMap, setTasksMap] = useState<Map<UUID, TaskType>>();

  // const [groups, setGroups] = useState(sampleData3);
  const [isAddNewGroupInputOpen, setIsAddNewGroupInputOpen] = useState(false);

  const handleAddNewGroup = (group: NormalizedGroup) => {
    setGroups([...groups, group]);
    setIsAddNewGroupInputOpen(false);
  };

  const handleAddNewTask: OnAddNewTask = ({ newTask, groupId }) => {
    const updatedGroups = groups.map((group) =>
      group.id === groupId
        ? { ...group, tasks: [...group.tasks, newTask] }
        : group,
    );
    console.log("updatedGroups: ", updatedGroups);
    setGroups(updatedGroups);
  };

  const handleTaskDrop: HandleTaskDrop = ({ task, newGroupId }) => {
    const currentGroupId = task.groupId; //group in which the task is currently in
    const updatedGroups = [...groups];
    if (newGroupId === currentGroupId) return; //no need to update the state

    for (const group of updatedGroups) {
      if (group.id === currentGroupId)
        group.tasks = group.tasks.filter((t) => t.id !== task.id); //remove the task from where it currently at
      if (group.id === newGroupId) {
        //add the task to new group id
        console.log("the group matches wth new group id");
        task = { ...task, groupId: newGroupId };
        group.tasks.push(task);
      }
    }
    console.log("updatedGroups: ", updatedGroups);
    setGroups(updatedGroups);
  };

  const handleTaskStatusToggle: HandleTaskStatusToggle = (task) => {
    const { id: taskId, groupId } = task; //the task item contains both the id and the group  it is in
    const updatedGroups = [...groups];
    const group = updatedGroups.find((group) => group.id === groupId);
    if (group) {
      group.tasks = group.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t,
      );
    }
    console.log("groups after toggling the task");
    console.log(updatedGroups);
    setGroups(updatedGroups);
  };

  const handleDeleteTask: DeleteTask = ({ task }) => {
  const { taskId, groupId } = task;

  setGroups(
    groups.map(group =>
      group.id === groupId
        ? { ...group, tasks: group.tasks.filter(t => t.id !== taskId) }
        : group
    )
  );
};
  useEffect(()=> {
    fetch('/data/sampleData.json')
      .then(res => res.json())
      .then(data => {
      const groups: RawGroupType [] = data;
      const normalizedGroups: NormalizedGroup[] = [];
      const tempTaskMap = new Map<UUID, TaskType>();

      for (const group of groups) {
        // Extract tasks and build a normalized group with empty taskIds
        const { tasks, ...rest } = group;
        const normalizedGroup: NormalizedGroup = { ...rest, taskIds: [] };
        normalizedGroups.push(normalizedGroup);

        // Extract each task's ID and store the remaining properties in tempTaskMap
        for (const task of tasks) {
          const { id, ...rest } = task;
          tempTaskMap.set(id, rest);
        }
      }
      setTasksMap(tempTaskMap);
      }
      )
  }, [])

  return (
    <div className="flex gap-4 overflow-x-auto p-4 h-screen">
      {groups && groups.map((group) => {
        const tasks: TaskType[] = [];
        for(const taskId  of group.taskIds){
          const task = tasksMap?.get(taskId);
          if(task)
          tasks.push(task)
        }
        return <Group
        key={group.id}
        group={group}
        tasks={tasks}
        onAddNewTask={handleAddNewTask}
        handleTaskDrop={handleTaskDrop}
        submitTaskStatusToggle={handleTaskStatusToggle}
        ></Group>
      }
      )}

      <AddNewGroup
        isAddNewGroupInputOpen={isAddNewGroupInputOpen}
        openAddNewGroupInput={() => setIsAddNewGroupInputOpen(true)}
        onCloseNewGroupInput={() => setIsAddNewGroupInputOpen(false)}
        onAddNewGroup={handleAddNewGroup}
      ></AddNewGroup>
    </div>
  );
}
