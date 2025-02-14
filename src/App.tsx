import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/layout/Navbar';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { lazy, Suspense } from 'react';

const BlogEntry = lazy(() => import('./pages/BlogEntry'));
const ServiceEntry = lazy(() => import('./pages/ServiceEntry'));
const ProjectEntry = lazy(() => import('./pages/ProjectEntry'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const Cookies = lazy(() => import('./pages/legal/Cookies'));
const Disclaimer = lazy(() => import('./pages/legal/Disclaimer'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
import { Footer } from './components/layout/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <div className="min-h-screen bg-neutral-light">
              <Navbar />
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/servicios" element={<Services />} />
                  <Route path="/servicios/:id" element={<ServiceEntry />} />
                  <Route path="/proyectos" element={<Projects />} />
                  <Route path="/proyectos/:id" element={<ProjectEntry />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/nosotros" element={<AboutUs />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogEntry />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                </Routes>
              </Suspense>
              <Footer />
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
