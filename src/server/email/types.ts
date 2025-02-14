import { z } from 'zod';

// Schema Definitions
export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  company: z.string().optional(),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'Asunto demasiado corto'),
  message: z.string().min(20, 'Mensaje demasiado corto'),
});

// Type Definitions
export type NewsletterSubscription = z.infer<typeof newsletterSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;

export interface EmailResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface EmailMetrics {
  sentCount: number;
  errorCount: number;
  lastSentAt?: Date;
  lastErrorAt?: Date;
}

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  metrics: EmailMetrics;
  timestamp: Date;
}