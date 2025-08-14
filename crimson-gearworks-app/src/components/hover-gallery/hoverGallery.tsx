import Project, { ProjectItem } from '@/components/project/project';
import stylesHG from '@/styles/hoverGallery.module.css';

export default function HoverGallery({
  projects,
}: {
  projects: ProjectItem[];
}) {
  return (
    <section className={stylesHG.section}>
      <div className={stylesHG.gallery}>
        {projects.map((project, idx) => (
          <Project key={`${project.src}-${idx}`} project={project} />
        ))}
      </div>
    </section>
  );
}