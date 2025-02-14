import express from 'express';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { EmailService } from './email/service';
import { EmailDiagnostics } from './email/diagnostics';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    error: 'Demasiadas solicitudes. Por favor, intente más tarde.',
  },
});

// Endpoint for sending test email
app.post('/api/email/test', limiter, async (req, res) => {
  try {
    const emailService = new EmailService(); // Create an instance
    const result = await emailService.sendTestEmail();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// Endpoint for contact form
app.post('/api/contact', limiter, async (req, res) => {
  try {
    const { name, company, email, subject, message } = req.body;
    console.log('Recibida solicitud de contacto:', { name, email, subject });

    // Create an instance of EmailService
    const emailService = new EmailService();
    const result = await emailService.sendContactForm({ 
      name, 
      company, 
      email, 
      subject, 
      message 
    });
    console.log('Solicitud procesada exitosamente:', result);
    res.json(result);
  } catch (error) {
    console.error('Error en endpoint /api/contact:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// **New Endpoint for Newsletter Subscription**
app.post('/api/newsletter/subscribe', limiter, async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Recibida solicitud de suscripción al newsletter:', { email });

    // Create an instance of EmailService
    const emailService = new EmailService();
    const result = await emailService.subscribeToNewsletter(email);
    console.log('Suscripción procesada exitosamente:', result);
    res.json(result);
  } catch (error) {
    console.error('Error en endpoint /api/newsletter/subscribe:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// Endpoint for email diagnostics
app.get('/api/email/diagnostics', async (req, res) => {
  try {
    const diagnosticResult = await EmailDiagnostics.runFullDiagnostic();
    res.json(diagnosticResult);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
