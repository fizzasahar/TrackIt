// src/components/TaskForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addTaskSuccess } from '../store/taskSlice';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Task creation failed. Server responded with ' + response.status);
      }

      const data = await response.json();
      setLoading(false);
      dispatch(addTaskSuccess(data));
      onTaskCreated(data);
      setFormData({ title: '', description: '' });
      toast.success('Task created successfully');
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred while creating the task');
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-semibold text-black mb-6">Create a New Task</h2>
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            onChange={handleChange}
            name="title"
            type="text"
            className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            placeholder="Task Title"
            value={formData.title}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            onChange={handleChange}
            name="description"
            className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            placeholder="Task Description"
            value={formData.description}
            required
          />
        </div>
        <button
          className="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
