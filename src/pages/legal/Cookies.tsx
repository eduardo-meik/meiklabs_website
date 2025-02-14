import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';

const Cookies: React.FC = () => {
  return (
    <PageLayout
      title="Política de Cookies"
      description="Información sobre el uso de cookies en MEIK LABS"
    >
      <div className="py-12">
        <Card className="prose prose-lg max-w-none">
          <div className="p-8">
            <h1 className="text-4xl font-display font-bold text-neutral-dark mb-8">
              Política de Cookies
            </h1>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                1. ¿Qué son las Cookies?
              </h2>
              <p className="text-gray-600 mb-4">
                Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo para almacenar información sobre sus preferencias o actividad de navegación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                2. Tipos de Cookies que Utilizamos
              </h2>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Cookies esenciales para el funcionamiento del sitio</li>
                <li>Cookies de análisis y rendimiento</li>
                <li>Cookies de funcionalidad</li>
                <li>Cookies de publicidad y seguimiento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                3. Control de Cookies
              </h2>
              <p className="text-gray-600 mb-4">
                Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su computadora y puede configurar la mayoría de los navegadores para evitar que se coloquen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
                4. Más Información
              </h2>
              <p className="text-gray-600">
                Para obtener más información sobre cómo utilizamos las cookies, póngase en contacto con nosotros a través de nuestro formulario de contacto.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Cookies;