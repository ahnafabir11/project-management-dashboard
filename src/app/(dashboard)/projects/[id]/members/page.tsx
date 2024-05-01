"use client";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

interface DataType {
  id: string;
  name: string;
  email: string;
  type: string;
}

export default function ProjectMembers() {
  const handleRemoveMember = (memberId: string) => {
    console.log(memberId);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "type",
      title: "Type",
      dataIndex: "type",
      render: (tag) => (
        <Tag color={tag === "admin" ? "cyan" : "blue"}>{tag.toUpperCase()}</Tag>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Remove Member">
            <Popconfirm
              okText="Yes"
              cancelText="No"
              title="Remove Member"
              description="Are you sure to remove this member?"
              onConfirm={() => handleRemoveMember(record.id)}
            >
              <Button
                danger
                type="text"
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      id: "1",
      name: "John Brown",
      email: "ahnafabir313@gmail.com",
      type: "admin",
    },
    {
      id: "2",
      name: "Jim Green",
      email: "ahnafabir313@gmail.com",
      type: "member",
    },
    {
      id: "3",
      name: "Joe Black",
      email: "ahnafabir313@gmail.com",
      type: "member",
    },
  ];

  return (
    <main>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8">
        <Typography.Title level={3} className="!m-0">
          Project Members
        </Typography.Title>

        <Button
          size="large"
          type="primary"
          icon={<UserAddOutlined />}
          className="w-full sm:w-auto mt-4 sm:mt-0"
        >
          Add Member
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 500 }}
      />
    </main>
  );
}
