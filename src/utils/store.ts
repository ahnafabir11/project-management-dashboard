import create from "zustand";

interface Project {
  id: string;
  name: string;
  // Add other properties as needed
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  editProject: (projectId: string, updatedProject: Partial<Project>) => void;
}

// Initial state
const initialState: ProjectState = {
  projects: [],
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
