import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Mail, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';
import { Logo } from '../ui/Logo';
import contact from '../../content/contact.json';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { company, contact: contactInfo, social, schedule } = contact;

  const handleLegalLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-900 text-white py-12 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-gray-300">
                Pioneros en el futuro de la IA y tecnologías de Gemelos Digitales.
              </p>
              <div className="flex space-x-4">
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/proyectos" className="text-gray-300 hover:text-white transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/investigacion" className="text-gray-300 hover:text-white transition-colors">
                  Investigación
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-300 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="text-gray-300">
                  {company.address.street}, {company.address.city}, {company.address.country}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-secondary" />
                <a href={`tel:${contactInfo.phone}`} className="text-gray-300 hover:text-white">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-secondary" />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-white">
                  {contactInfo.email}
                </a>
              </li>
              <li className="text-gray-300">
                <p>{schedule.weekdays}</p>
                <p>{schedule.weekend}</p>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">
                <span
                  onClick={() => handleLegalLinkClick('/terms')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Términos de Uso
                </span>
              </li>
              <li className="cursor-pointer">
                <span
                  onClick={() => handleLegalLinkClick('/privacy')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Política de Privacidad
                </span>
              </li>
              <li className="cursor-pointer">
                <span
                  onClick={() => handleLegalLinkClick('/cookies')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Política de Cookies
                </span>
              </li>
              <li className="cursor-pointer">
                <span
                  onClick={() => handleLegalLinkClick('/disclaimer')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Aviso Legal
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Mantente Informado</h3>
            <p className="text-gray-300 mb-4">
              Suscríbete a nuestro boletín para recibir las últimas actualizaciones en IA y tecnología de Gemelos Digitales.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="flex-1 px-3 py-2 rounded-lg bg-primary-800/50 border border-primary-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300">
              © {currentYear} MEIK LABS. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <span
                onClick={() => handleLegalLinkClick('/privacy')}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Política de Privacidad
              </span>
              <span
                onClick={() => handleLegalLinkClick('/terms')}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Términos de Servicio
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};