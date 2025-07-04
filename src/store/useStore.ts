import { create } from 'zustand';
import type { Task, TaskStatus } from '../types';

interface KanbanStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
}

export const useStore = create<KanbanStore>((set) => ({
  tasks: [],
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }],
  })),
  
  updateTask: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    ),
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  
  moveTask: (taskId, newStatus) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ),
  })),
})); 