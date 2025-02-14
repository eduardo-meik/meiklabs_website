import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import projects from '../content/projects.json';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <PageLayout
      title="Proyectos"
      description="Descubra nuestros proyectos más innovadores en IA y Gemelos Digitales"
    >
      <div className="py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-dark text-center mb-6">
          Nuestros Proyectos
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Explore cómo nuestras soluciones están transformando industrias y creando valor real.
        </p>

        <div className="grid gap-12">
          {projects.projects.map((project) => (
            <Link to={`/proyectos/${project.id}`} key={project.id}>
              <Card variant="hover" padding="none">
              <div className="grid md:grid-cols-2">
                <div className="aspect-w-16 aspect-h-9 md:aspect-none md:h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-display font-bold text-neutral-dark mb-2">
                    {project.title}
                  </h2>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-4">
                    {project.category}
                  </div>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-neutral-dark mb-3">
                        Resultados Clave
                      </h3>
                      <div className="grid gap-4">
                        {project.results.metrics.map((metric) => (
                          <div key={metric.label} className="flex items-center justify-between p-3 bg-neutral-light rounded-lg">
                            <span className="text-gray-600">{metric.label}</span>
                            <div className="flex items-center">
                              <span className="font-bold text-neutral-dark">
                                {metric.value}
                              </span>
                              {metric.change > 0 ? (
                                <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                              ) : (
                                <TrendingDown className="ml-2 h-4 w-4 text-red-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {project.results.testimonial && (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600">
                        "{project.results.testimonial.quote}"
                        <footer className="mt-2 text-sm">
                          <strong className="text-neutral-dark">
                            {project.results.testimonial.author}
                          </strong>
                          <br />
                          {project.results.testimonial.role}
                        </footer>
                      </blockquote>
                    )}

                    <div>
                      <h3 className="font-display font-bold text-lg text-neutral-dark mb-3">
                        Tecnologías Utilizadas
                      </h3>
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
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;