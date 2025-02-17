import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { newsletterFormSchema, type NewsletterFormData, type FormState } from '../../types/forms';
import { formatLogTimestamp } from '../../utils/logging';

const INITIAL_STATE: FormState = {
  isSubmitting: false,
  isSuccess: false,
  error: null,
};

export const NewsletterForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ ...INITIAL_STATE, isSubmitting: true });
    const timestamp = formatLogTimestamp(new Date());
    
    console.log(`[${timestamp}] 📧 Iniciando suscripción al newsletter...`);

    try {
      const data = newsletterFormSchema.parse({ email });
      console.log(`[${timestamp}] ✓ Email validado: ${data.email}`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: 'Nueva suscripción al newsletter',
          from_name: 'Newsletter Subscription',
          email: data.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`[${timestamp}] ✅ Suscripción exitosa para: ${data.email}`);
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
        });
        setEmail('');
      } else {
        console.error(`[${timestamp}] ❌ Error en la respuesta del servidor:`, result.message);
        throw new Error(result.message || 'Error al procesar la suscripción');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error(`[${timestamp}] ❌ Error al procesar la suscripción:`, errorMessage);
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2" noValidate>
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="w-full px-4 py-2 rounded-lg bg-primary-800/50 border border-primary-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
          aria-describedby="newsletter-error newsletter-success"
          disabled={formState.isSubmitting}
          required
        />
      </div>
      <Button
        type="submit"
        variant="secondary"
        isLoading={formState.isSubmitting}
        disabled={formState.isSubmitting}
      >
        Suscribirse
      </Button>
      
      {formState.error && (
        <p id="newsletter-error" className="text-error-200 text-sm mt-2" role="alert">
          {formState.error}
        </p>
      )}
      {formState.isSuccess && (
        <p id="newsletter-success" className="text-success-200 text-sm mt-2" role="alert">
          ¡Gracias por suscribirte! Revisa tu correo para confirmar la suscripción.
        </p>
      )}
    </form>
  );
};