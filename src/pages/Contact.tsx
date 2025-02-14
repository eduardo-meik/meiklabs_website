import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, Github, MessageSquare } from 'lucide-react';
import { useState, useCallback } from 'react';
import { z } from 'zod';
import contact from '../content/contact.json';
import type { ContactInfo } from '../types';

// Schema de validación
const contactSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  company: z.string().optional(),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'Asunto demasiado corto'),
  message: z.string().min(20, 'Mensaje demasiado corto'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const contactInfo = contact as ContactInfo;
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: null });
    
    try {
      // Validar datos
      const validatedData = contactSchema.parse(formData);
      
      // console.log('Enviando formulario:', validatedData);
      
      // Enviar datos al servidor
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });
      
      let result;
      try {
        result = await response.json();
      } catch (err) {
        throw new Error('Error al procesar la respuesta del servidor');
      }
      
      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar el mensaje');
      }
      
      // Éxito
      console.log('Respuesta del servidor:', result);
      setSubmitStatus({
        type: 'success',
        message: result.message || 'Mensaje enviado exitosamente. Nos pondremos en contacto pronto.'
      });
      
      // Limpiar formulario
      setFormData({
        name: '',
        company: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      
      if (error instanceof z.ZodError) {
        // Error de validación
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
        setSubmitStatus({
          type: 'error',
          message: 'Por favor, corrija los errores en el formulario.'
        });
      } else {
        // Error de servidor u otro
        setSubmitStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'Error al enviar el mensaje'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <PageLayout
      title="Contacto"
      description="Póngase en contacto con MEIK LABS para consultas sobre nuestros servicios"
    >
      <div className="py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-dark text-center mb-6">
          Contacte con Nosotros
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Estamos aquí para responder a sus preguntas y discutir cómo podemos ayudar a su empresa.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-dark mb-2">
                Teléfono / WhatsApp
              </h3>
              <div className="space-y-2">
                <a
                  href={`tel:${contactInfo.contact.phone}`}
                  className="block text-gray-600 hover:text-primary"
                >
                  {contactInfo.contact.phone}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.contact.whatsapp.replace(/\D/g, '')}`}
                  className="inline-flex items-center text-gray-600 hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  WhatsApp
                </a>
              </div>
            </div>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-dark mb-2">
                Email
              </h3>
              <p className="text-gray-600">
                <a href={`mailto:${contactInfo.contact.email}`} className="hover:text-primary">
                  {contactInfo.contact.email}
                </a>
              </p>
            </div>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-dark mb-2">
                Horario
              </h3>
              <p className="text-gray-600">
                {contactInfo.schedule.weekdays}
                <br />
                {contactInfo.schedule.weekend}
              </p>
            </div>
          </Card>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4 mb-12">
          <a
            href={contactInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href={contactInfo.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href={contactInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <div id="contact-form" className="p-8">
              <h2 className="text-2xl font-display font-bold text-neutral-dark mb-6">
                Envíenos un Mensaje
              </h2>
              
              {submitStatus.message && (
                <div className={`p-4 rounded-lg mb-6 ${
                  submitStatus.type === 'success' 
                    ? 'bg-success-50 text-success-700 border border-success-200'
                    : 'bg-error-50 text-error-700 border border-error-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.name ? 'border-error-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-error-600">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.email ? 'border-error-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-error-600">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.subject ? 'border-error-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-error-600">{errors.subject}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.message ? 'border-error-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-error-600">{errors.message}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full sm:w-auto"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </Card>

          <Card padding="none">
            <div className="h-full min-h-[400px] bg-neutral-light rounded-lg">
              <div className="w-full h-full">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-display font-bold text-lg text-neutral-dark mb-2">
                      Nuestra Ubicación
                    </h3>
                    <p className="text-gray-600">
                      {contactInfo.company.address.street}
                      <br />
                      {contactInfo.company.address.city}, {contactInfo.company.address.country}
                      <br />
                      {contactInfo.company.address.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;