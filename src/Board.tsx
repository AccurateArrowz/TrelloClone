import { useState } from "react";
import type { GroupType } from "./Group";
import Group from "./Group";
import AddNewGroup from "./AddNewGroup";
import type { UUID, OnAddNewTask } from "./types";
import type { TaskType } from "./Task";

//sample data for userId A and boardId x
const sampleData: GroupType[] = [
  {
    id: "group-a" as UUID,
    title: "Group First",
    tasks: [
      {
        id: "task-1" as UUID,
        groupId: "group-a" as UUID,
        description: "this is the task 1 ",
        completed: false,
      },
      {
        id: "task-2" as UUID,
        groupId: "group-a" as UUID,

        description: "this is the task 2 ",
        completed: false,
      },
    ],
  },
  {
    id: "group-b" as UUID,
    title: "Group Second",
    tasks: [
      {
        id: "task-3" as UUID,
        groupId: "group-a" as UUID,

        description: "this is the task 3 ",
        completed: false,
      },
      {
        id: "task-4" as UUID,
        groupId: "group-a" as UUID,
        description: "this is the task 4 ",
        completed: false,
      },
    ],
  },
];

export type HandleTaskDrop = ({
  newGroupId,
  task,
}: {
  newGroupId: UUID;
  task: TaskType;
}) => void;

export type HandleTaskStatusToggle = ({task}: {task:TaskType}) => void;

export default function Board() {
  const [groups, setGroups] = useState<GroupType[]>(sampleData);
  const [isAddNewGroupInputOpen, setIsAddNewGroupInputOpen] = useState(false);

  const handleAddNewGroup = (group: GroupType) => {
    setGroups([...groups, group]);
    setIsAddNewGroupInputOpen(false);
  };

  const handleAddNewTask: OnAddNewTask = ({ newTask, groupId }) => {
    const updateGroups = groups.map((group) =>
      group.id === groupId
        ? { ...group, tasks: [...group.tasks, newTask] }
        : group,
    );
    console.log("updateGroups: ", updateGroups);
    setGroups(updateGroups);
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

  const handleTaskStatusToggle: HandleTaskStatusToggle = ({task})=> {
     const updatedGroups= [...groups];
     const currentGroup = updatedGroups.find(group => group.id === task.groupId);
     if(currentGroup){
      currentGroup.tasks = currentGroup.tasks.filter(t => t.id === task.id? 
                                        {...t, completed: !t.completed}:
                                      t)
     }
     setGroups(updatedGroups);
  }

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
