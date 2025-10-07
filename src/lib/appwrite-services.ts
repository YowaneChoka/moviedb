import { database, storage } from './appwrite';
import { ID, Query } from 'appwrite';

export const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';

// Database and Collection IDs - Replace with your actual IDs
export const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'project-id';;
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'portfolio-db';
export const PROJECTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID || 'projects';
export const SKILLS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID || 'skills';
export const EXPERIENCE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_EXPERIENCE_COLLECTION_ID || 'experience';
export const MOVIE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_MOVIE_COLLECTION_ID || 'movie-collection';
export const TRENDING_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TRENDING_COLLECTION_ID || 'movie-trending';
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || 'portfolio-assets';

// Types for portfolio data
export interface Project {
  $id?: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageId?: string;
  featured: boolean;
  createdAt: string;
}

export interface Skill {
  $id?: string;
  name: string;
  category: string;
  level: number; // 1-10
  iconId?: string;
}

export interface Experience {
  $id?: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
  current: boolean;
}

// Project Services
export const projectService = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        [Query.orderDesc('createdAt')]
      );
      return response.documents as unknown as Project[];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        [Query.equal('featured', true), Query.orderDesc('createdAt')]
      );
      return response.documents as unknown as Project[];
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  },

  // Create project (for admin use)
  async createProject(project: Omit<Project, '$id'>): Promise<Project> {
    try {
      const response = await database.createDocument(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        ID.unique(),
        project
      );
      return response as unknown as Project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }
};

// Skill Services
export const skillService = {
  // Get all skills
  async getSkills(): Promise<Skill[]> {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        SKILLS_COLLECTION_ID,
        [Query.orderDesc('level')]
      );
      return response.documents as unknown as Skill[];
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },

  // Get skills by category
  async getSkillsByCategory(category: string): Promise<Skill[]> {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        SKILLS_COLLECTION_ID,
        [Query.equal('category', category), Query.orderDesc('level')]
      );
      return response.documents as unknown as Skill[];
    } catch (error) {
      console.error('Error fetching skills by category:', error);
      throw error;
    }
  }
};

// Experience Services
export const experienceService = {
  // Get all experience
  async getExperience(): Promise<Experience[]> {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        EXPERIENCE_COLLECTION_ID,
        [Query.orderDesc('startDate')]
      );
      return response.documents as unknown as Experience[];
    } catch (error) {
      console.error('Error fetching experience:', error);
      throw error;
    }
  }
};

// Storage Services
export const storageService = {
  // Get file URL
  getFileUrl(fileId: string): string {
    try {
      const result = storage.getFileView(BUCKET_ID, fileId);
      return result.toString();
    } catch (error) {
      console.error('Error getting file URL:', error);
      return '';
    }
  },

  // Upload file
  async uploadFile(file: File, fileId?: string): Promise<string> {
    try {
      const response = await storage.createFile(
        BUCKET_ID,
        fileId || ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
};