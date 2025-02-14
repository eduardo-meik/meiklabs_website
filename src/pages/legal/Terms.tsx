import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';

const Terms: React.FC = () => {
  return (
    <PageLayout
      title="Términos de Uso"
      description="Términos y condiciones de uso de MEIK LABS"
    >
      <div className="py-12">
        <Card className="prose prose-lg max-w-none">
          <div className="p-8">
            <h1 className="text-4xl font-display font-bold text-neutral-dark mb-8">
              Términos de Uso
            </h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="text-gray-600 mb-4">
                Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice este sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                2. Uso del Sitio
              </h2>
              <p className="text-gray-600 mb-4">
                Este sitio web está destinado únicamente a proporcionar información general sobre MEIK LABS y sus servicios. No debe utilizarse con fines ilegales o prohibidos por estos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                3. Propiedad Intelectual
              </h2>
              <p className="text-gray-600 mb-4">
                Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes y software, está protegido por derechos de autor y otras leyes de propiedad intelectual.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                4. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-600 mb-4">
                MEIK LABS no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar este sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                5. Modificaciones
              </h2>
              <p className="text-gray-600">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Terms;