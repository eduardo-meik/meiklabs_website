import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../config';
import * as templates from './templates';
import validator from 'validator';
import { LRUCache } from 'lru-cache';
import { performance } from 'perf_hooks';
import { z } from 'zod'; // Added for error handling in handleError
import { 
  NewsletterSubscription, 
  ContactFormData, 
  EmailResult, 
  EmailMetrics,
  HealthCheckResult,
  newsletterSchema,
  contactSchema
} from './types';

/**
 * EmailService: Servicio de gestión de correos electrónicos
 * 
 * Características:
 * - Validación y sanitización de inputs
 * - Caché de plantillas
 * - Métricas y monitoreo
 * - Rate limiting por dominio
 * - Reintentos automáticos
 * - Logging estructurado
 */
export class EmailService {
  private transporter: Transporter;
  private templateCache: LRUCache<string, any>;
  private rateLimiter: Map<string, number>;
  private metrics: EmailMetrics = {
    sentCount: 0,
    errorCount: 0
  };

  constructor() {
    // Inicializar transporter con retry
    this.transporter = nodemailer.createTransport({
      ...config.smtp,
      secure: config.smtp.secure,
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
      // Configuración de seguridad adicional
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2'
      }
    });

    // Configurar caché de plantillas
    this.templateCache = new LRUCache({
      max: 100,
      ttl: 1000 * 60 * 5 // 5 minutos
    });

    // Inicializar rate limiter
    this.rateLimiter = new Map();

