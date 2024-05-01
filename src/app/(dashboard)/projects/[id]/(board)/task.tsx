import { cn } from "@/utils/cn";
import { DeleteOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { Button, Typography } from "antd";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface TaskProps {
  id: string;
  content: string;
  columnId: string;
  className?: string;
  deleteTask: (id: string) => void;
}

export default function Task({
  id,
  content,
  columnId,
  className,
  deleteTask,
}: TaskProps) {
  const [contentString, setContentString] = useState(content);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { type: "TASK", task: { id, content, columnId } },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className={cn(
        "w-full h-20 max-h-20 bg-white shadow rounded-md p-2 overflow-y-auto relative cursor-grab group",
        isDragging && "opacity-40 ring ring-offset-1 ring-blue-500",
        className
      )}
    >
      <Typography.Text editable={{ onChange: setContentString }}>
        {contentString}
      </Typography.Text>

      <Button
        danger
        type="text"
        icon={<DeleteOutlined />}
        onClick={() => deleteTask(id)}
        className="!absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
      />
    </div>
  );
}
