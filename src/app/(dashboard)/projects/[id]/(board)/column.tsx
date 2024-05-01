"use client";
import { cn } from "@/utils/cn";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Tag, Typography } from "antd";
import { useMemo } from "react";
import Task from "./task";

interface Task {
  id: string;
  content: string;
  columnId: string;
}

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  className?: string;
  createTask: (id: string) => void;
  deleteTask: (id: string) => void;
  deleteColumn: (id: string) => void;
}

export default function Column({
  id,
  title,
  tasks,
  className,
  createTask,
  deleteTask,
  deleteColumn,
}: ColumnProps) {
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { type: "COLUMN", column: { id, title } },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className={cn(
        "w-80 h-full bg-white flex flex-col border rounded-md cursor-grab",
        isDragging && "opacity-40 ring ring-offset-1 ring-blue-500",
        className
      )}
    >
      <div className="flex items-center gap-2 bg-gray-50 px-4 py-2">
        <Tag color="processing" bordered={false} className="shrink-0">
          10
        </Tag>

        <Typography.Title ellipsis level={4} className="!m-0 !mr-auto">
          {title}
        </Typography.Title>

        <Button
          danger
          type="text"
          className="shrink-0"
          icon={<DeleteOutlined />}
          onClick={() => deleteColumn(id)}
        />
      </div>

      <div className="flex flex-col gap-4 flex-grow p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <Task
              {...task}
              key={task.id}
              className="shrink-0"
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>

      <footer className="border-t rounded-md">
        <Button
          type="text"
          className="w-full"
          icon={<PlusOutlined />}
          onClick={() => createTask(id)}
        >
          Add New Task
        </Button>
      </footer>
    </div>
  );
}
