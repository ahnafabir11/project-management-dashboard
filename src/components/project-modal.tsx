"use client";
import { ProjectFormValues } from "@/types/project";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { PropsWithChildren, useState } from "react";

interface ProjectModalProps extends PropsWithChildren {
  isEditing?: boolean;
  initialValue?: string;
  onFinish: (values: ProjectFormValues) => void;
}

export default function ProjectModal({
  onFinish,
  children,
  initialValue,
  isEditing = false,
}: ProjectModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFinish: FormProps<ProjectFormValues>["onFinish"] = async (
    values
  ) => {
    onFinish(values);
    setIsModalOpen(false);
  };

  return (
    <>
      <span onClick={() => setIsModalOpen(true)}>{children}</span>

      <Modal
        centered
        footer={false}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Project" : "Create Project"}
      >
        <Form
          colon={false}
          layout="vertical"
          requiredMark={false}
          className="space-y-8"
          onFinish={handleFinish}
          style={{ marginTop: "2rem" }}
          initialValues={{ name: initialValue }}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: "Please input project name!" }]}
          >
            <Input size="large" placeholder="Enter project name" />
          </Form.Item>

          <div className="flex items-center justify-end gap-2">
            <Button htmlType="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              {isEditing ? "Edit" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
