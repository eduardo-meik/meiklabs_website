import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import projects from '../content/projects.json';

const ProjectEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.projects.find(p => p.id === id);

  if (!project) {
    return (
      <PageLayout title="Proyecto no encontrado" description="El proyecto solicitado no existe">
        <div className="py-12 text-center">
          <h1 className="text-2xl font-display font-bold text-neutral-dark mb-4">
            Proyecto no encontrado
          </h1>
          <Link to="/proyectos" className="text-primary hover:text-primary/80">
            Ver todos los proyectos
          </Link>
        </div>
      </PageLayout>
    );
  }

  const relatedProjects = projects.projects
    .filter(p => p.id !== id && p.category === project.category)
    .slice(0, 2);

  return (
    <PageLayout
      title={project.title}
      description={project.description}
    >
      <article className="py-12">
        {/* Back to Projects */}
        <div className="mb-8">
          <Link
            to="/proyectos"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Proyectos
          </Link>
        </div>

        {/* Project Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden mb-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <img
                  src={project.image}
                  alt="Detalle del proyecto"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </Card>
              <Card className="p-4">
                <img
                  src={project.image}
                  alt="Detalle del proyecto"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </Card>
            </div>
          </div>

          <div>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-4">
              {project.category}
            </div>
            <h1 className="text-4xl font-display font-bold text-neutral-dark mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {project.description}
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                  Desafío
                </h2>
                <p className="text-gray-600">
                  {project.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                  Solución
                </h2>
                <p className="text-gray-600">
                  {project.solution}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                  Tecnologías Utilizadas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <section className="mb-16">
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-6">
                Resultados del Proyecto
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {project.results.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-6 bg-neutral-light rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">{metric.label}</span>
                      {metric.change > 0 ? (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="text-3xl font-display font-bold text-neutral-dark">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {project.results.testimonial && (
                <div className="mt-8">
                  <blockquote className="relative p-6 bg-primary/5 rounded-lg">
                    <p className="text-lg text-gray-600 italic mb-4">
                      "{project.results.testimonial.quote}"
                    </p>
                    <footer>
                      <div className="font-display font-bold text-neutral-dark">
                        {project.results.testimonial.author}
                      </div>
                      <div className="text-gray-500">
                        {project.results.testimonial.role}
                      </div>
                    </footer>
                  </blockquote>
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* Project Inquiry */}
        <section className="mb-16">
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-6">
                ¿Interesado en un proyecto similar?
              </h2>
              <form className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Cuéntenos sobre su proyecto..."
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" variant="primary">
                    Enviar Consulta
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-neutral-dark mb-6">
              Proyectos Similares
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Card key={relatedProject.id} variant="hover" padding="none">
                  <Link to={`/proyectos/${relatedProject.id}`}>
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-neutral-dark mb-3">
                        {relatedProject.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedProject.description}
                      </p>
                      <div className="flex items-center text-primary">
                        Ver Proyecto
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>
    </PageLayout>
  );
};

export default ProjectEntry;