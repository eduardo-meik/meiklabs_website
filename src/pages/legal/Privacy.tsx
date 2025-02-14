import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';

const Privacy: React.FC = () => {
  return (
    <PageLayout
      title="Política de Privacidad"
      description="Política de privacidad y protección de datos de MEIK LABS"
    >
      <div className="py-12">
        <Card className="prose prose-lg max-w-none">
          <div className="p-8">
            <h1 className="text-4xl font-display font-bold text-neutral-dark mb-8">
              Política de Privacidad
            </h1>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                1. Recopilación de Información
              </h2>
              <p className="text-gray-600 mb-4">
                Recopilamos información cuando usted:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Visita nuestro sitio web</li>
                <li>Se registra en nuestro sitio</li>
                <li>Completa un formulario</li>
                <li>Se suscribe a nuestro boletín</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                2. Uso de la Información
              </h2>
              <p className="text-gray-600 mb-4">
                La información que recopilamos se utiliza para:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Personalizar su experiencia</li>
                <li>Mejorar nuestro sitio web</li>
                <li>Enviar correos electrónicos periódicos</li>
                <li>Responder a sus consultas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                3. Protección de la Información
              </h2>
              <p className="text-gray-600 mb-4">
                Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal cuando ingresa, envía o accede a su información personal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                4. Sus Derechos
              </h2>
              <p className="text-gray-600 mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Acceder a sus datos personales</li>
                <li>Rectificar sus datos</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al procesamiento de sus datos</li>
              </ul>
            </section>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Privacy;