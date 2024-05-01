"use client";
import ProjectCard from "@/components/ui/project-card";
import useProjectStore from "@/utils/store";
import { useMemo } from "react";

interface ProjectListProps {
  searchString?: string;
}

export default function ProjectList({ searchString }: ProjectListProps) {
  const projects = useProjectStore((state) => state.projects);

  const filteredProjects = useMemo(() => {
    if (!searchString) return projects;

    return projects.filter(({ name }) =>
      name.toLowerCase().includes(searchString.toLowerCase())
    );
  }, [projects, searchString]);

  return (
    <>
      {filteredProjects.map(({ id, name, users }) => (
        <ProjectCard key={id} id={id} name={name} users={users} />
      ))}
    </>
  );
}
