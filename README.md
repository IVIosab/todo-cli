# [todo-cli](https://github.com/IVIosab/todo-cli/tree/main)

A simple, interactive command-line todo manager built with Node.js. This tool helps you create, update, list, and remove tasks right from your terminal, complete with inline editing and validation.

## Features

- Add new tasks with title, description, due date, priority, and completion status.
- List tasks in a table format with optional inline editing or removal toggles.
- Update task fields interactively with validation (e.g. valid priority and due date).
- Remove multiple tasks via table-based toggles.
- Persistent storage using a local JSON database.
- Interactive CLI powered by `inquirer` and `inquirer-table-input`.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/IVIosab/todo-cli.git
cd todo-cli
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the CLI

```bash
npm start
```

## Usage

You'll be presented with an interactive menu that allows you to:

- Add a task
- View task list
- Update tasks
- Remove tasks
- Exit the application

### Example Task

```json
{
  "id": "abc123",
  "title": "Finish project",
  "description": "Complete all pending tasks",
  "dueDate": "2025-06-01",
  "createdAt": "2025-05-31",
  "priority": 1,
  "completed": false
}
```

## Shortcomings

### Real-time update validation
`inquirer-table-input` did not offer a way to validate cells in real-time. However, this is an easy fix if time was not a factor, the package code is rather simple and extendable.
(Edit) I've added boolean and choice types, validation and column info messages in the module which can be seen in the node_modules dir

### Zod and Dayjs usage in validation
due to lack of time and me procrastinating I am writing this either 2 hours before the deadline or 22 hours after the deadline. So, while creating the validation for update and remove I just could not afford to spend time trying to utilize zod and dayjs to its full potentional. 

### Specific times in dates
I worked with datetime in various projects before so I just decided to focus more on new stuff to learn and decided to play more with cli-ui stuff and trying to keep the code as modular as possible. 

## Code
Project Link: [https://github.com/IVIosab/todo-cli](https://github.com/IVIosab/todo-cli/tree/main)