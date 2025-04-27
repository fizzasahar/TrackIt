import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [taskByDate, setTaskByDate] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.log("No user is logged in.");
      return;
    }

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid)); // Filter user-specific tasks
    const querySnapshot = await getDocs(q);
    const allTasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(allTasks);

    const completed = allTasks.filter((task) => task.status === "completed").length;
    const pending = allTasks.length - completed;
    setCompletedCount(completed);
    setPendingCount(pending);

    // Grouping tasks by date
    const groupedByDate = allTasks.reduce((acc, task) => {
      acc[task.date] = (acc[task.date] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.keys(groupedByDate).map((date) => ({
      date,
      tasks: groupedByDate[date],
    }));
    setTaskByDate(formattedData);
  };

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-semibold text-black mb-6">📊 Task Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Task Summary */}
        <div className="bg-white p-6 rounded-lg text-center w-full max-w-sm flex flex-col justify-center items-center border border-gray-200 shadow-lg hover:shadow-2xl transition rounded-lg">
          <h3 className="text-xl font-bold text-gray-700">Total Tasks</h3>
          <p className="text-6xl font-bold text-orange-500 py-20 cursor-pointer shadow-orange-600/50 hover:text-orange-600 rounded-lg transition duration-100">
            {tasks.length}
          </p>
        </div>

        {/* Completed vs Pending Tasks */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center w-full max-w-sm flex flex-col justify-center items-center border border-gray-200 shadow-lg hover:shadow-2xl transition rounded-lg">
          <h3 className="text-xl font-bold text-gray-700">Task Completion</h3>
          <PieChart width={200} height={200}>
            <Pie
              data={[{ name: "Completed", value: completedCount }, { name: "Pending", value: pendingCount }]}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              dataKey="value"
            >
              <Cell key="completed" fill="#4CAF50" />
              <Cell key="pending" fill="#FF5733" />
            </Pie>
            <Tooltip />
          </PieChart>
          <p className="text-green-500">✔ {completedCount} Completed</p>
          <p className="text-red-500">✖ {pendingCount} Pending</p>
        </div>
      </div>

      {/* Tasks by Date Chart */}
      <div className="w-full max-w-4xl mt-8 bg-white p-6 shadow-lg rounded-lg border border-gray-200 shadow-lg hover:shadow-2xl transition rounded-lg">
        <h3 className="text-xl font-bold text-gray-700 text-center mb-4">📅 Tasks by Date</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={taskByDate}>
            <XAxis dataKey="date" tick={{ fill: "#555" }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#ff9800" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