    // Configurar cleanup periódico
    setInterval(() => this.cleanup(), 1000 * 60 * 15); // 15 minutos
  }

  /**
   * Suscribir al newsletter
   * @param email Email del suscriptor
   */
  public async subscribeToNewsletter(email: string): Promise<EmailResult> {
    const startTime = performance.now();
    try {
      console.log('subscribeToNewsletter called with:', email);
      
      // Validate and sanitize email
      const { email: validatedEmail } = await newsletterSchema.parseAsync({ email });
      console.log('Email validated:', validatedEmail);
      
      const sanitizedEmail = this.sanitizeEmail(validatedEmail);
      console.log('Email sanitized:', sanitizedEmail);
      
      // Rate limit check
      if (this.isRateLimited(sanitizedEmail)) {
        console.warn('Rate limit exceeded for email:', sanitizedEmail);
        throw new Error('Demasiadas solicitudes. Por favor, intente más tarde.');
      }
      
      // Get template (with caching)
      const template = this.getCachedTemplate('newsletter', () => {
        console.log('Generating new newsletter template for:', sanitizedEmail);
        return templates.newsletterConfirmation(sanitizedEmail);
      });
      console.log('Newsletter template:', template);
      
      // Send email
      await this.sendEmail({
        from: config.email.from,
        to: sanitizedEmail,
        ...template,
      });
      
      this.updateMetrics('sent');
      this.logSuccess('newsletter', startTime);
      console.log('Newsletter email sent successfully to:', sanitizedEmail);
      
      return { 
        success: true,
        message: 'Suscripción exitosa'
      };
    } catch (error) {
      this.updateMetrics('error');
      this.logError('newsletter', error, startTime);
      console.error('Error in subscribeToNewsletter:', error);
      throw this.handleError(error);
    }
  }
  
  /**
   * Enviar formulario de contacto
   * @param data Datos del formulario
   */
  public async sendContactForm(data: ContactFormData): Promise<EmailResult> {
    const startTime = performance.now();
    try {
      console.log('Procesando formulario de contacto:', data);
      
      // Validar datos
      const validated = await contactSchema.parseAsync(data);
      console.log('Datos validados correctamente');

      // Sanitizar datos
      const sanitizedData = this.sanitizeContactData(validated);

      // Verificar rate limit
      if (this.isRateLimited(sanitizedData.email)) {
        throw new Error('Demasiadas solicitudes. Por favor, intente más tarde.');
      }

      console.log('Enviando emails...');

      // Enviar confirmación al cliente
      const clientTemplate = this.getCachedTemplate('contact', () =>
        templates.contactConfirmation(sanitizedData.name)
      );
      await this.sendEmail({
        from: config.email.from,
        to: sanitizedData.email,
        ...clientTemplate
      });

      // Notificar al equipo de soporte
      const supportTemplate = templates.supportNotification(
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.company,
        sanitizedData.subject,
        sanitizedData.message
      );
      await this.sendEmail({
        from: config.email.from,
        to: config.email.support,
        ...supportTemplate
      });

      this.updateMetrics('sent', 2); // 2 emails enviados
      this.logSuccess('contact', startTime);

      console.log('Emails enviados exitosamente');

      return { 
        success: true,
        message: 'Mensaje enviado exitosamente'
      };
    } catch (error) {
      this.updateMetrics('error', 1);
      this.logError('contact', error, startTime);
      throw this.handleError(error);
    }
  }

  /**
   * Enviar email de prueba
   */
  public async sendTestEmail(): Promise<EmailResult> {
    const startTime = performance.now();
    try {
      const template = templates.testEmail();
      await this.sendEmail({
        from: config.email.from,
        to: config.email.support,
        ...template
      });

      this.updateMetrics('sent');
      this.logSuccess('test', startTime);

      return { 
        success: true,
        message: '¡Correo electrónico enviado exitosamente!'
      };
    } catch (error) {
      this.updateMetrics('error');
      this.logError('test', error, startTime);
      throw this.handleError(error);
    }
  }

  /**
   * Verificar estado del servicio
   */
  public async healthCheck(): Promise<HealthCheckResult> {
    try {
      await this.transporter.verify();
      return {
        status: 'healthy',
        message: 'Servicio funcionando correctamente',
        metrics: this.metrics,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: error instanceof Error ? error.message : 'Error desconocido',
        metrics: this.metrics,
        timestamp: new Date()
      };
    }
  }

  /**
   * Métodos privados de utilidad
   */
  private sanitizeEmail(email: string): string {
    const sanitized = validator.normalizeEmail(email);
    if (!sanitized) throw new Error('Email inválido');
    return sanitized;
  }

  private sanitizeContactData(data: ContactFormData) {
    return {
      ...data,
      email: this.sanitizeEmail(data.email),
      name: validator.escape(data.name),
      company: data.company ? validator.escape(data.company) : undefined,
      subject: validator.escape(data.subject),
      message: validator.escape(data.message)
    };
  }

  private isRateLimited(email: string): boolean {
    const domain = email.split('@')[1];
    const now = Date.now();
    const lastAttempt = this.rateLimiter.get(domain) || 0;
    
    if (now - lastAttempt < config.rateLimit.windowMs) {
      return true;
    }
    
    this.rateLimiter.set(domain, now);
    return false;
  }

  private getCachedTemplate(key: string, generator: () => any) {
    let template = this.templateCache.get(key);
    if (!template) {
      template = generator();
      this.templateCache.set(key, template);
    }
    return template;
  }

  private async sendEmail(options: nodemailer.SendMailOptions): Promise<void> {
    try {
      console.log('📩 Enviando correo a:', options.to);
      console.log('📨 Asunto:', options.subject, '(Conexión segura:', config.smtp.secure ? 'Sí' : 'No', 'Puerto:', config.smtp.port,')');
      
      // Verificar conexión antes de enviar
      await this.transporter.verify();
      
      const result = await this.transporter.sendMail(options);
      console.log('✅ Correo enviado con éxito:', result.response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      console.error('❌ Error al enviar email:', {
        error: errorMessage,
        secure: config.smtp.secure,
        host: config.smtp.host,
        port: config.smtp.port
      });
      throw new Error(`Error al enviar email: ${errorMessage}`);
    }
  }

  private updateMetrics(type: 'sent' | 'error', count: number = 1) {
    if (type === 'sent') {
      this.metrics.sentCount += count;
      this.metrics.lastSentAt = new Date();
    } else {
      this.metrics.errorCount += count;
      this.metrics.lastErrorAt = new Date();
    }
  }

  private logSuccess(operation: string, startTime: number) {
    const duration = performance.now() - startTime;
    console.log({
      level: 'info',
      operation,
      duration,
      timestamp: new Date().toISOString()
    });
  }

  private logError(operation: string, error: unknown, startTime: number) {
    const duration = performance.now() - startTime;
    console.error({
      level: 'error',
      operation,
      error: error instanceof Error ? error.message : 'Error desconocido',
      duration,
      timestamp: new Date().toISOString()
    });
  }

  private handleError(error: unknown): Error {
    if (error instanceof z.ZodError) {
      return new Error('Datos de entrada inválidos: ' + error.errors[0].message);
    }
    return error instanceof Error ? error : new Error('Error desconocido');
  }

  private cleanup() {
    this.rateLimiter.clear();
    this.templateCache.clear();
  }
}
