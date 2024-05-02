import useBoardStore from "@/context/board-store";
import { cn } from "@/utils/cn";
import { DeleteOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Typography } from "antd";

interface TaskProps {
  id: string;
  content: string;
  columnId: string;
  className?: string;
}

export default function Task({ id, content, columnId, className }: TaskProps) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const updateTask = useBoardStore((state) => state.updateTask);

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
      <Typography.Text
        editable={{ onChange: (value) => updateTask(id, { content: value }) }}
      >
        {content}
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
