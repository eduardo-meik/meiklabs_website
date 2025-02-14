import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import blog from '../content/blog.json';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';

const calculateReadTime = (content: any): number => {
  const wordsPerMinute = 200;
  const text = JSON.stringify(content);
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const Blog: React.FC = () => {
  return (
    <PageLayout
      title="Blog e Investigación"
      description="Últimas publicaciones y proyectos de investigación de MEIK LABS"
    >
      <div className="py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-dark text-center mb-6">
          Blog e Investigación
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Explore nuestras últimas publicaciones y proyectos de investigación en curso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.publications.map((publication) => (
            <Link 
              to={`/blog/${publication.id}`} 
              key={publication.id}
              className="group"
            >
              <Card 
                variant="hover" 
                padding="none" 
                className="h-full transition-transform duration-300 group-hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <div className="relative">
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={publication.image}
                        alt={publication.title}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="flex flex-wrap gap-2">
                        {publication.keywords.slice(0, 2).map((keyword) => (
                          <span
                            key={keyword}
                            className="px-3 py-1 bg-white/90 text-primary rounded-full text-xs font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                        {publication.keywords.length > 2 && (
                          <span className="px-3 py-1 bg-white/90 text-primary rounded-full text-xs font-medium">
                            +{publication.keywords.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-display font-bold text-neutral-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {publication.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {publication.abstract}
                    </p>

                    <div className="mt-auto space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          <span>{publication.authors[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{calculateReadTime(publication.content)} min</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <time 
                          dateTime={publication.date}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <Calendar className="h-4 w-4 mr-1.5" />
                          {new Date(publication.date).toLocaleDateString()}
                        </time>
                        <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-0.5 transition-transform">
                          Leer más
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;