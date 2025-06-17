import type { Column as ColumnType } from '../types';
import { Task as TaskComponent } from './Task';
import { Droppable } from '@hello-pangea/dnd';

interface ColumnProps {
  column: ColumnType;
}

export const Column = ({ column }: ColumnProps) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`space-y-3 min-h-[400px] rounded-lg p-2 transition-colors duration-200 ${
            snapshot.isDraggingOver ? 'bg-gray-50' : ''
          }`}
        >
          {column.tasks.map((task, index) => (
            <TaskComponent key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
          {column.tasks.length === 0 && (
            <div className="text-center text-gray-400 py-16">
              <div className="text-3xl mb-3">📋</div>
              <p className="text-gray-500">No tasks yet</p>
              <p className="text-sm text-gray-400 mt-1">Drag a task here or create a new one</p>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
}; 