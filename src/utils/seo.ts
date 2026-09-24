import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/utils';

export const SITE_URL = 'https://oriel.is-a.dev';
export const SITE_NAME = 'Oriel Romero';
export const AUTHOR_NAME = 'Oriel Romero';
export const LEGAL_NAME = 'Leandro Oriel Romero';
export const CONTACT_EMAIL = 'orielromero97@gmail.com';
export const GITHUB_URL = 'https://github.com/oriel-r';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/oriel-romero/';
export const CALENDAR_URL = 'https://calendar.app.google/jBmcRvzWLpc516qZ7';

export const GEO_METADATA = {
  region: 'AR-C',
  placename: 'Buenos Aires',
  position: '-34.6037;-58.3816',
  icbm: '-34.6037, -58.3816',
  country: 'AR',
  locality: 'Buenos Aires',
  timezone: 'America/Argentina/Buenos_Aires',
  utcOffset: 'UTC-3',
} as const;

/**
 * Mapeo de tecnologías a entidades canónicas de Wikidata para máxima
 * desambiguación en Google Knowledge Graph, Bing Copilot y motores de IA (GEO).
 */
export const WIKIDATA_SKILLS: Record<string, { name: string; wikidata: string }> = {
  'Node.js': { name: 'Node.js', wikidata: 'https://www.wikidata.org/wiki/Q756100' },
  'TypeScript': { name: 'TypeScript', wikidata: 'https://www.wikidata.org/wiki/Q978185' },
  'NestJS': { name: 'NestJS', wikidata: 'https://www.wikidata.org/wiki/Q105820351' },
  'PostgreSQL': { name: 'PostgreSQL', wikidata: 'https://www.wikidata.org/wiki/Q192490' },
  'SQL': { name: 'SQL', wikidata: 'https://www.wikidata.org/wiki/Q47607' },
  'Redis': { name: 'Redis', wikidata: 'https://www.wikidata.org/wiki/Q1808620' },
  'Docker': { name: 'Docker', wikidata: 'https://www.wikidata.org/wiki/Q15147317' },
  'Docker Compose': { name: 'Docker', wikidata: 'https://www.wikidata.org/wiki/Q15147317' },
  'AWS': { name: 'Amazon Web Services', wikidata: 'https://www.wikidata.org/wiki/Q473649' },
  'Cloudflare': { name: 'Cloudflare', wikidata: 'https://www.wikidata.org/wiki/Q5135759' },
  'Astro': { name: 'Astro (web framework)', wikidata: 'https://www.wikidata.org/wiki/Q110855269' },
  'React': { name: 'React', wikidata: 'https://www.wikidata.org/wiki/Q80429' },
  'Next.js': { name: 'Next.js', wikidata: 'https://www.wikidata.org/wiki/Q112671042' },
  'Tailwind CSS': { name: 'Tailwind CSS', wikidata: 'https://www.wikidata.org/wiki/Q104842425' },
  'WebSockets': { name: 'WebSocket', wikidata: 'https://www.wikidata.org/wiki/Q859938' },
  'REST': { name: 'Representational State Transfer', wikidata: 'https://www.wikidata.org/wiki/Q216377' },
  'GraphQL': { name: 'GraphQL', wikidata: 'https://www.wikidata.org/wiki/Q20968984' },
  'AI Integration': { name: 'Artificial Intelligence', wikidata: 'https://www.wikidata.org/wiki/Q11660' },
  'BullMQ': { name: 'Message Queue', wikidata: 'https://www.wikidata.org/wiki/Q1499597' },
  'TypeORM': { name: 'Object-Relational Mapping', wikidata: 'https://www.wikidata.org/wiki/Q1145523' },
  'JWT': { name: 'JSON Web Token', wikidata: 'https://www.wikidata.org/wiki/Q22662648' },
  'Auth0': { name: 'Auth0', wikidata: 'https://www.wikidata.org/wiki/Q65089901' },
  'Swagger/OpenAPI': { name: 'OpenAPI Specification', wikidata: 'https://www.wikidata.org/wiki/Q28136365' },
  'GitHub Actions': { name: 'CI/CD', wikidata: 'https://www.wikidata.org/wiki/Q5057317' },
  'Express': { name: 'Express.js', wikidata: 'https://www.wikidata.org/wiki/Q18354245' },
  'Vite': { name: 'Vite', wikidata: 'https://www.wikidata.org/wiki/Q108285573' },
  'Redux Toolkit': { name: 'Redux', wikidata: 'https://www.wikidata.org/wiki/Q25110860' },
};

/**
 * Convierte un string de habilidad en un DefinedTerm con URI de Wikidata si existe.
 */
export function mapSkillToSchemaConcept(skillName: string) {
  const match = WIKIDATA_SKILLS[skillName];
  if (match) {
    return {
      '@type': 'DefinedTerm',
      name: skillName,
      sameAs: match.wikidata,
    };
  }
  return {
    '@type': 'DefinedTerm',
    name: skillName,
  };
}

/**
 * Construye la entidad Person canónica para Oriel Romero.
 */
