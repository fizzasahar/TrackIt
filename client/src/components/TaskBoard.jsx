// src/pages/TaskBoard.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TaskForm from './TaskForn';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksSuccess, updateTaskStatusSuccess } from '../store/taskSlice';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableItem, SortableOverlay } from '../components/SortableItem';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TaskBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks. Server responded with ' + response.status);
        }

        const data = await response.json();
        const groupedTasks = data.reduce((acc, task) => {
          acc[task.status.toLowerCase().replace(' ', '')].push(task);
          return acc;
        }, { todo: [], inProgress: [], done: [] });

        dispatch(fetchTasksSuccess(groupedTasks));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        toast.error(error.message || 'An error occurred while fetching tasks');
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleDragEnd = async (event) => {
    const { over } = event;
    const { id } = over;

    if (!id) return;

    const activeTask = tasks[activeId.status].find((task) => task._id === activeId.id);
    const newTasks = { ...tasks };

    newTasks[activeId.status] = newTasks[activeId.status].filter((task) => task._id !== activeId.id);
    newTasks[id] = [...newTasks[id], activeTask];

    dispatch(updateTaskStatusSuccess(newTasks));

    try {
      await fetch(`${apiUrl}/api/tasks/${activeId.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          status: id.charAt(0).toUpperCase() + id.slice(1).replace(' ', ' '),
        }),
      });

      toast.success('Task status updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred while updating the task status');
    }
  };

  const handleTaskCreated = (task) => {
    dispatch(addTaskSuccess(task));
  };

  if (loading) {
    return <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <TaskForm onTaskCreated={handleTaskCreated} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex space-x-6 mt-6">
          {Object.keys(tasks).map((status) => (
            <SortableContext key={status} items={tasks[status]} strategy={verticalListSortingStrategy}>
              <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-2xl font-semibold text-black mb-4">
                  {status.charAt(0).toUpperCase() + status.slice(1).replace(' ', ' ')}
                </h3>
                {tasks[status].map((task) => (
                  <SortableItem
                    key={task._id}
                    id={task._id}
                    status={status}
                    task={task}
                    onDragStart={() => setActiveId({ id: task._id, status })}
                  />
                ))}
              </div>
            </SortableContext>
          ))}
        </div>
        {activeId && (
          <SortableOverlay>
            <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-black">
                {tasks[activeId.status].find((task) => task._id === activeId.id).title}
              </h4>
              <p className="text-gray-600">
                Created By: {tasks[activeId.status].find((task) => task._id === activeId.id).createdBy.username}
              </p>
            </div>
          </SortableOverlay>
        )}
      </DndContext>
    </div>
  );
};

export default TaskBoard;
