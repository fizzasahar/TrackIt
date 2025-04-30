import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../store/actions/taskActions";
import { toast } from "react-toastify";

export default function EditDialog({ task }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: task.title,
    description: task.description,
  });

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateTask(task._id, data, token, toast));
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Edit
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Task Details</DialogTitle>

        <DialogContent dividers>
          <TextField
            fullWidth
            margin="normal"
            name="title"
            label="Title"
            value={data.title || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="description"
            label="Description"
            value={data.description || ""}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
          <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
