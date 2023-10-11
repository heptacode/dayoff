import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Project, MapType } from '@/types';

export interface ProjectState {
  isLoading: boolean;
  projects: Project[];
  projectId: string | null;
  title: string;
  subtitle: string;
  mapType: MapType | null;
  setIsLoading(value: boolean): void;
  setProjects(value: Project[]): void;
  setProjectId(value: string | null): void;
  setTitle(value: string): void;
  setSubtitle(value: string): void;
  setMapType(value: MapType): void;
}

export const useProjectStore = create<ProjectState>()(
  devtools(set => ({
    isLoading: true,
    projects: [],
    projectId: null,
    title: '',
    subtitle: '',
    mapType: null,
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setProjects(value) {
      set({ projects: value });
    },
    setProjectId(value) {
      set({ projectId: value });
    },
    setTitle(value) {
      set({ title: value });
    },
    setSubtitle(value) {
      set({ subtitle: value });
    },
    setMapType(value) {
      set({ mapType: value });
    },
  }))
);
