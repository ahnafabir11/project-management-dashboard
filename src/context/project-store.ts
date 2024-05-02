import create from "zustand";
import { projects as oldProjects } from "@/data/projects";
import { users as oldUsers } from "@/data/users";
import { UserType } from "@/types/user";

interface Project {
  id: string;
  name: string;
  users: UserType[];
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  editProject: (projectId: string, updatedProject: Partial<Project>) => void;
}

// Function to merge users array with projects array
const mergeUsersWithProjects = () => {
  // Map over each project
  return oldProjects.map((project) => {
    // Find the users associated with the current project
    const projectUsers = project.users.map(
      (userId) => oldUsers.find((user) => user.id === userId)!
    );
    // Return the project object with merged users
    return { ...project, users: projectUsers };
  });
};

// Initial state
const initialState: ProjectState = {
  projects: [...mergeUsersWithProjects()],
  addProject: () => {},
  deleteProject: () => {},
  editProject: () => {},
};

// Actions
const actions = (
  set: (fn: (state: ProjectState) => ProjectState) => void
): ProjectState => ({
  ...initialState,
  addProject: (project) =>
    set((state) => ({
      ...state,
      projects: [...state.projects, project],
    })),
  deleteProject: (projectId) =>
    set((state) => ({
      ...state,
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
  editProject: (projectId, updatedProject) =>
    set((state) => ({
      ...state,
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, ...updatedProject } : project
      ),
    })),
});

// Create store
const useProjectStore = create<ProjectState>((set) => ({
  ...initialState,
  ...actions(set),
}));

export default useProjectStore;
