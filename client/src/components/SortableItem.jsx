// src/components/SortableItem.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id, status, task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md cursor-grab"
    >
      <h4 className="text-xl font-semibold text-black">{task.title}</h4>
      <p className="text-gray-600">Assigned: {task.assignedTo.username}</p>
    </div>
  );
}

export function SortableOverlay({ children }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
      {children}
    </div>
  );
}
