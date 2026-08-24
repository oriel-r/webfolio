import type { CollectionEntry } from 'astro:content';

export type SkillOverride = {
  name: string;
  icon?: string;
};

/**
 * Build a lookup map from the technology name used in a project to the
 * canonical name/icon defined in the skills collection.
 *
 * Technologies already carries the canonical naming, so when a project
 * references a skill (via `skill.data.projects`) we render the skill's
 * name and icon inside ProjectDetail pills.
 */
export function getProjectSkillOverrides(
  skills: CollectionEntry<'skills'>[],
  _projectId?: string,
): Record<string, SkillOverride> {
  return skills.reduce((acc, skill) => {
    const override: SkillOverride = {
      name: skill.data.name,
      icon: skill.data.icon,
    };
    acc[skill.data.name] = override;
    acc[skill.id] = override;
    return acc;
  }, {} as Record<string, SkillOverride>);
}
