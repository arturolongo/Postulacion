import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { Column } from './components/Column';
import { AddTaskModal } from './components/AddTaskModal';
import { useStore } from './store/useStore';
import type { TaskStatus } from './types';
import { PlusIcon } from '@heroicons/react/24/outline';

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, moveTask } = useStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(draggableId, destination.droppableId as TaskStatus);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      padding: '2rem' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem' 
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: '0.5rem' 
          }}>
            Tasks
          </h1>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '1.5rem' 
          }}>
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#000',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#000'}
          >
            <PlusIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            Add task
          </button>
        </div>

        {/* Kanban Board - FORZADO HORIZONTAL */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {columns.map((column) => (
              <div 
                key={column.id} 
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                  padding: '1.5rem',
                  width: '320px',
                  minHeight: '500px',
                  flexShrink: 0
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h2 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {column.title}
                  </h2>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px'
                  }}>
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
                <Column
                  column={{
                    ...column,
                    tasks: getTasksByStatus(column.id),
                  }}
                />
              </div>
            ))}
          </div>
        </DragDropContext>

        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
