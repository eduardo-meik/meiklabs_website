import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Bot, Boxes, FlaskRound as Flask, ChevronRight } from 'lucide-react';
import services from '../content/services.json';

const iconMap = {
  Bot: Bot,
  Boxes: Boxes,
  Flask: Flask,
};

const ServiceEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = services.services.find(s => s.id === id);

  if (!service) {
    return (
      <PageLayout title="Servicio no encontrado" description="El servicio solicitado no existe">
        <div className="py-12 text-center">
          <h1 className="text-2xl font-display font-bold text-neutral-dark mb-4">
            Servicio no encontrado
          </h1>
          <Link to="/servicios" className="text-primary hover:text-primary/80">
            Ver todos los servicios
          </Link>
        </div>
      </PageLayout>
    );
  }

  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const relatedServices = services.services
    .filter(s => s.id !== id)
    .slice(0, 2);

  return (
    <PageLayout
      title={service.title}
      description={service.description}
    >
      <article className="py-12">
        {/* Back to Services */}
        <div className="mb-8">
          <Link
            to="/servicios"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Servicios
          </Link>
        </div>

        {/* Service Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              {Icon && <Icon className="h-10 w-10 text-primary" />}
            </div>
            <h1 className="text-4xl font-display font-bold text-neutral-dark mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {service.description}
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                  Características
                </h2>
                <ul className="grid gap-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                  Tecnologías
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
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

          <div>
            <Card className="p-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-6">
                Caso de Éxito
              </h2>
              <h3 className="text-xl font-bold text-neutral-dark mb-4">
                {service.useCase.title}
              </h3>
              <p className="text-gray-600 mb-8">
                {service.useCase.description}
              </p>
              <Button variant="primary" href="/contacto">
                Consultar sobre este servicio
              </Button>
            </Card>
          </div>
        </div>

        {/* Service Inquiry */}
        <section className="mb-16">
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-6">
                ¿Interesado en este servicio?
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
                    placeholder="Cuéntenos sobre sus necesidades..."
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

        {/* Related Services */}
        <section>
          <h2 className="text-2xl font-display font-bold text-neutral-dark mb-6">
            Otros Servicios
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedServices.map((relatedService) => (
              <Card key={relatedService.id} variant="hover">
                <Link to={`/servicios/${relatedService.id}`} className="p-6 block">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {iconMap[relatedService.icon as keyof typeof iconMap] && (
                      <Icon className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-dark mb-3">
                    {relatedService.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {relatedService.shortDescription}
                  </p>
                  <div className="flex items-center text-primary">
                    Ver Servicio
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </PageLayout>
  );
};

export default ServiceEntry;