export function buildPersonSchema(lang: Lang = 'es', skills: string[] = []) {
  const isEs = lang === 'es';
  const knowsAbout = skills.length > 0
    ? skills.map(mapSkillToSchemaConcept)
    : Object.keys(WIKIDATA_SKILLS).slice(0, 15).map(mapSkillToSchemaConcept);

  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    givenName: 'Leandro Oriel',
    familyName: 'Romero',
    alternateName: [LEGAL_NAME, 'oriel-r', 'Oriel Romero Dev'],
    jobTitle: isEs
      ? ['Desarrollador Backend', 'Product-Minded Backend Engineer', 'Ingeniero de Software']
      : ['Product-Minded Backend Engineer', 'Senior Backend Developer', 'Software Engineer'],
    description: isEs
      ? 'Desarrollador Backend enfocado en producto y arquitecturas escalables. Especializado en Node.js, NestJS, TypeScript, BullMQ, Redis, PostgreSQL e integraciones de IA. Ubicado en Buenos Aires, Argentina y disponible para trabajo remoto internacional.'
      : 'Product-Minded Backend Engineer specializing in scalable architectures, Node.js, NestJS, TypeScript, BullMQ, Redis, PostgreSQL, and AI pipelines. Based in Buenos Aires, Argentina, available for global remote roles.',
    url: SITE_URL,
    image: `${SITE_URL}/oriel_romero_portrait.jpg`,
    email: `mailto:${CONTACT_EMAIL}`,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    address: {
      '@type': 'PostalAddress',
      addressLocality: GEO_METADATA.locality,
      addressRegion: 'Buenos Aires',
      addressCountry: GEO_METADATA.country,
    },
    workLocation: {
      '@type': 'VirtualLocation',
      name: 'Remote Worldwide (UTC-3)',
    },
    jobLocationType: 'TELECOMMUTE',
    founderOf: {
      '@type': 'Organization',
      name: 'CoPAS',
      description: isEs
        ? 'Plataforma SaaS B2B para gestión de seguros (PAS y agencias) con pipelines de IA'
        : 'B2B SaaS platform for insurance management with AI automation pipelines',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: isEs ? 'Desarrollador de Software Backend' : 'Backend Software Engineer',
      occupationalCategory: '15-1252.00',
      skills: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker', 'AI Integration'],
    },
    knowsLanguage: [
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    knowsAbout,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'professional',
      email: `mailto:${CONTACT_EMAIL}`,
      url: CALENDAR_URL,
      availableLanguage: ['Spanish', 'English'],
    },
    seeks: {
      '@type': 'Demand',
      name: isEs
        ? 'Posiciones Backend Engineering remotas a nivel mundial'
        : 'Remote Backend Engineering positions worldwide',
    },
  };
}

/**
 * Construye la entidad WebSite.
 */
export function buildWebSiteSchema(lang: Lang = 'es') {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Oriel Romero | Portfolio',
    description: lang === 'es'
      ? 'Portafolio profesional de Oriel Romero - Desarrollador Backend orientado a producto.'
      : 'Professional portfolio of Oriel Romero - Product-Minded Backend Engineer.',
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
    inLanguage: ['es', 'en'],
  };
}

/**
 * Construye la entidad ProfilePage.
 */
export function buildProfilePageSchema(currentUrl: string, lang: Lang = 'es') {
  return {
    '@type': 'ProfilePage',
    '@id': `${currentUrl}#profilepage`,
    url: currentUrl,
    name: lang === 'es' ? 'Perfil Profesional de Oriel Romero' : 'Oriel Romero Professional Profile',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    mainEntity: {
      '@id': `${SITE_URL}/#person`,
    },
  };
}

/**
 * Construye el schema de un proyecto individual (SoftwareSourceCode / CreativeWork).
 */
export function buildProjectSchema(
  project: CollectionEntry<'projects'>,
  lang: Lang,
  currentUrl: string
) {
  const data = project.data[lang] ?? project.data.es;
  // Cover images have been moved from public/ to src/assets/ for Astro Image optimization.
  // JSON-LD requires absolute URLs, so we use the default OG image for structured data.
  // The actual optimized WebP images are served by the <Image /> component in HTML.
  const imageUrl = `${SITE_URL}/og-image.png`;

  const programmingLanguages = data.technologies.map(mapSkillToSchemaConcept);

  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${currentUrl}#project`,
    url: currentUrl,
    name: data.name,
    headline: data.description,
    description: data.long_description ?? data.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    codeRepository: data.repository ?? data.back_repo,
    author: {
      '@id': `${SITE_URL}/#person`,
    },
    image: imageUrl,
    programmingLanguage: programmingLanguages,
    keywords: data.technologies.join(', '),
    ...(data.demo ? { installUrl: data.demo } : {}),
  };
}

/**
 * Construye un BreadcrumbList para una página de proyecto.
 */
export function buildProjectBreadcrumbs(projectName: string, currentUrl: string, lang: Lang) {
  const homeUrl = lang === 'en' ? `${SITE_URL}/en/` : `${SITE_URL}/`;
  const projectsUrl = `${homeUrl}#projects`;

  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'es' ? 'Inicio' : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: lang === 'es' ? 'Proyectos' : 'Projects',
        item: projectsUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: projectName,
        item: currentUrl,
      },
    ],
  };
}

/**
 * Genera el JSON-LD Graph completo para la página principal.
 */
export function generateHomepageLdJson(lang: Lang, currentUrl: string, skillNames: string[] = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(lang, skillNames),
      buildWebSiteSchema(lang),
      buildProfilePageSchema(currentUrl, lang),
    ],
  };
}

/**
 * Genera el JSON-LD Graph para una página de detalle de proyecto.
 */
export function generateProjectPageLdJson(
  project: CollectionEntry<'projects'>,
  lang: Lang,
  currentUrl: string
) {
  const data = project.data[lang] ?? project.data.es;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(lang),
      buildWebSiteSchema(lang),
      buildProjectSchema(project, lang, currentUrl),
      buildProjectBreadcrumbs(data.name, currentUrl, lang),
    ],
  };
}
