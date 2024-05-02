import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type Task = {
  id: string;
  content: string;
  columnId: string;
};

type Column = {
  id: string;
  title: string;
  projectId: string;
};

type BoardState = {
  activeTask: Task | null;
  activeColumn: Column | null;
  updateActiveTask: (task: Task | null) => void;
  updateActiveColumn: (column: Column | null) => void;

  tasks: Task[];
  sortTasks: (tasks: Task[]) => void;
  deleteTask: (taskId: string) => void;
  createTask: (columnId: string) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;

  columns: Column[];
  sortColumns: (columns: Column[]) => void;
  deleteColumn: (columnId: string) => void;
  createColumn: (projectId: string) => void;
  updateColumn: (columnId: string, updatedColumn: Partial<Column>) => void;
};

const useBoardStore = create<BoardState>()((set) => ({
  // ACTIVE STATES
  activeTask: null,
  activeColumn: null,
  updateActiveTask: (task) => set((state) => ({ ...state, activeTask: task })),
  updateActiveColumn: (column) =>
    set((state) => ({ ...state, activeColumn: column })),

  // TASKS STATES
  tasks: [],
  sortTasks: (tasks) => set((state) => ({ ...state, tasks })),
  deleteTask: (taskId) =>
    set((state) => {
      const tasks = state.tasks;
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      return { ...state, tasks: filteredTasks };
    }),
  createTask: (columnId) =>
    set((state) => {
      const newTask = { id: uuidv4(), columnId, content: "New Task" };
      return { ...state, tasks: [...state.tasks, newTask] };
    }),
  updateTask: (taskId, updatedTask) =>
    set((state) => {
      const tasks = state.tasks;
      const editedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );
      return { ...state, tasks: editedTasks };
    }),

  // COLUMNS STATES
  columns: [],
  sortColumns: (columns) => set((state) => ({ ...state, columns })),
  deleteColumn: (columnId) =>
    set((state) => {
      const tasks = state.tasks;
      const columns = state.columns;

      const filteredTasks = tasks.filter((task) => task.columnId !== columnId);
      const filteredColumns = columns.filter(
        (column) => column.id !== columnId
      );

      return { ...state, tasks: filteredTasks, columns: filteredColumns };
    }),
  createColumn: (projectId) =>
    set((state) => {
      const newColumn = { id: uuidv4(), projectId, title: "New Column" };
      return { ...state, columns: [...state.columns, newColumn] };
    }),
  updateColumn: (columnId, updatedColumn) =>
    set((state) => {
      const columns = state.columns;
      const editedColumns = columns.map((column) =>
        column.id === columnId ? { ...column, ...updatedColumn } : column
      );
      return { ...state, columns: editedColumns };
    }),
}));

export default useBoardStore;
