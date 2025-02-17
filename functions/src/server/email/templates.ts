export const newsletterConfirmation = (email: string) => ({
  subject: 'Bienvenido al Boletín de MEIK LABS',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4F00C4;">¡Bienvenido al Boletín de MEIK LABS!</h1>
      <p>Gracias por suscribirte a nuestro boletín. Estás a punto de recibir contenido exclusivo sobre:</p>
      <ul>
        <li>Últimas innovaciones en IA y Gemelos Digitales</li>
        <li>Casos de éxito y mejores prácticas</li>
        <li>Eventos y webinars exclusivos</li>
        <li>Recursos y guías técnicas</li>
      </ul>
      <p>
        Si en algún momento deseas darte de baja, puedes hacerlo haciendo clic 
        <a href="https://meiklabs.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #4F00C4;">aquí</a>.
      </p>
      <p>¡Gracias por ser parte de nuestra comunidad!</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #666; font-size: 12px;">
        MEIK LABS - Soluciones Tecnológicas Innovadoras<br />
        Cerro el Plomo 5931, oficina 510. Las Condes<br />
        Santiago, Chile
      </p>
    </div>
  `,
});

export const contactConfirmation = (name: string) => ({
  subject: 'Hemos recibido tu mensaje - MEIK LABS',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4F00C4;">¡Gracias por contactarnos, ${name}!</h1>
      <p>Hemos recibido tu mensaje y nuestro equipo lo revisará lo antes posible.</p>
      <p>Nos pondremos en contacto contigo dentro de las próximas 24-48 horas hábiles.</p>
      <p>Mientras tanto, te invitamos a:</p>
      <ul>
        <li>Explorar nuestro <a href="https://meiklabs.com/blog" style="color: #4F00C4;">blog</a> para conocer más sobre nuestras soluciones</li>
        <li>Seguirnos en <a href="https://linkedin.com/company/meik-io" style="color: #4F00C4;">LinkedIn</a> para las últimas actualizaciones</li>
      </ul>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #666; font-size: 12px;">
        MEIK LABS - Soluciones Tecnológicas Innovadoras<br />
        Cerro el Plomo 5931, oficina 510. Las Condes<br />
        Santiago, Chile
      </p>
    </div>
  `,
});

export const supportNotification = (name: string, email: string, company: string | undefined, subject: string, message: string) => ({
  subject: `Nuevo mensaje de contacto: ${subject}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4F00C4;">Nuevo Mensaje de Contacto</h1>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
        <p><strong>Nombre:</strong> ${name}</p>
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p>
        <a href="mailto:${email}" style="color: #4F00C4;">Responder al cliente</a>
      </p>
    </div>
  `,
});

export const testEmail = () => ({
  subject: 'Prueba de Sistema de Correo - MEIK LABS',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4F00C4;">Prueba de Sistema de Correo</h1>
      <p>Este es un correo de prueba para verificar el funcionamiento del sistema de correo electrónico de MEIK LABS.</p>
      <p>Si estás recibiendo este mensaje, significa que el sistema está funcionando correctamente.</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #666; font-size: 12px;">
        MEIK LABS - Soluciones Tecnológicas Innovadoras<br />
        Cerro el Plomo 5931, oficina 510. Las Condes<br />
        Santiago, Chile
      </p>
    </div>
  `,
});