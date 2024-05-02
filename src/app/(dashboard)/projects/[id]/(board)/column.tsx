"use client";
import useBoardStore from "@/context/board-store";
import { cn } from "@/utils/cn";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Typography } from "antd";
import { useMemo } from "react";
import Task from "./task";

interface ColumnProps {
  id: string;
  title: string;
  className?: string;
}

export default function Column({ id, title, className }: ColumnProps) {
  const allTasks = useBoardStore((state) => state.tasks);
  const tasks = useMemo(
    () => allTasks.filter((task) => task.columnId === id),
    [id, allTasks]
  );
  const createTask = useBoardStore((state) => state.createTask);
  const deleteColumn = useBoardStore((state) => state.deleteColumn);
  const updateColumn = useBoardStore((state) => state.updateColumn);

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
        <Typography.Title
          ellipsis
          level={4}
          className="!m-0 !mr-auto grow"
          editable={{ onChange: (value) => updateColumn(id, { title: value }) }}
        >
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
            <Task {...task} key={task.id} className="shrink-0" />
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
