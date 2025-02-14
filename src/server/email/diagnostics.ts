import nodemailer from 'nodemailer';
import { config } from '../config';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export class EmailDiagnostics {
  static async checkSMTPConnection() {
    try {
      const transporter = nodemailer.createTransport(config.smtp);
      console.log('Verificando conexión SMTP segura:', config.smtp.secure);
      await transporter.verify();
      return {
        status: 'success',
        message: `Conexión SMTP ${config.smtp.secure ? 'segura' : 'no segura'} establecida correctamente`,
        secure: config.smtp.secure
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Error de conexión SMTP: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        secure: config.smtp.secure,
        details: error
      };
    }
  }

  static async checkDNSRecords() {
    try {
      const domain = config.smtp.host;
      const records = await resolveMx(domain);
      return {
        status: 'success',
        message: 'Registros MX encontrados',
        records
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Error al verificar registros DNS: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        details: error
      };
    }
  }

  static validateSMTPConfig() {
    const requiredFields = ['host', 'port', 'auth.user', 'auth.pass'];
    const missingFields = requiredFields.filter(field => {
      const parts = field.split('.');
      let value = config.smtp;
      for (const part of parts) {
        value = value[part as keyof typeof value];
        if (!value) return true;
      }
      return false;
    });

    return {
      status: missingFields.length === 0 ? 'success' : 'error',
      message: missingFields.length === 0 
        ? `Configuración SMTP válida (${config.smtp.secure ? 'Segura' : 'No segura'})`
        : `Campos faltantes en configuración SMTP: ${missingFields.join(', ')}`,
      config: {
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        secure: config.smtp.port === 465,
        user: config.smtp.auth.user
      }
    };
  }

  static async runFullDiagnostic() {
    console.log('Iniciando diagnóstico completo del sistema de correo...\n');

    // 1. Validar configuración
    console.log('1. Verificando configuración SMTP...');
    const configCheck = this.validateSMTPConfig();
    console.log(configCheck.message);
    if (configCheck.status === 'error') {
      return {
        status: 'error',
        message: 'Diagnóstico fallido: Configuración SMTP inválida',
        details: configCheck
      };
    }

    // 2. Verificar registros DNS
    console.log('\n2. Verificando registros DNS...');
    const dnsCheck = await this.checkDNSRecords();
    console.log(dnsCheck.message);

    // 3. Probar conexión SMTP
    console.log('\n3. Probando conexión SMTP...');
    const smtpCheck = await this.checkSMTPConnection();
    console.log(smtpCheck.message);

    return {
      status: smtpCheck.status === 'success' && dnsCheck.status === 'success' ? 'success' : 'error',
      configCheck,
      dnsCheck,
      smtpCheck
    };
  }
}