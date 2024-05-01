"use client";
import useProjectStore from "@/utils/store";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button, Popconfirm, Space, Table, Tooltip, Typography } from "antd";

interface DataType {
  id: string;
  name: string;
  email: string;
}

export default function ProjectMembers({ params }: { params: { id: string } }) {
  const projects = useProjectStore((state) => state.projects);
  const projectsMembers = projects.find(
    (project) => project.id === params.id
  )!.users;

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

  const data: DataType[] = projectsMembers.map(({ id, name, email }) => ({
    id,
    name,
    email,
  }));

  return (
    <main className="p-4 sm:p-6 lg:p-8">
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
