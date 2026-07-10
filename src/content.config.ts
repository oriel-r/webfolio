import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const langString = z.string();

const langSchema = <T extends z.ZodRawShape>(shape: T) =>
  z.object({
    es: z.object(shape),
    en: z.object(shape),
  });

const hero = defineCollection({
  loader: glob({ pattern: 'index.yaml', base: './src/content/hero' }),
  schema: langSchema({
    title: langString,
    subtitle: langString,
    description: langString,
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/experience' }),
  schema: langSchema({
    company_name: langString,
    position: langString,
    short_description: langString.optional(),
    start_date: langString.optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: langSchema({
    name: langString,
    type: langString,
    description: langString,
    images: z.array(langString).optional(),
    colaborators: z
      .array(
        z.object({
          name: langString.optional(),
          contact: z.string().url(),
        })
      )
      .optional(),
    technologies: z.array(langString),
    demo: z.string().url().optional(),
    repository: z.string().url(),
    role: langString.optional(),
    back_repo: z.string().url().optional(),
    front_repo: z.string().url().optional(),
    long_description: langString.optional(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/skills' }),
  schema: z.object({
    name: langString,
    icon: langString,
    category: z.enum([
      'Backend & Architechure',
      'DevOps & Cloud',
      'Frontend',
      'DevTool',
      'Databases',
      'AI & Automations',
    ]),
    projects: z.array(langString).optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'index.yaml', base: './src/content/about' }),
  schema: z.object({
    photo: z.string(),
    es: z.object({
      title: langString,
      text: z.array(langString),
    }),
    en: z.object({
      title: langString,
      text: z.array(langString),
    }),
  }),
});

export const collections = { hero, experience, projects, skills, about };
