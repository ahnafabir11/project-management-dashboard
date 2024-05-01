"use client";

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

export default function ProjectCard() {
  const handleEditPorject = () => {};
  const handleDeletePorject = () => {};

  const items: MenuProps["items"] = [
    {
      key: "0",

      label: "Edit Project",
      icon: <EditOutlined />,
      onClick: handleEditPorject,
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
    <Link href="/" className="group relative block">
      <span className="absolute inset-0 border-2 border-dashed border-black rounded"></span>

      <div className="group-hover:-translate-x-2 group-hover:-translate-y-2 transform transition-transform h-full bg-white border-2 border-black rounded">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <Typography.Title
              ellipsis
              level={4}
              className="group-hover:underline !mb-0"
            >
              Project 1
            </Typography.Title>

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
    </Link>
  );
}

function CardDropdown({ items }: { items: MenuProps["items"] }) {
  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <Button type="text" size="small" shape="circle" icon={<MoreOutlined />} />
    </Dropdown>
  );
}
