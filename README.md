# Kanban board

A Kanban-style task board built with React, TypeScript, and Tailwind CSS v4. Inspired by Trello, focused on sprint workflow.

## Features

- **Drag & drop tasks** across columns with precise drop-indicator positioning (top/bottom of target)
- **Group (columng) management** — add new groups on the fly
- **Task CRUD** — create, inline-edit, and delete tasks
- **Task completion toggle** — mark tasks as done with a single click

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Icons | `lucide-react` |
| Build | Vite 8 |
| Linting | ESLint + `typescript-eslint` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── Board.tsx        # Root board — owns all state, wires handlers down
├── Group.tsx        # Column component — handles drop zone logic
├── Task.tsx         # Individual task card with drag source
├── AddNewGroup.tsx  # Inline input to create a new column
├── AddNewTask.tsx   # Inline input to create a new task
├── UpdateTask.tsx   # Inline edit for task description
├── types.ts         # Shared callback & branded UUID types
└── data/            # Sample seed data
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |
