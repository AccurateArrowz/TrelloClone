import type { GroupType  } from "../Group";
import type { UUID } from "../types";

export const sampleData2: GroupType[] = [
  {
    id: "backlog" as UUID,
    title: "Backlog",
    tasks: [
      {
        id: "task-1" as UUID,
        groupId: "backlog" as UUID,
        description: "Add $jsonSchema validation for group chat messages",
        completed: false,
        order: 1000,
      },
      {
        id: "task-2" as UUID,
        groupId: "backlog" as UUID,
        description: "Design typing indicator via socket events",
        completed: false,
        order: 2000,
      },
    ],
  },
  {
    id: "in-progress" as UUID,
    title: "In Progress",
    tasks: [
      {
        id: "task-3" as UUID,
        groupId: "in-progress" as UUID,
        description: "Write use case tests for SendMessage (Flutter)",
        completed: false,
        order: 1000,
      },
      {
        id: "task-4" as UUID,
        groupId: "in-progress" as UUID,
        description: "Handle socket reconnect on network drop",
        completed: false,
        order: 2000,
      },
    ],
  },
  {
    id: "done" as UUID,
    title: "Done",
    tasks: [
      {
        id: "task-5" as UUID,
        groupId: "done" as UUID,
        description: "Set up MongoDB schema for group chat rooms",
        completed: true,
        order: 1000,
      },
    ],
  },
];