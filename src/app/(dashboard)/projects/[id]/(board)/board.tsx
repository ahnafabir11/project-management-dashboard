"use client";
import useBoardStore from "@/context/board-store";
import { PlusOutlined } from "@ant-design/icons";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Button } from "antd";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import Column from "./column";
import Task from "./task";

export default function Board({ projectId }: { projectId: string }) {
  const activeTask = useBoardStore((state) => state.activeTask);
  const activeColumn = useBoardStore((state) => state.activeColumn);
  const updateActiveTask = useBoardStore((state) => state.updateActiveTask);
  const updateActiveColumn = useBoardStore((state) => state.updateActiveColumn);

  const tasks = useBoardStore((state) => state.tasks);
  const sortTasks = useBoardStore((state) => state.sortTasks);

  const allCols = useBoardStore((state) => state.columns);
  const columns = useMemo(
    () => allCols.filter((col) => col.projectId === projectId),
    [projectId, allCols]
  );
  const createColumn = useBoardStore((state) => state.createColumn);
  const sortColumns = useBoardStore((state) => state.sortColumns);

  const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { data } = active;

    if (data.current?.type === "COLUMN") {
      updateActiveColumn(data.current?.column);
      return;
    }

    if (data.current?.type === "TASK") {
      updateActiveTask(data.current?.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    updateActiveTask(null);
    updateActiveColumn(null);

    const { active, over } = event;

    if (!over) return;

    const overColumnId = over.id;
    const activeColumnId = active.id;

    if (overColumnId === activeColumnId) return;

    const activeColumnIndex = columns.findIndex(
      (col) => activeColumnId === col.id
    );
    const overColumnIndex = columns.findIndex((col) => overColumnId === col.id);

    sortColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const overId = over.id;
    const activeId = active.id;

    if (overId === activeId) return;

    const isOverTask = over.data.current?.type === "TASK";
    const isActiveTask = active.data.current?.type === "TASK";

    if (!isActiveTask) return;

    // DROPING TASK OVER ANOTHER TASK
    if (isActiveTask && isOverTask) {
      const overTaskIndex = tasks.findIndex((task) => overId === task.id);
      const activeTaskIndex = tasks.findIndex((task) => activeId === task.id);

      tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

      sortTasks(arrayMove(tasks, activeTaskIndex, overTaskIndex));
    }

    const isOverColumn = over.data.current?.type === "COLUMN";

    // DROPING TASK OVER ANOTHER COLUMN
    if (isActiveTask && isOverColumn) {
      const activeTaskIndex = tasks.findIndex((task) => activeId === task.id);

      tasks[activeTaskIndex].columnId = overId as string;

      sortTasks(arrayMove(tasks, activeTaskIndex, activeTaskIndex));
    }
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="w-full h-full flex gap-4">
          <SortableContext items={columnIds}>
            {columns.map(({ id, title }) => (
              <Column id={id} key={id} title={title} className="shrink-0" />
            ))}
          </SortableContext>

          <Button
            size="large"
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => createColumn(projectId)}
          >
            Add New Column
          </Button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && <Column {...activeColumn} />}
            {activeTask && <Task {...activeTask} key={activeTask.id} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
