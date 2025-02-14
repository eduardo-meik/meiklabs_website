import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Boxes, FlaskRound as Flask, ChevronRight, Linkedin } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Hero } from '../components/ui/Hero';
import services from '../content/services.json';
import projects from '../content/projects.json';
import testimonials from '../content/testimonials.json';
import team from '../content/team.json';

const iconMap = {
  Bot: Bot,
  Boxes: Boxes,
  Flask: Flask,
};

export const Home: React.FC = () => {
  return (
    <PageLayout
      title="Inicio"
      description="MEIK LABS - Pioneros en el futuro de la IA y tecnologías de Gemelos Digitales"
    >
      <Hero
        title="Transformando el Futuro con IA y Gemelos Digitales"
        subtitle="Soluciones tecnológicas innovadoras que impulsan la transformación digital de su empresa."
        backgroundImage="https://images.unsplash.com/photo-T9rKvI3N0NM?auto=format&fit=crop&q=80"
        overlayOpacity={0.4}
        height="lg"
        className="-mt-16"
        ctaButton={{
          text: "Comienza Ahora",
          href: "/contacto",
          variant: "secondary"
        }}
        secondaryButton={{
          text: "Explorar Servicios",
          href: "/servicios",
          variant: "outline"
        }}
      />

      {/* Services Section */}
      <section className="py-24 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-dark mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soluciones tecnológicas avanzadas diseñadas para impulsar la innovación y la eficiencia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.services.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <Card
                  key={service.id}
                  variant="interactive"
                  className="flex flex-col"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="text-xl font-display font-bold text-neutral-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.shortDescription}
                    </p>
                    <Link
                      to={`/servicios#${service.id}`}
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      Saber más
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-dark mb-4">
              Proyectos Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra cómo nuestras soluciones están transformando industrias.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.projects.slice(0, 2).map((project) => (
              <Card key={project.id} variant="hover" padding="none">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-neutral-dark mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/proyectos/${project.id}`}
                    className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    Ver Proyecto
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-dark mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Historias de éxito de empresas que han confiado en nosotros.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative">
                <div className="flex items-start gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.representative.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <blockquote className="text-gray-600 mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <cite className="not-italic">
                      <div className="font-display font-bold text-neutral-dark">
                        {testimonial.representative.name}
                      </div>
                      <div className="text-gray-500">
                        {testimonial.representative.role}, {testimonial.client}
                      </div>
                    </cite>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Us Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-4xl font-display font-bold text-neutral-dark mb-6">
                Impulsando la Innovación Digital
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                En MEIK LABS, nos dedicamos a transformar el futuro de las empresas a través de soluciones tecnológicas innovadoras y accesibles.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-display font-bold text-primary mb-2">15+</div>
                  <div className="text-gray-600">Años de Experiencia</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-display font-bold text-primary mb-2">50+</div>
                  <div className="text-gray-600">Proyectos Exitosos</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-display font-bold text-primary mb-2">30+</div>
                  <div className="text-gray-600">Clientes Satisfechos</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-display font-bold text-primary mb-2">25+</div>
                  <div className="text-gray-600">Expertos en el Equipo</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                alt="Equipo de MEIK LABS colaborando"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-display font-bold text-primary mb-2">95%</div>
                <div className="text-gray-600">Tasa de Retención de Clientes</div>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-2xl text-white p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold mb-6">
                ¿Listo para Transformar su Negocio?
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Descubra cómo nuestras soluciones de IA y Gemelos Digitales pueden impulsar su empresa hacia el futuro.
              </p>
              <Button href="/contacto" variant="secondary" size="lg" className="smooth-scroll">
                Contacte con Nosotros
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-dark mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expertos apasionados por la innovación y la excelencia tecnológica.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.members.slice(0, 3).map((member) => (
              <Card key={member.id} variant="hover" className="text-center">
                <div className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-display font-bold text-neutral-dark mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-primary font-medium">{member.role}</p>
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};