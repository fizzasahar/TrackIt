// import express from 'express';
// import User from '../models/userModel.mjs';


// const router = express.Router();

// router.get('/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const user = await User.findById(userId).select('-password');
//     const lastAttendance = await Attendance.findOne({ userId }).sort({ checkIn: -1 });
//     const leaves = await Leave.find({ userId }).sort({ date: -1 }).limit(5);
//     const salary = await Salary.findOne({ userId });

//     res.json({
//       user,
//       lastAttendance,
//       recentLeaves: leaves,
//       salary
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching dashboard data' });
//   }
// });

// export default router;
