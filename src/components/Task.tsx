import { useState } from 'react';
import type { Task as TaskType } from '../types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';
import { Draggable } from '@hello-pangea/dnd';

interface TaskProps {
  task: TaskType;
  index: number;
}

const StatusChangeModal = ({ 
  isOpen, 
  onClose, 
  task, 
  onStatusChange 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  task: TaskType; 
  onStatusChange: (newStatus: string) => void;
}) => {
  if (!isOpen) return null;

  const statusOptions = [
    { value: 'todo', label: 'To Do', color: '#6b7280' },
    { value: 'in-progress', label: 'In Progress', color: '#3b82f6' },
    { value: 'done', label: 'Done', color: '#10b981' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '24rem'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '1rem'
        }}>
          Change Task Status
        </h3>
        
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          marginBottom: '1.5rem'
        }}>
          "{task.title}"
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onStatusChange(option.value);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                border: task.status === option.value ? '2px solid #000' : '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                backgroundColor: task.status === option.value ? '#f9fafb' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (task.status !== option.value) {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseOut={(e) => {
                if (task.status !== option.value) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
            >
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                {option.label}
              </span>
              <div style={{
                width: '0.75rem',
                height: '0.75rem',
                borderRadius: '50%',
                backgroundColor: option.color
              }} />
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export const Task = ({ task, index }: TaskProps) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const { updateTask } = useStore();

  const handleStatusChange = (newStatus: string) => {
    updateTask(task.id, { status: newStatus as any });
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: '#fff',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              padding: '1rem',
              marginBottom: '0.75rem',
              cursor: 'grab',
              transition: 'all 0.2s',
              ...(snapshot.isDragging && {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(1deg)'
              }),
              ...provided.draggableProps.style
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: '0.25rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {task.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {task.description}
                </p>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsStatusModalOpen(true);
                }}
                style={{
                  marginLeft: '0.5rem',
                  padding: '0.375rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title="Change status"
              >
                <ChevronRightIcon style={{ width: '1rem', height: '1rem', color: '#6b7280' }} />
              </button>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid #f3f4f6'
            }}>
              <span style={{
                fontSize: '0.75rem',
                color: '#9ca3af'
              }}>
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontWeight: '500',
                ...(task.status === 'todo' && {
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280'
                }),
                ...(task.status === 'in-progress' && {
                  backgroundColor: '#dbeafe',
                  color: '#3b82f6'
                }),
                ...(task.status === 'done' && {
                  backgroundColor: '#d1fae5',
                  color: '#10b981'
                })
              }}>
                {task.status === 'todo' ? 'Todo' :
                 task.status === 'in-progress' ? 'In Progress' :
                 'Done'}
              </span>
            </div>
          </div>
        )}
      </Draggable>

      <StatusChangeModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        task={task}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}; 