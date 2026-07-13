import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects, getProject } from '../../lib/projects';
import { CaseStudy } from './CaseStudy';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'KUROSEI® — Work' };
  return {
    title: `${project.title} ${project.subtitle} — KUROSEI®`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudy slug={slug} />;
}
