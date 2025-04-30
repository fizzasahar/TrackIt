import React from "react";
import AddDialog from "./AddDialog";
import { useSelector } from 'react-redux';
import Profile from "./Profile";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {  FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
	const { user } = useSelector((store) => store.auth);

	return (
		<motion.div
			initial={{ y: -40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="sticky top-0 z-50 bg-opacity-90 backdrop-blur-sm shadow-md"
		>
			<div className="max-w-8xl  px-6 py-4 md:py-5 flex justify-between items-center bg-gradient-to-r from-pink-600 via-orange-400 to-purple-600 rounded-b-xl">
				<h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide">
					Trackit<span className="text-xl">🚀</span>
				</h1>

				<div className="flex items-center gap-4">
					<div className="px-5 py-2 rounded-xl font-semibold bg-white text-pink-600 shadow hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white transition duration-300 cursor-pointer">
						<AddDialog />
					</div>
					<div className="px-5 py-2 rounded-xl font-semibold bg-white text-pink-600 shadow hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white transition duration-300 cursor-pointer">
						<Profile data={user} />
					</div>
					<Link to="/logout" className="flex items-center gap-3 text-red-400 hover:text-red-600"> <FaSignOutAlt /> Logout </Link>
				</div>
			</div>
		</motion.div>
	);
};

export default Navbar;
