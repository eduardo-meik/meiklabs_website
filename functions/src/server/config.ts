//functions/src/server/config.ts
import { z } from 'zod';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

// In CommonJS, __dirname is available automatically.
// Since this file is located in functions/src/server, we go two levels up to reach the root folder.
const envPath = resolve(__dirname, '..', '..', '.env');

// Load environment variables from the .env file at the root of the project.
loadEnv({ path: envPath });

const envSchema = z.object({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_SECURE: z.string().transform(value => value === 'true').default('false'),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SUPPORT_EMAIL: z.string().email(),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('5'),
});

// Check for required environment variables
const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SUPPORT_EMAIL'];
const missingVars = requiredVars.filter(key => !process.env[key]);
const envFileExists = existsSync(envPath);

if (missingVars.length > 0) {
  console.error('Error: Variables de entorno faltantes:', missingVars.join(', '));
  if (!envFileExists) {
    console.error('No se encontró el archivo .env');
    console.error('Por favor, cree un archivo .env en la raíz del proyecto con las siguientes variables:');
  } else {
    console.error('Por favor, verifique que las siguientes variables estén configuradas en el archivo .env:');
  }
  console.error('\n' + requiredVars.map(v => `${v}="valor"`).join('\n') + '\n');
  process.exit(1);
}

// Validate environment variables
const env = envSchema.parse(process.env);

export const config = {
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    }
  },
  email: {
    support: env.SUPPORT_EMAIL,
    from: `MEIK LABS <${env.SUPPORT_EMAIL}>`,
  },
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
  },
} as const;

