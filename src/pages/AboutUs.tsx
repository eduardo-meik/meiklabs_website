import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import team from '../content/team.json';
import { Button } from '../components/ui/Button';
import { ArrowRight, Award, Target, Users, Lightbulb, Linkedin } from 'lucide-react';
import { Hero } from '../components/ui/Hero';

const AboutUs: React.FC = () => {
  return (
    <PageLayout
      title="Nosotros"
      description="Conozca al equipo detrás de MEIK LABS y nuestra misión de transformar el futuro tecnológico"
    >
      <Hero
        title="Innovando para un Futuro Mejor"
        subtitle="En MEIK LABS, combinamos experiencia técnica con visión innovadora para transformar el panorama tecnológico."
        backgroundImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
        overlayOpacity={0.4}
        height="lg"
        className="-mt-16"
        ctaButton={{
          text: "Trabaja con Nosotros",
          href: "/contacto",
          variant: "secondary"
        }}
      />

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-neutral-dark mb-6">
                Nuestra Misión
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Impulsar la innovación tecnológica a través de soluciones de IA y Gemelos Digitales que transformen la manera en que las empresas operan y crecen.
              </p>
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-neutral-dark mb-2">
                      Visión Clara
                    </h3>
                    <p className="text-gray-600">
                      Ser líderes globales en la implementación de tecnologías transformadoras.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-neutral-dark mb-2">
                      Excelencia
                    </h3>
                    <p className="text-gray-600">
                      Compromiso inquebrantable con la calidad y la innovación.
                    </p>
                  </div>
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
                <div className="text-4xl font-display font-bold text-primary mb-2">15+</div>
                <div className="text-gray-600">Años de Experiencia Combinada</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-dark mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y relaciones.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Colaboración',
                description: 'Trabajamos juntos para alcanzar objetivos extraordinarios.'
              },
              {
                icon: Lightbulb,
                title: 'Innovación',
                description: 'Buscamos constantemente nuevas formas de resolver desafíos.'
              },
              {
                icon: Target,
                title: 'Excelencia',
                description: 'Nos esforzamos por superar las expectativas en cada proyecto.'
              }
            ].map((value) => (
              <Card key={value.title} className="text-center">
                <div className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-dark mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
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
            {team.members.map((member) => (
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
                  <div className="flex items-center justify-center gap-2 mb-4">
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

export default AboutUs;