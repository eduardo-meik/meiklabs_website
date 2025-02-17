import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export const newsletterFormSchema = z.object({
  email: z.string().email('Email inválido'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}