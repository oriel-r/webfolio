import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import {
  SITE_URL,
  AUTHOR_NAME,
  LEGAL_NAME,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  CALENDAR_URL,
  GEO_METADATA,
} from '../utils/seo';

export const prerender = true;

export const GET: APIRoute = async () => {
  const heroEntry = await getEntry('hero', 'index');
  const heroEn = heroEntry?.data.en;
  const projectEntries = await getCollection('projects');
  const skillsEntries = await getCollection('skills');
  const experienceEntries = await getCollection('experience');

  const coreSkills = skillsEntries
    .filter((s) => s.data.category === 'Backend & Architecture' || s.data.category === 'DevOps & Cloud')
    .slice(0, 12)
    .map((s) => s.data.name)
    .join(', ');

  const projectsMarkdown = projectEntries
    .map((p) => {
      const data = p.data.en;
      const url = `${SITE_URL}/en/projects/${p.id}/`;
      return `- [${data.name}](${url}): ${data.description}. Stack: ${data.technologies.slice(0, 6).join(', ')}. Code: ${data.repository}`;
    })
    .join('\n');

  const experienceMarkdown = experienceEntries
    .map((e) => {
      const data = e.data.en;
      return `- **${data.company_name}** — ${data.position} (${data.start_date ?? 'Present'}): ${data.short_description ?? ''}`;
    })
    .join('\n');

  const content = `# ${AUTHOR_NAME} — Product-Minded Backend Engineer

> ${heroEn?.description ?? 'Product-Minded Backend Engineer translating complex ideas into scalable, efficient, production-ready systems.'}

## Professional Summary
- **Legal Name**: ${LEGAL_NAME}
- **Professional Identity**: Product-Minded Backend Engineer / Distributed Systems Developer
- **Location**: ${GEO_METADATA.locality}, ${GEO_METADATA.country} (Timezone: ${GEO_METADATA.timezone}, ${GEO_METADATA.utcOffset})
- **Work Availability**: Full-time Remote Worldwide (US, LATAM, Europe) & Local Hybrid/Remote
- **Languages**: Spanish (Native), English (Professional Working Proficiency)
- **Primary Core Stack**: ${coreSkills}
- **Founder & Lead Developer**: CoPAS (B2B SaaS platform for insurance brokers with AI automation pipelines)

## Key Production Projects
${projectsMarkdown}

## Experience Highlights
${experienceMarkdown}

## Full Knowledge Graph & In-Depth Context
For full technical dossiers, complete project architectures, and detailed FAQ for AI retrieval agents, read:
- [Full LLM Knowledge Graph](${SITE_URL}/llms-full.txt)
- [Spanish Version / Versión en Español](${SITE_URL}/es/llms.txt)

## Canonical Links & Contact
- Website (Spanish): ${SITE_URL}/
- Website (English): ${SITE_URL}/en/
- GitHub: ${GITHUB_URL}
- LinkedIn: ${LINKEDIN_URL}
- Email: mailto:${CONTACT_EMAIL}
- Schedule Call: ${CALENDAR_URL}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
