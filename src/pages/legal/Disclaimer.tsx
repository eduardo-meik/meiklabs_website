import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';

const Disclaimer: React.FC = () => {
  return (
    <PageLayout
      title="Aviso Legal"
      description="Aviso legal y descargo de responsabilidad de MEIK LABS"
    >
      <div className="py-12">
        <Card className="prose prose-lg max-w-none">
          <div className="p-8">
            <h1 className="text-4xl font-display font-bold text-neutral-dark mb-8">
              Aviso Legal
            </h1>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                1. Información General
              </h2>
              <p className="text-gray-600 mb-4">
                Este aviso legal regula el uso del sitio web de MEIK LABS. El mero acceso al sitio web implica el conocimiento y la aceptación de este aviso legal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                2. Responsabilidad
              </h2>
              <p className="text-gray-600 mb-4">
                MEIK LABS no se hace responsable de los errores u omisiones en la información proporcionada en este sitio web. La información se proporciona "tal cual" sin garantía de ningún tipo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                3. Propiedad Intelectual
              </h2>
              <p className="text-gray-600 mb-4">
                Todos los derechos de propiedad intelectual del contenido de este sitio web, su diseño gráfico y códigos son titularidad exclusiva de MEIK LABS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                4. Legislación Aplicable
              </h2>
              <p className="text-gray-600">
                Este aviso legal se rige por la legislación chilena. Cualquier disputa que pueda surgir en relación con este sitio web estará sujeta a la jurisdicción exclusiva de los tribunales de Santiago de Chile.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Disclaimer;