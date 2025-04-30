import React, { useState } from "react";
import {
  Drawer,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/actions/taskActions";
import { toast } from "react-toastify";

export default function AddDialog() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(addTask(data, token, toast));
    setOpen(false);
  };

  return (
    <div>
      <Button  size="small" onClick={() => setOpen(true)}>
        Add
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div style={{ width: 400, padding: 20 }}>
          <h2>Create New Task</h2>
          <form noValidate autoComplete="off">
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              value={data.title}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              value={data.description}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={data.status}
                onChange={handleChange}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="inprogress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add Task
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
}
