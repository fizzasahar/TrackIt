import React from "react";
import EditDialog from "./UpdateTaskForm";
import DeleteAlertDialog from "./DeleteDialog";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../store/actions/taskActions";
import { toast } from "react-toastify";

import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const statusColumns = ["To Do", "In Progress", "Done"];

const DraggableTask = ({ task, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
    data: { task },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

const DroppableColumn = ({ status, children }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 bg-white rounded-2xl shadow-lg border p-5 border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-4 border-b-2 pb-2 border-gradient-to-r from-pink-500 via-orange-400 to-purple-600">
        {status}
      </h2>
      {children}
    </div>
  );
};

const TaskBoard = ({ tasks }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const getTasksByStatus = (status) =>
    tasks.filter(
      (task) =>
        task.status?.toLowerCase().replace(" ", "") ===
        status.toLowerCase().replace(" ", "")
    );

  const handleMove = (task, newStatus) => {
    if (task.status === newStatus) {
      toast.info(`Task is already in '${newStatus}'`);
      return;
    }

    dispatch(
      updateTask(
        task._id,
        { ...task, status: newStatus },
        token,
        () => toast.success(`Moved to '${newStatus}' successfully`)
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const task = active.data.current.task;
    const destinationStatus = over.id;

    if (task.status !== destinationStatus) {
      handleMove(task, destinationStatus);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-6 px-4 pb-10">
        {statusColumns.map((status) => (
          <DroppableColumn key={status} status={status}>
            <div className="space-y-4">
              {getTasksByStatus(status).map((task) => (
                <DraggableTask key={task._id} task={task}>
                  <div
                    className="bg-gray-50 p-4 rounded-xl border border-transparent shadow hover:shadow-md transition duration-300"
                    style={{
                      borderImage:
                        "linear-gradient(to right, #ec4899, #f97316, #8b5cf6) 1",
                      borderStyle: "solid",
                      borderWidth: "1px",
                    }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex flex-wrap justify-end gap-2 mt-4">
                      <EditDialog task={task} />
                      <DeleteAlertDialog id={task._id} />
                      {statusColumns
                        .filter((s) => s !== task.status)
                        .map((s) => (
                          <Button
                            key={s}
                            variant="outlined"
                            size="small"
                            onClick={() => handleMove(task, s)}
                          >
                            Move to {s}
                          </Button>
                        ))}
                    </div>
                  </div>
                </DraggableTask>
              ))}
            </div>
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
