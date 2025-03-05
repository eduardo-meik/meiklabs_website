import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import services from '../content/services.json';
import projects from '../content/projects.json';
import { ClipboardCheck, HeartHandshake, GraduationCap } from 'lucide-react';

const iconMap = {
  ClipboardCheck: ClipboardCheck,
  HeartHandshake: HeartHandshake,
  GraduationCap: GraduationCap
};

const Services: React.FC = () => {
  return (
    <PageLayout
      title="Servicios"
      description="Explore nuestra gama completa de servicios de IA y Gemelos Digitales"
    >
      <div className="py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-dark text-center mb-6">
          Nuestros Servicios
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Soluciones tecnológicas avanzadas diseñadas para impulsar la innovación y la eficiencia en su empresa.
        </p>

        <div className="space-y-16">
          {services.services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Card key={service.id} className="overflow-hidden" id={service.id}>
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      {Icon && <Icon className="h-8 w-8 text-primary" />}
                    </div>
                    <h2 className="text-3xl font-display font-bold text-neutral-dark mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="space-y-4">
                      <h3 className="font-display font-bold text-lg text-neutral-dark">
                        Características
                      </h3>
                      <ul className="grid gap-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-display font-bold text-lg text-neutral-dark mb-4">
                        Tecnologías
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {service.useCase?.projectIds && service.useCase.projectIds.length > 0 && (
                      <div className="bg-neutral-light rounded-lg p-6">
                        <h3 className="font-display font-bold text-lg text-neutral-dark mb-2">
                          Casos de Éxito
                        </h3>
                        {service.useCase.projectIds.map((projectId, index) => {
                          const project = projects.projects.find(p => p.id === projectId);
                          return project && (
                            <div
                              key={projectId}
                              className={`mb-6 last:mb-0 ${
                                index !== service.useCase.projectIds.length - 1
                                  ? "border-b border-gray-300 pb-4"
                                  : ""
                              }`}
                            >
                              <h4 className="font-bold text-neutral-dark mb-2">
                                <a href={`/proyectos/${project.id}`} className="hover:underline">
                                  {project.title}
                                </a>
                              </h4>
                              <p className="text-gray-600">
                                {project.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default Services;