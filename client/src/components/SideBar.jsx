import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaCalendar, FaTasks, FaChartBar, FaCog } from "react-icons/fa";
const Sidebar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) return null; // agar login nahi, to sidebar mat dikhao

  return (
    <div className="fixed md:static top-0 left-0 h-152 w-64 bg-black text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-orange-500">Employee Panel</h2>
      <nav className="space-y-4">
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-orange-400"><FaHome /> Dashboard</Link>
        <Link to="/calendar" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaCalendar /> Calendar</Link>
        <Link to="/tasks" className="flex items-center gap-3 text-gray-300 focus:text-orange-500 hover:text-white"><FaTasks /> Tasks</Link>
        <Link to="/analytics" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaChartBar /> Analytics</Link>
        <Link to="/settings" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaCog /> Settings</Link>
        <Link to="/profile" className="flex items-center gap-3 hover:text-orange-400"><FaUser /> Profile</Link>
        <Link to="/logout" className="flex items-center gap-3 text-red-400 hover:text-red-600"> <FaSignOutAlt /> Logout </Link>

      </nav>
    </div>
  );
};

export default Sidebar;
