"use client";
import { ProjectFormValues } from "@/types/project";
import { cn } from "@/utils/cn";
import useProjectStore from "@/utils/store";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Dropdown,
  Popconfirm,
  Tooltip,
  Typography,
} from "antd";
import Link from "next/link";
import ProjectModal from "../project-modal";

interface ProjectCardProps {
  id: string;
  name: string;
  className?: string;
}

export default function ProjectCard({ id, name, className }: ProjectCardProps) {
  const editProject = useProjectStore((state) => state.editProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const handleEditPorject = (values: ProjectFormValues) => {
    const editedProject = { name: values.name };
    editProject(id, editedProject);
  };

  const handleDeletePorject = () => {
    deleteProject(id);
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      icon: <EditOutlined />,
      label: (
        <ProjectModal
          isEditing
          initialValue={name}
          onFinish={handleEditPorject}
        >
          Edit Project
        </ProjectModal>
      ),
    },
    {
      key: "1",
      danger: true,
      icon: <DeleteOutlined />,
      label: (
        <Popconfirm
          okText="Yes"
          cancelText="No"
          title="Delete the project"
          description="Are you sure to delete this project?"
          onConfirm={handleDeletePorject}
        >
          Delete Project
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className={cn("group relative block", className)}>
      <span className="absolute inset-0 border-2 border-dashed border-black rounded"></span>

      <div className="group-hover:-translate-x-2 group-hover:-translate-y-2 transform transition-transform h-full bg-white border-2 border-black rounded">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <Link href={`/projects/${id}`}>
              <Typography.Title
                ellipsis
                level={4}
                className="group-hover:underline !mb-0"
              >
                {name}
              </Typography.Title>
            </Link>

            <CardDropdown items={items} />
          </div>

          {/* TEAM MEMBERS */}
          <Avatar.Group
            size="small"
            maxCount={5}
            maxStyle={{ color: "#1677ff", backgroundColor: "#e6f4ff" }}
          >
            {Array.from({ length: 10 }).map((_, idx) => (
              <Tooltip key={idx} title="User 1">
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#4096ff", color: "#fff" }}
                />
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      </div>
    </div>
  );
}

function CardDropdown({ items }: { items: MenuProps["items"] }) {
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      className="z-10"
    >
      <Button type="text" size="small" shape="circle" icon={<MoreOutlined />} />
    </Dropdown>
  );
}
