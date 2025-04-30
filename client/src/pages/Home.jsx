import React, { useEffect } from "react";
import TaskBoard from "../components/TaskBoard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/actions/taskActions";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Home = () => {
	const dispatch = useDispatch();
	const { tasks } = useSelector((state) => state.tasks);
	const { token } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(fetchTasks(token));
	}, [dispatch, token]);

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100">
			{/* Navbar */}
			<Navbar />

			{/* Heading Section */}
			<motion.div
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="text-center py-10"
			>
				<Typography
					variant="h2"
					component="h1"
					className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-orange-400 to-purple-600 font-bold"
				>
					Manage Your Tasks Like a Pro ✨
				</Typography>
				<p className="text-gray-600 mt-2 text-md">
					Stay organized, productive, and on top of your goals.
				</p>
			</motion.div>

			{/* Task Board or Loader */}
			<div className="flex justify-center px-4">
				{tasks.length > 0 ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="w-full max-w-7xl"
					>
						<TaskBoard tasks={tasks} />
					</motion.div>
				) : (
					<div className="mt-20">
						<CircularProgress
							thickness={4}
							size={60}
							sx={{ color: "#9b5de5" }} // Close to purple.500
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
