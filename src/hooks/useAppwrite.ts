import { useState, useEffect } from 'react';
import { 
  projectService, 
  skillService, 
  experienceService,
  type Project,
  type Skill,
  type Experience 
} from '../lib/appwrite-services';

// Custom hook for fetching projects
export function useProjects(featured: boolean = false) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = featured 
        ? await projectService.getFeaturedProjects()
        : await projectService.getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [featured]);

  return { projects, loading, error, refetch: fetchProjects };
}

// Custom hook for fetching skills
export function useSkills(category?: string) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = category 
          ? await skillService.getSkillsByCategory(category)
          : await skillService.getSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skills');
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [category]);

  return { skills, loading, error };
}

// Custom hook for fetching experience
export function useExperience() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const data = await experienceService.getExperience();
        setExperience(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch experience');
        console.error('Error fetching experience:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experience, loading, error };
}