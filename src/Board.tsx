import { useEffect, useState } from "react";
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

 const handleTaskStatusToggle: HandleTaskStatusToggle = (task) => {
    const {id: taskId, groupId} = task; //the task item contains both the id and the group  it is in
    const updatedGroups  = [...groups];
   const group  = updatedGroups.find(group => group.id === groupId);
   if(group){
     group.tasks = group.tasks.map(t => t.id === taskId? 
                    ({...t, 
                    completed: !t.completed
                     }
                  )
                  : t);
  }
  console.log('groups after toggling the task');
  console.log(updatedGroups)
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
