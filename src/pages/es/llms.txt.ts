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
} from '../../utils/seo';

export const prerender = true;

export const GET: APIRoute = async () => {
  const heroEntry = await getEntry('hero', 'index');
  const heroEs = heroEntry?.data.es;
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
      const data = p.data.es;
      const url = `${SITE_URL}/projects/${p.id}/`;
      return `- [${data.name}](${url}): ${data.description}. Stack: ${data.technologies.slice(0, 6).join(', ')}. Código: ${data.repository}`;
    })
    .join('\n');

  const experienceMarkdown = experienceEntries
    .map((e) => {
      const data = e.data.es;
      return `- **${data.company_name}** — ${data.position} (${data.start_date ?? 'Presente'}): ${data.short_description ?? ''}`;
    })
    .join('\n');

  const content = `# ${AUTHOR_NAME} — Desarrollador Backend & Ingeniero de Software

> ${heroEs?.description ?? 'Desarrollador Backend enfocado en producto, traduciendo ideas complejas en sistemas escalables, eficientes y listos para producción.'}

## Resumen Profesional
- **Nombre Legal**: ${LEGAL_NAME}
- **Identidad Profesional**: Desarrollador Backend Orientado a Producto / Sistemas Distribuidos
- **Ubicación**: ${GEO_METADATA.locality}, Argentina (Zona horaria: ${GEO_METADATA.timezone}, ${GEO_METADATA.utcOffset})
- **Disponibilidad**: Remoto a tiempo completo a nivel global (EE.UU., LATAM, Europa) e Híbrido/Remoto local
- **Idiomas**: Español (Nativo), Inglés (Competencia profesional)
- **Stack Principal**: ${coreSkills}
- **Fundador & Desarrollador Principal**: CoPAS (Plataforma SaaS B2B para productores de seguros con pipelines de automatización con IA)

## Proyectos Destacados en Producción
${projectsMarkdown}

## Experiencia Laboral
${experienceMarkdown}

## Grafo de Conocimiento Completo para Modelos de Lenguaje (LLMs)
Para dossiers técnicos detallados, arquitecturas de proyectos y preguntas frecuentes para agentes de IA:
- [Grafo de Conocimiento Completo](${SITE_URL}/llms-full.txt)
- [Versión en Inglés (English version)](${SITE_URL}/llms.txt)

## Enlaces Canónicos y Contacto
- Sitio Web (Español): ${SITE_URL}/
- Sitio Web (Inglés): ${SITE_URL}/en/
- GitHub: ${GITHUB_URL}
- LinkedIn: ${LINKEDIN_URL}
- Email: mailto:${CONTACT_EMAIL}
- Agendar Llamada: ${CALENDAR_URL}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Language': 'es',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
