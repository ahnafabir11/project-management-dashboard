"use client";
import ProjectModal from "@/components/project-modal";
import { ProjectFormValues } from "@/types/project";
import useProjectStore from "@/utils/store";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { v4 as uuidv4 } from "uuid";

export default function CreateProjectTrigger() {
  const addProject = useProjectStore((state) => state.addProject);

  const handleCreateProject = (values: ProjectFormValues) => {
    const newProject = { id: uuidv4(), ...values, users: [] };
    addProject(newProject);
  };

  return (
    <ProjectModal onFinish={handleCreateProject}>
      <Button
        size="large"
        type="primary"
        icon={<AppstoreAddOutlined />}
        className="w-full sm:w-auto mt-4 sm:mt-0"
      >
        Create Project
      </Button>
    </ProjectModal>
  );
}
