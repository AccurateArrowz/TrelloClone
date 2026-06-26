import type { RawGroupType  } from "./Group";
import type { UUID } from "./types";

//sample data for userId A and boardId x
export const sampleData: RawGroupType [] = 
[
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
        groupId: "group-b" as UUID,

        description: "this is the task 3 ",
        completed: false,
      },
      {
        id: "task-4" as UUID,
        groupId: "group-b" as UUID,
        description: "this is the task 4 ",
        completed: false,
      },
    ],
  },
];

// larger sample data (4 groups * 5 tasks)
export const sampleData2: RawGroupType [] = [
  {
    id: "group-1" as UUID,
    title: "Backlog",
    tasks: [
      { id: "task-101" as UUID, groupId: "group-1" as UUID, description: "Research competitor pricing", completed: false },
      { id: "task-102" as UUID, groupId: "group-1" as UUID, description: "Write project proposal draft", completed: false },
      { id: "task-103" as UUID, groupId: "group-1" as UUID, description: "Set up ESLint and Prettier config", completed: true },
      { id: "task-104" as UUID, groupId: "group-1" as UUID, description: "Gather UI design references", completed: false },
      { id: "task-105" as UUID, groupId: "group-1" as UUID, description: "Define API contract with backend team", completed: false },
    ],
  },
  {
    id: "group-2" as UUID,
    title: "In Progress",
    tasks: [
      { id: "task-201" as UUID, groupId: "group-2" as UUID, description: "Build authentication flow", completed: false },
      { id: "task-202" as UUID, groupId: "group-2" as UUID, description: "Integrate RTK Query for hotel listings", completed: false },
      { id: "task-203" as UUID, groupId: "group-2" as UUID, description: "Design booking confirmation page", completed: false },
      { id: "task-204" as UUID, groupId: "group-2" as UUID, description: "Write Zod schemas for booking form", completed: true },
      { id: "task-205" as UUID, groupId: "group-2" as UUID, description: "Set up drag-and-drop between groups", completed: false },
    ],
  },
  {
    id: "group-3" as UUID,
    title: "In Review",
    tasks: [
      { id: "task-301" as UUID, groupId: "group-3" as UUID, description: "Code review: room availability logic", completed: false },
      { id: "task-302" as UUID, groupId: "group-3" as UUID, description: "QA: mobile responsiveness on booking page", completed: false },
      { id: "task-303" as UUID, groupId: "group-3" as UUID, description: "Peer review: RBAC middleware", completed: true },
      { id: "task-304" as UUID, groupId: "group-3" as UUID, description: "Validate error boundary behavior", completed: false },
      { id: "task-305" as UUID, groupId: "group-3" as UUID, description: "Check ImageKit LQIP placeholder rendering", completed: false },
    ],
  },
  {
    id: "group-4" as UUID,
    title: "Done",
    tasks: [
      { id: "task-401" as UUID, groupId: "group-4" as UUID, description: "Initialize monorepo structure", completed: true },
      { id: "task-402" as UUID, groupId: "group-4" as UUID, description: "Configure tsup for shared package", completed: true },
      { id: "task-403" as UUID, groupId: "group-4" as UUID, description: "Set up Neon PostgreSQL and run migrations", completed: true },
      { id: "task-404" as UUID, groupId: "group-4" as UUID, description: "Deploy frontend to Vercel", completed: true },
      { id: "task-405" as UUID, groupId: "group-4" as UUID, description: "Add vercel.json SPA rewrite rule", completed: true },
    ],
  },
];